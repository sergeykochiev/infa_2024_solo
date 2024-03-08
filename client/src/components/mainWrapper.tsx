import { FC, ReactNode } from "react";

export const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="h-screen flex flex-col gap-4 justify-center items-center">
        {children}
    </div>
}