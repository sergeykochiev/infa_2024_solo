import React from 'react'
import type { FC, ButtonHTMLAttributes} from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button: FC<ButtonProps> = ({ ...props }) => {
    return <button className='flex min-w-32 justify-center text-white font-bold p-3 px-4 bg-black rounded-xl disabled:bg-gray-900' {...props}/>
}

export default Button