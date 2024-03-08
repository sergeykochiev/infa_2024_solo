import { FC } from "react";
import { Wrapper } from "../components/mainWrapper";
import { H1 } from "../components/header1";
import { useRouteError } from "react-router-dom";

export const ErrorPage: FC = () => {
    const error: any = useRouteError()

    return <Wrapper>
        <H1>Oops...</H1>
        <p className="text-center">Something just accured: {`${error.message}`}</p>
    </Wrapper>
}