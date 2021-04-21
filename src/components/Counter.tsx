import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useI18n from '../hooks/useI18n';
import { useSelector } from '../redux';
import { incrementCounter, decrementCounter, resetCounter } from '../redux/actions';

export default function Counter() {
    const count = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const onIncrement = useCallback(() => {
        dispatch(incrementCounter());
    }, [dispatch]);

    const onDecrement = useCallback(() => {
        dispatch(decrementCounter());
    }, [dispatch]);

    const onReset = useCallback(() => {
        dispatch(resetCounter());
    }, [dispatch]);

    const i18n = useI18n('Counter');

    return (
        <div className="counter">
            <p>{i18n.msg('current').text({ count })}</p>
            <button onClick={onIncrement}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
            <button onClick={onReset}>Reset</button>
        </div>
    );
}
