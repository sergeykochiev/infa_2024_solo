import { FC, useState } from "react";
import { useLoaderData } from "react-router";
import { GameAccount } from "../types";
import { Uid } from "../components/uid";
import { PageWrapper } from "../components/pageWrapper";
import { H1 } from "../components/header1";

export const UidsPage: FC = () => {
    const [gameaccs, setGameaccs] = useState<Array<GameAccount>>(useLoaderData() as Array<GameAccount>)

    const deleteF = async (uid: number): Promise<void> => {
        const res = await fetch(`/api/gameacc?uid=${uid}`, {
            method: 'DELETE',
            credentials: "include",
        })
        if (!res.ok) {
            alert('Unhandled error')
            return
        }
        const deleteIdx = gameaccs.findIndex(gameacc => gameacc.uid == uid)
        gameaccs.splice(deleteIdx, 1)
        const newGameaccs = [ ...gameaccs ]
        setGameaccs(newGameaccs)
        return
    }

    return <div className="flex flex-col gap-4">
        <H1>Uids</H1>
        {gameaccs && gameaccs.map(acc => <Uid key={acc.id} uid={acc.uid} deleteF={deleteF}/>)}
    </div>
}