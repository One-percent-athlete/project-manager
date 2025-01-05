import { ChangeEventHandler, InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    type: string
    name: string
    placeholder: string
    required?: boolean
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

const Input = () => {
  return (
    <div>Input</div>
  )
}

export default Input