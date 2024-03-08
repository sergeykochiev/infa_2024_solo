import { FC, ReactNode } from "react";

export const PullsWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="flex flex-col gap-1">
        {children}
    </div>
}