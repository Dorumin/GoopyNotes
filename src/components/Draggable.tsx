import { useState, useCallback, useRef, ReactNode, CSSProperties } from 'react';

import './css/Draggable.css';

type DraggableProps = {
    style?: CSSProperties;
    children: ReactNode;
};

export default function Draggable({
    style = {},
    children
}: DraggableProps) {
    const [offset, setOffset] = useState({ top: 0, left: 0 });

    const draggable = useRef<HTMLDivElement>(null);

    // These are instance variables
    // They're used to keep track of the initial positions of `draggable`
    // and the mouse when the user starts dragging
    // They're not state because they're used in the mouse move callbacks
    // and they must always get the latest value, and their identity
    // must be stable
    const startOffset = useRef({
        top: 0,
        left: 0
    });
    const startMouseOffset = useRef({
        top: 0,
        left: 0
    });

    // Note about the following callbacks:
    // Their references MUST be stable,
    // as they're passed to `addEventListener` and `removeEventListener`
    // So their second argument must always be `[]`
    // If this were to change, the callbacks should be updated
    // to use local state for the created functions
    // Or mutable refs could be used to hold the callbacks
    const onMouseMove = useCallback((e) => {
        const deltaLeft = e.clientX - startMouseOffset.current.left;
        const deltaTop = e.clientY - startMouseOffset.current.top;

        setOffset({
            top: startOffset.current.top + deltaTop,
            left: startOffset.current.left + deltaLeft
        });
    }, []);
    const onMouseUp = useCallback(() => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }, [onMouseMove]); // `onMouseMove` never changes

    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        startOffset.current.top = offset.top;
        startOffset.current.left = offset.left;
        startMouseOffset.current.left = e.clientX;
        startMouseOffset.current.top = e.clientY;
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }, [offset, onMouseMove, onMouseUp]); // `onMouseMove` and `onMouseUp` never change

    return (
        <div
            className="draggable"
            ref={draggable}
            style={{
                transform: `translate(${offset.left}px, ${offset.top}px)`,
                ...style
            }}
        >
            {children}
            <div
                className="draggable-handle"
                onMouseDown={onMouseDown}
            />
        </div>
    );
}
