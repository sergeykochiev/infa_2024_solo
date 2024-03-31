import { FC, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import Button from "./button"

interface UidProps {
    uid: number,
    deleteF: (uid: number) => void,
    simple: boolean
}

export const Uid: FC<UidProps> = ({ uid, deleteF, simple }) => {
    const goto = useNavigate()
    const [submit, setSubmit] = useState<boolean>(false)
    const location = useLocation()
    const paths = location.pathname.split('/')
    const curUid = parseInt(paths[paths.length - 2])
    const isActive = curUid == uid

    const deleteSubmit = (): void => {
        if (!submit) {
            setSubmit(true)
            return
        }
        deleteF(uid)
        setSubmit(false)
    }
    
    if (!simple) {
        return <label onClick={isActive ? () => goto('./') :     () => goto(`/profile/${uid}/1`)} className="w-full has-[input:checked]:bg-gray-200 flex flex-row items-center rounded-xl p-3 px-4 outline outline-2 outline-offset-[-2px] outline-gray-200 justify-between">
            <p className="select-none">{uid}</p>
            <input checked={isActive} className="hidden absolute" type="radio"></input>
        </label>
    }
    return <div className="flex gap-4">
        <div onClick={() => goto(`/profile/${uid}/1`)} className="w-full bg-gray-200 flex flex-row items-center rounded-xl p-3 px-4 justify-between">
            <p className="select-none">{uid}</p>
        </div>
        <div className="flex-row gap-2 items-center hidden lg:flex">
            {/* {submit && <p>Are you sure?</p>} */}
            <Button onClick={deleteSubmit}>{submit ? 'Submit' : 'Delete'}</Button>
            {submit && <Button onClick={() => setSubmit(false)}>No</Button>}
        </div>
    </div>
}