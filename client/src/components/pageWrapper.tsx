import { FC, ReactNode } from "react";

export const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="w-full p-16 flex flex-col gap-4">
        {children}
    </div>
}