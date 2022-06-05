import { FunctionComponent, ReactNode, useEffect, useMemo } from 'react';
import '../../styles/Modal.css'

const modalRootElement = document.getElementById('modal') as HTMLElement;

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FunctionComponent<ModalProps> = (
    { open, onClose, children }
) => {
    const element = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        if (open) {
            modalRootElement.appendChild(element);
            return () => {
                modalRootElement.removeChild(element);
            }
        }
    });

    if (open) {
        return (<div
            className={'modal'}
            onClick={onClose}>
            <div
                className={'modal__content'}
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>);
    }
    return null;
}

export default Modal;