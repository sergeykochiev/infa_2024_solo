import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Root } from './routes/root'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { LoginPage } from './routes/login'
import { SignUpPage } from './routes/signup'
import { ProfilePage } from './routes/profile'
import { UidsPage } from './routes/uids'
import { PullsPage } from './routes/pulls'
import { BannerType, GameAccount, PullType, User } from './types'
import { ErrorPage } from './routes/error'

const fetchUids = async (): Promise<Array<GameAccount> | null> => {
  console.log(1)
  const res = await fetch('/api/gameacc', {
    credentials: 'same-origin',
    method: 'GET'
  })
  if (!res.ok) {
    alert('Unhandled error')
    return null 
  }
  const uids = await res.json()
  return uids.result
}

const fetchPulls = async (authkey: string, type: BannerType): Promise<Array<PullType> | null> => {
  const res = await fetch(`/api/pull/${authkey}/${type}`, {
    credentials: 'same-origin',
    method: 'GET'
  })
  if (!res.ok) {
    alert('Unhandled error')
    return null
  }
  const pulls = await res.json()
  return pulls.result
}

const login = async (): Promise<User | null> => {
  const res = await fetch('/api/auth/login', {
    method: 'GET'
  })
  if (!res.ok) {
    alert('Unauthorized')
    return null
  }
  const user = await res.json()
  return user.result
}

const router = createBrowserRouter([
  {
    path: '',
    element: <Root/>,
    loader: async () => {
      const user = await login()
      if (!user) {
        return null
      }
      // return redirect('profile')
      return null
    },
    errorElement: <ErrorPage/>
  },
  {
    path: 'login',
    element: <LoginPage/>
  },
  {
    path: 'signup',
    element: <SignUpPage/>
  },
  {
    path: 'profile',
    element: <ProfilePage/>,
    loader: login,
    children: [
      {
        path: '',
        element: <UidsPage/>,
        loader: fetchUids,
        children: [
          {
            path: ':uid/:type',
            element: <PullsPage/>,
            loader: async ({ params }): Promise<Array<PullType> | null> => {
              return await fetchPulls(params.uid as string, params.type as unknown as BannerType)
            },
          }, 
        ]
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
