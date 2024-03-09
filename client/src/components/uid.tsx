import { FC, ReactNode, useState } from "react"
import { useNavigate } from "react-router"
import Button from "./button"

interface UidProps {
    uid: number,
    deleteF: (uid: number) => void
}

export const Uid: FC<UidProps> = ({ uid, deleteF }) => {
    const goto = useNavigate()
    const [submit, setSubmit] = useState<boolean>(false)

    const deleteSubmit = (): void => {
        if (!submit) {
            setSubmit(true)
            return
        }
        deleteF(uid)
        setSubmit(false)
    }
        
    return <div className="flex gap-4">
        <div onClick={() => goto(`/profile/${uid}/1`)} className="w-full bg-gray-200 flex flex-row items-center rounded-xl p-3 px-4 focus:outline focus:outline-2 justify-between">
            <p>{uid}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
            {/* {submit && <p>Are you sure?</p>} */}
            <Button onClick={deleteSubmit}>{submit ? 'Submit' : 'Delete'}</Button>
            {submit && <Button onClick={() => setSubmit(false)}>No</Button>}
        </div>
    </div>
}