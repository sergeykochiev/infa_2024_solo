import type { FC, InputHTMLAttributes} from 'react'

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
    ph: string,
    value: number
    setValue: any
}

const NumberInput: FC<NumberInputProps> = ({ ph, value, setValue }) => {
    return <input className="bg-gray-300 rounded-xl px-2" type="number" value={value || ''} placeholder={ph} onChange={(e) => setValue(e.target.value)}/>
}

export default NumberInput