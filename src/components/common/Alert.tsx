import { FunctionComponent } from 'react';
import Button from './Button';
import '../../styles/Alert.css'

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
    return (<div className='alert'>
        <p className='alert__message'>{message}</p>
        <div className='alert__buttons'>
            <Button onClick={onCancel}>{cancel ?? 'Отмена'}</Button>
            <Button onClick={onConfirm}>{confirm ?? 'Ок'}</Button>
        </div>
    </div>);
}

export default Alert;