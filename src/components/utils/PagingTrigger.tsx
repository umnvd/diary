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
        };
        observer.current = new IntersectionObserver(callback);
        if (lastElement.current)
            observer.current.observe(lastElement.current);
    }, []);
    return (<div ref={lastElement} />);
}

export default PagingTrigger;