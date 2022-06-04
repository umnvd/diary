import { FunctionComponent, useEffect, useRef } from 'react';

interface PagingTriggerProps {
    onBottomReached: () => void;
}

const PagingTrigger: FunctionComponent<PagingTriggerProps> = (
    { onBottomReached }
) => {
    const lastElement = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        const callback: IntersectionObserverCallback = (entries, observer) => {
            if (entries[0].isIntersecting)
                onBottomReached()
            console.log('bottom reached');
        };
        observer.current = new IntersectionObserver(callback);
        if (lastElement.current)
            observer.current.observe(lastElement.current);
    }, []);
    return (
        <div
            style={{ height: 1 }} // don't working if height is less than 1
            ref={lastElement} />
    );
}

export default PagingTrigger;