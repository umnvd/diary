import { FunctionComponent, TextareaHTMLAttributes } from 'react';
import '../../styles/Input.css'

interface TextAreaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

const TextArea: FunctionComponent<TextAreaProps> = (
    props
) => {
    return (<textarea
        className="input text-area"
        {...props}>
    </textarea>);
}

export default TextArea;