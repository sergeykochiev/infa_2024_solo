import { FC } from "react";
import { useLoaderData } from "react-router";
import { GameAccount } from "../types";
import { Uid } from "../components/uid";
import { PageWrapper } from "../components/pageWrapper";

export const UidsPage: FC = () => {
    const gameaccs: Array<GameAccount> | null = useLoaderData() as Array<GameAccount> | null

    return <PageWrapper>
        {gameaccs && gameaccs.map(acc => <Uid key={acc.id}>{acc.uid}</Uid>)}
    </PageWrapper>
}