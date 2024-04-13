import { FC } from "react";
import { UserForm } from "../components/basicUserForm";
import { Link, useNavigate } from "react-router-dom";
import { Wrapper } from "../components/mainWrapper";

export const SignUpPage: FC = () => {
    const goto = useNavigate()
    
    const submit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
	    const formData = new FormData(e.target as HTMLFormElement)
        const res = await fetch(`/api/auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password')
            }),
        })
        if (!res.ok) {
            alert('Unhandled error')
            return
        }
        goto('/login')
    }

    return <Wrapper>
        <UserForm name="Sign up" submit={submit}/>
        <div className="grid place-items-center">
            <Link to='/login'>log in</Link>
        </div>
    </Wrapper>   
}