import { FC, HTMLAttributes, ReactNode } from "react";

interface PageWrapperProps extends HTMLAttributes<HTMLElement> {
    children: Array<ReactNode> | ReactNode
}

export const PageWrapper: FC<PageWrapperProps> = ({ children, ...props }) => {
    return <div className="w-full flex flex-col gap-4 lg:p-16 p-4" {...props}>
        {children}
    </div>
}