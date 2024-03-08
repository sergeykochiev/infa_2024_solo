import { FC } from "react";
import { useLoaderData } from "react-router";
import { PageWrapper } from "../components/pageWrapper";
import { PullType } from "../types";
import { Pull } from "../components/pull";
import { PullsWrapper } from "../components/pullsWrapper";

export const PullsPage: FC = () => {
    const pulls: Array<PullType> | null = useLoaderData() as Array<PullType> | null

    return <PageWrapper>
        <PullsWrapper>
            {pulls && pulls.map(pull => <Pull key={pull.id} pull={pull}/>)}
        </PullsWrapper>
    </PageWrapper>
}