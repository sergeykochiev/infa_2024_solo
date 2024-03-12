import { Link, useNavigate } from "react-router-dom";
import { Wrapper } from "../components/mainWrapper";
import { H1 } from "../components/header1";
import Button from "../components/button";

export function Root() {
    const goto = useNavigate()

    return <Wrapper>
        <H1>HSR History Saver</H1>
        <div className="flex flex-col justify-center text-center items-center gap-2">
            <p>This website allows you to save your Star Rail wishes and keep the data from deletion on HoyoVerse servers.</p>
            <p>To start, create an account or login into existing one.</p>
        </div>
        <div className="flex lg:flex-row flex-col gap-4">
            <Button onClick={() => goto('login')}>Login</Button>
            <Button onClick={() => goto('signup')}>Sign up</Button>
        </div>
    </Wrapper>
}