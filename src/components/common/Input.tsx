import { FunctionComponent, InputHTMLAttributes } from "react";
import '../../styles/Input.css'

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> { }

const Input: FunctionComponent<InputProps> = (
    props: InputProps
) => {
    return (
        <input
            className="input"
            {...props}
        />
    );
}

export default Input;