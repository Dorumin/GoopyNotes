import { useCallback, useState, CSSProperties } from 'react';

import './css/Slider.css';

type SliderProps = {
    min?: number;
    max?: number;
    value?: number;
};

export default function Slider({
    value: initialValue = 50,
    min = 0,
    max = 100
}: SliderProps) {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const percentage = (value - min) / (max - min) * 100;

    return (
        <input
            className="slider"
            type="range"
            min={min}
            max={max}
            style={{
                '--value': `${percentage}%`
            } as CSSProperties}
            value={value}
            onChange={onChange}
        />
    );
}
