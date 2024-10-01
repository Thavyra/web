import { InputHTMLAttributes } from "react"

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: "text" | "password"
    valid?: boolean
}

export default function InputText({ type, valid, ...props }: InputTextProps) {
    return (
        <input type={type ?? "text"}
            className={`appearance-none 
            w-full py-1.5 px-3 
            rounded
            text-lg text-light 
            bg-dark-900 
            transition-colors 
            focus:outline-none focus:bg-dark-950
            ${getValidClass(valid)}`}
            {...props} />
    )

}

function getValidClass(valid?: boolean) {
    switch (valid) {
        case undefined:
            return ""
        case true:
            return "border border-positive"
        case false:
            return "border border-negative"
    }
}