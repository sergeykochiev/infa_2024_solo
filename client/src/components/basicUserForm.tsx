import { FC, useState } from "react";
import Button from "./button";
import { H1 } from "./header1";
import Input from "./input";

interface UserFormProps {
    name: string,
    onSubmit: (username: string, password: string) => void
}

export const UserForm: FC<UserFormProps> = ({ name, onSubmit }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (username: string, password: string): Promise<void> => {
        onSubmit(username, password)
    }

    return <div className="flex-col flex gap-4 min-w-[300px]">
        <div className="flex justify-center">
            <H1>{name}</H1>
        </div>
        <Input placeholder="Username" value={username} setValue={setUsername}/>
        <Input placeholder="Password" value={password} setValue={setPassword}/>
        <Button onclick={() => submit(username, password)}>{name}</Button>
    </div>
}