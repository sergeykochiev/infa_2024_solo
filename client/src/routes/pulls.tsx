import { FC, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import { PullType } from "../types";
import { Pull } from "../components/pull";
import { PullsWrapper } from "../components/pullsWrapper";
import { H1 } from "../components/header1";
import { TabWrapper } from "../components/tabWrapper";
import { Tab } from "../components/tab";
import { Link } from "react-router-dom";

export const PullsPage: FC = () => {
    const pulls: Array<PullType> | null = useLoaderData() as Array<PullType> | null
    const [simple, setSimple] = useState<boolean>(false)
    const goto = useNavigate()
    const location = useLocation()
    const paths = location.pathname.split('/')
    const bannerType = paths[paths.length - 1]
    
    return <div className={`flex flex-col w-full gap-4 lg:col-span-6`}>
        <div className="flex justify-between items-center gap-4">
            <div className='justify-start lg:hidden flex-1 flex'>
                <Link className="hover:underline" to='../'>{'< back'}</Link>
            </div>
            <H1>Pulls</H1>
            <div className="flex flex-1 justify-end">
                <label className="hover:underline select-none">
                    change mode
                    <input type="checkbox" className="hidden absolute" onChange={() => setSimple(!simple)}/>
                </label>
            </div>
        </div>
        <TabWrapper>
            <Tab name='1' checked={bannerType == '1'} onChange={() => goto('../1', { relative: 'path', replace: true })}>Standart</Tab>
            <Tab name='1' checked={bannerType == '11'} onChange={() => goto('../11', { relative: 'path', replace: true })}>Event</Tab>
            <Tab name='1' checked={bannerType == '12'} onChange={() => goto('../12', { relative: 'path', replace: true })}>Weapon</Tab>
        </TabWrapper>
        {!simple && <div className={`rounded-xl p-1 px-3 grid grid-cols-2 lg:grid-cols-5 items-center outline outline-2 outline-offset-[-2px] outline-gray-200`}>
            <p className="grid place-items-start border-r-gray-200 border-r-2">Name</p>
            <p className="lg:grid place-items-center hidden border-r-gray-200 border-r-2">Kind</p>
            <p className="lg:grid place-items-center hidden border-r-gray-200 border-r-2">Item</p>
            <p className="lg:grid place-items-center hidden border-r-gray-200 border-r-2">Banner</p>
            <p className="grid place-items-end">Time</p>
        </div>}
        <PullsWrapper simple={simple}>
            {pulls && pulls.map(pull => <Pull simple={simple} key={pull.id} pull={pull}/>)}
        </PullsWrapper>
    </div>
}