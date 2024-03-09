import { FC, InputHTMLAttributes } from "react";
import { useNavigate } from "react-router";

interface TabProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    children: string
}

export const Tab: FC<TabProps> = ({ children, ...props}) => {
    const goto = useNavigate()
        
    return <label className="flex p-2 justify-center rounded-lg has-[input:checked]:bg-gray-200">
        <div>{children}</div>
        <input type="radio" className="hidden absolute" {...props}/>
    </label>
}