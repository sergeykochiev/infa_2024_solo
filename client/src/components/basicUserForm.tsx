import React, { FC, useState } from "react";
import Button from "./button";
import { H1 } from "./header1";
import Input from "./input";

interface UserFormProps {
    name: string,
    submit: (e: React.FormEvent) => void
}

export const UserForm: FC<UserFormProps> = ({ name, submit }) => {
    return <form className="flex-col flex gap-4 min-w-[300px]" onSubmit={submit}>
        <div className="flex justify-center">
            <H1>{name}</H1>
        </div>
        <Input placeholder="Username" name="username" required/>
        <Input placeholder="Password" name="password" type="password" required/>
        <Button type='submit'>{name}</Button>
    </form>
}