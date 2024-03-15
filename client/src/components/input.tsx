import type { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string,
    value?: string | number
    setValue?: any,
    mode?: 'header' | 'plain'
}

const Input: FC<InputProps> = ({ placeholder, value = undefined, setValue = undefined, type, mode, ...props }) => {
    return <input
            className={
                `bg-gray-200 rounded-xl p-3 px-4 focus:outline focus:outline-2 flex-1
                ${mode == 'header' && 'text-xl font-bold'}`
            } 
            type={type ? type : 'text'}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
                if (setValue) setValue(e.target.value)
            }}
            {...props}
        />
}

export default Input