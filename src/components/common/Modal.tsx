import { FC, FunctionComponent, ReactNode } from 'react';
import '../../styles/Modal.css'

type ModalProps = {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = (
    { isActive, setIsActive, children }
) => {
    return (<div
        className={isActive
            ? 'modal active'
            : 'modal'}
        onClick={() => setIsActive(false)}>
        <div
            className={isActive
                ? 'modal__content active'
                : 'modal__content'}
            onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>);
}

export default Modal;