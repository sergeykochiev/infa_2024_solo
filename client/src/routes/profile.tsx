import { FC, useState } from "react";
import { H1 } from "../components/header1";
import Input from "../components/input";
import Button from "../components/button";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/pageWrapper";
import { User } from "../types";
import { LinkButton } from "../components/linkButton";

export const ProfilePage: FC = () => {
    const goto = useNavigate()
    const [url, setUrl] = useState('')
    const user: User | null = useLoaderData() as User | null

    const savePulls = async (url: string): Promise<void> => {
        const res = await fetch(`/api/pull`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hoyoUrl: url
            })
        })
        if (!res.ok) {
            alert(`Unhandled error`)
            return
        }
        const pullCount = await res.json()
        alert(`Saved ${pullCount.result} pulls`)
        return
    }

    const logout = async (): Promise<void> => {
        const res = await fetch(`/api/auth/logout`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!res.ok) {
            alert(`Unhandled error`)
            return
        }
        goto('/login')
        return
    }

    return <PageWrapper>
        <div className="lg:hidden grid place-items-center">
            <p>{user && user.username}</p>
            <Button>Logout</Button>
        </div>
        <div className="flex lg:justify-between justify-center items-center gap-4">
            <H1>HSR History</H1>
            <div className="flex gap-4 items-center">
                <LinkButton deletion={true} onClick={logout}>logout</LinkButton>
                <p className="hidden lg:block">{user && user.username}</p>
            </div>
        </div>
        <p>Paste your Hoyoverse wish URL to the field below to retrieve wishes from Star Rail servers</p>
        <div className="flex gap-4 lg:flex-row flex-col">
            <Input placeholder="Hoyoverse URL" value={url} setValue={setUrl}/>
            <Button onClick={() => savePulls(url)}>Fetch</Button>
        </div>
        <Outlet/>
    </PageWrapper>
}