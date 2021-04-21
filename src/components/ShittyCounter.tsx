import { useState, useCallback } from 'react';

function usePersistentState(key: string, initialState: any) {
    const [state, setState] = useState(() => {
        const item = localStorage.getItem(key);

        if (item === null) return initialState;

        return JSON.parse(item);
    });

    const setPersistedState = useCallback(newState => {
        localStorage.setItem(key, newState);
        setState(newState);
    }, [key]);

    return [state, setPersistedState];
}

export default function BruhComponent() {
    const [count, setCount] = usePersistentState('counter', 0);

    const onClick = useCallback(() => {
        setCount(count + 1);
    }, [count, setCount]);

    return (
        <button onClick={onClick}>
            Click me to increase aaaa{count}
        </button>
    );
}
