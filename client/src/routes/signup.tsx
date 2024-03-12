import { FC } from "react";
import { UserForm } from "../components/basicUserForm";
import { Link, useNavigate } from "react-router-dom";
import { Wrapper } from "../components/mainWrapper";

export const SignUpPage: FC = () => {
    const goto = useNavigate()
    
    const submit = async (username: string, password: string): Promise<void> => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
        if (!res.ok) {
            alert('Unhandled error')
            return
        }
        goto('/login')
    }

    return <Wrapper>
        <UserForm name="Sign up" onSubmit={submit}/>
        <div className="grid place-items-center">
            <Link to='/login'>log in</Link>
        </div>
    </Wrapper>   
}