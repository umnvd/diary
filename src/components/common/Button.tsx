import { FunctionComponent, ButtonHTMLAttributes } from "react";
import '../../styles/Button.css'

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: FunctionComponent<ButtonProps> = (
    props: ButtonProps
) => {
    return (
        <button
            className='button'
            {...props}>
        </button>
    );
}

export const TextButton: FunctionComponent<ButtonProps> = (
    props: ButtonProps
) => {
    return (
        <button className='text-button' {...props}></button>
    );
}

export default Button;