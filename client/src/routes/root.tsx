import { Link } from "react-router-dom";
import { Wrapper } from "../components/mainWrapper";

export function Root() {
    return <Wrapper>
        <Link to={'login'}>Login</Link>
    </Wrapper>
}