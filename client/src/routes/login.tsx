import { FC } from "react";
import { UserForm } from "../components/basicUserForm";
import { Link, useNavigate } from "react-router-dom";
import { Wrapper } from "../components/mainWrapper";

export const LoginPage: FC = () => {
    const goto = useNavigate()

    const submit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
	    const formData = new FormData(e.target as HTMLFormElement)
        const res = await fetch(`api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password')
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
        <UserForm name="Login" submit={submit}/>
        <div className="grid place-items-center">
            <Link to='/signup'>sign up</Link>
        </div>
    </Wrapper>
}