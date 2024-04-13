import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Root } from './routes/root'
import { RedirectFunction, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { LoginPage } from './routes/login'
import { SignUpPage } from './routes/signup'
import { ProfilePage } from './routes/profile'
import { UidsPage } from './routes/uids'
import { PullsPage } from './routes/pulls'
import { ErrorPage } from './routes/error'

const fetchApiFromLoader = async (url: string): Promise<object | object[] | null | RedirectFunction> => {
  const res = await fetch(url, {
    credentials: 'same-origin',
    method: "GET"
  })
  if (res.status == 401) {
    alert('Unauthorized')
    return redirect("/login")
  }
  if (!res.ok) {
    alert('Unhandled error')
    return null
  }
  const pulls = await res.json()
  return pulls.result
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>
  },
  {
    path: 'login',
    element: <LoginPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: 'signup',
    element: <SignUpPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: 'profile',
    element: <ProfilePage/>,
    loader: async () => await fetchApiFromLoader("api/user/current"),
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '',
        element: <UidsPage/>,
        loader: async () => await fetchApiFromLoader("api/gameacc"),
        errorElement: <ErrorPage/>,
        children: [
          {
            path: ':uid/:type',
            element: <PullsPage/>,
            loader: async ({ params }): Promise<any> => {
              return await fetchApiFromLoader(`api/pull/${params.uid}/${params.type}`)
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
