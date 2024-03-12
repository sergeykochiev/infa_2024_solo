import { FC, HTMLAttributes } from "react"

interface H1Props extends HTMLAttributes<HTMLHeadingElement> {
    
}


export const H1: FC<H1Props> = ({ ...props }) => {
    return <h1 className="text-2xl font-bold grid place-items-center w-auto" {...props}/>
}