import { ButtonHTMLAttributes, FC } from "react";

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    deletion?: boolean
}

export const LinkButton: FC<LinkButtonProps> = ({ deletion = false, ...props }) => {
    return <button {...props} className={`bg-none border-none p-0 text-sm ${deletion ? 'text-red-500' : ''}`}></button>
}