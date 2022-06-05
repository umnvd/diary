import { useState } from 'react';

function useModal<T>() {
    const [selected, setSelected] = useState<T>();
    const [isActive, setIsActive] = useState(false);

    const show = (data: T) => {
        setSelected(data);
        setIsActive(true);
    };

    const close = () => {
        setSelected(undefined);
        setIsActive(false);
    };

    return {
        isActive,
        selected,
        show,
        close
    };
}

export default useModal;