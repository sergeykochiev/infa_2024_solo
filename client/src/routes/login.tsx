import { FC } from "react";
import { UserForm } from "../components/basicUserForm";
import { Link, useNavigate } from "react-router-dom";
import { Wrapper } from "../components/mainWrapper";

export const LoginPage: FC = () => {
    const goto = useNavigate()

    const submit = async (username: string, password: string): Promise<void> => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: "include"
        })
        if (!res.ok) {
            if (res.status == 401) {
                alert('Login and/or password are incorrect')
                return
            }
            alert('Unhandled error')
            return
        }
        // const user = await res.json()
        // localStorage.setItem('username', user.username)
        goto("/profile")
        return
    }

    return <Wrapper>
        <UserForm name="Login" onSubmit={submit}/>
        <div className="grid place-items-center">
            <Link to='/signup'>sign up</Link>
        </div>
    </Wrapper>
}