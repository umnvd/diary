import { FunctionComponent } from 'react';

interface AlertProps {
    message: string,
    onConfirm: () => void;
    onCancel: () => void;
    confirm?: string,
    cancel?: string,
}

const Alert: FunctionComponent<AlertProps> = (
    { message, onConfirm, onCancel, confirm, cancel }
) => {
    return (<>
        <p>{message}</p>
        <button onClick={onCancel}>{cancel ?? 'Отмена'}</button>
        <button onClick={onConfirm}>{confirm ?? 'Ок'}</button>
    </>);
}

export default Alert;