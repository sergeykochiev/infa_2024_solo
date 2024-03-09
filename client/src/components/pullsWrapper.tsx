import { FC, HTMLAttributes, ReactNode } from "react";

interface PullsWrapperProps extends HTMLAttributes<HTMLElement> {
    simple?: boolean
    children: Array<ReactNode> | ReactNode
}

export const PullsWrapper: FC<PullsWrapperProps> = ({ children, simple = false }) => {
    if (simple) {
        return <div className="flex flex-wrap gap-2">
            {children}
        </div>
    }
    return <div className="flex flex-col gap-1">
        {children}
    </div>
}