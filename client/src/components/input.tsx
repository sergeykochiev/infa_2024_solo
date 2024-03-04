import type { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string,
    value: string | number
    setValue: any,
    type?: 'text' | 'number',
    mode?: 'header' | 'plain'
}

const Input: FC<InputProps> = ({ type, placeholder, value, setValue, mode, ...props }) => {
    return <div className='flex-grow h-auto flex-1 self-stretch'>
        <input
            className={
                `bg-white rounded-xl px-6 h-full w-full focus:outline focus:outline-2
                ${mode == 'header' && 'text-xl font-bold'}`
            } 
            type={type ? type : 'text'}
            value={value || ''}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            {...props}
        />
    </div>
}

export default Input