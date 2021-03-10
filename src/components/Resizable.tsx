import { useState, useCallback, useRef, ReactNode, CSSProperties } from 'react';

import './css/Resizable.css';

type ResizableProps = {
    width?: number;
    height?: number;
    style?: CSSProperties;
    children: ReactNode;
};

export default function Resizable({
    width = 300,
    height = 300,
    style = {},
    children
}: ResizableProps) {
    const [size, setSize] = useState({
        width,
        height
    });
    const resizable = useRef<HTMLDivElement>(null);

    // Note about the following callbacks:
    // Their references MUST be stable,
    // as they're passed to `addEventListener` and `removeEventListener`
    // So their second argument must always be `[]`
    // If this were to change, the callbacks should be updated
    // to use local state for the created functions
    // Or mutable refs could be used to hold the callbacks
    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }, []);
    const onMouseUp = useCallback(() => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }, []);
    const onMouseMove = useCallback((e) => {
        const bounds = resizable.current.getBoundingClientRect();
        const mouseTop = e.clientY;
        const mouseLeft = e.clientX;
        const boxTop = bounds.top;
        const boxLeft = bounds.left;

        setSize({
            width: mouseLeft - boxLeft,
            height: mouseTop - boxTop
        });
    }, []);

    return (
        <div
            className="resizable"
            ref={resizable}
            style={{
                width: size.width,
                height: size.height,
                ...style
            }}
        >
            {children}
            <div
                className="resizable-handle"
                onMouseDown={onMouseDown}
            />
        </div>
    );
}
