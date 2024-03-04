import React from 'react'
import type { FC, ButtonHTMLAttributes} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onclick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void 
}

const Button: FC<ButtonProps> = ({ onclick, ...props }) => {
    return <button onClick={onclick} className='flex min-w-32 justify-center font-bold p-4 bg-red-300 rounded-xl px-6 disabled:bg-red-50' {...props}/>
}

export default Button