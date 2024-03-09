import { FC, ReactNode } from "react";

interface TabWrapperProps {
    children: Array<ReactNode>
}

export const TabWrapper: FC<TabWrapperProps> = ({ children }) => {
    if (children.length < 2) {
        throw new Error('You need to have more than 1 tab')
    }

    return <div className={`grid grid-cols-3 w-full`}>
        {children}
    </div>
}