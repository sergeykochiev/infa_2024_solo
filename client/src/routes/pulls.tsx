import { FC, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { PullType } from "../types";
import { Pull } from "../components/pull";
import { PullsWrapper } from "../components/pullsWrapper";
import { H1 } from "../components/header1";
import { TabWrapper } from "../components/tabWrapper";
import { Tab } from "../components/tab";

export const PullsPage: FC = () => {
    const pulls: Array<PullType> | null = useLoaderData() as Array<PullType> | null
    const [simple, setSimple] = useState<boolean>(false)
    const goto = useNavigate()
    
    return <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
            <H1>Pulls</H1>
            <label className="hover:underline select-none">
                change mode
                <input type="checkbox" className="hidden absolute" onChange={() => setSimple(!simple)}/>
            </label>
        </div>
        <TabWrapper>
            <Tab name='1' onChange={() => goto('../1', { relative: 'path', replace: true })}>Standart</Tab>
            <Tab name='1' onChange={() => goto('../11', { relative: 'path', replace: true })}>Event</Tab>
            <Tab name='1' onChange={() => goto('../12', { relative: 'path', replace: true })}>Weapon</Tab>
        </TabWrapper>
        <PullsWrapper simple={simple}>
            {pulls && pulls.map(pull => <Pull simple={simple} key={pull.id} pull={pull}/>)}
        </PullsWrapper>
    </div>
}