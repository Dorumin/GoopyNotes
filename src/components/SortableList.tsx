import {
    useState,
    useCallback,
    isValidElement,
    cloneElement,
    Children,
    ReactNode
} from 'react';
import { createPortal } from 'react-dom';

type SortableListProps = {
    onSorted: (changes: Array<[from: number, to: number]>) => void;
    children: ReactNode
};

type Sorting = {
    rect: {
        height: number,
        width: number
    },
    index: number,
    element: Element
};

export default function SortableList({
    onSorted,
    children
}: SortableListProps) {
    const [sorting, setSorting] = useState<Sorting | null>(null);

    const startDragging = useCallback((ref: Element, index: number) => {
        console.log('hehe', ref);

        if (sorting === null) {
            const bounds = ref.getBoundingClientRect();

            const sorting = {
                rect: {
                    height: bounds.height,
                    width: bounds.width
                },
                index,
                element: ref
            };

            setSorting(sorting);

            const onMouseMove = () => {
                console.log('mouse move');
            };
            const onMouseUp = () => {
                console.log('mouse up');

                // You don't have to match { passive: true }
                // in the corresponding removeEventListener call
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);

                onSorted([
                    // TODO: Calculate `to` better
                    [sorting.index, sorting.index]
                ]);

                setSorting(null);
            };

            window.addEventListener('mousemove', onMouseMove, { passive: true });
            window.addEventListener('mouseup', onMouseUp);
        } else {
            console.log('Started dragging while sorting');
        }
    }, [sorting, onSorted]);

    return (
        <div>
            {Children.map(children, (child, index) => {
                if (sorting !== null && index === sorting.index) {
                    return (
                        <div
                            className="placeholder"
                            style={{
                                height: sorting.rect.height,
                                width: sorting.rect.width,
                            }}
                        />
                    );
                }

                if (isValidElement(child)) {
                    return cloneElement(child, {
                        startDragging
                    });
                }

                return child;
            })}

            {sorting !== null &&
                createPortal(
                    <div
                        className="asd"
                        ref={div => div !== null && div.appendChild(sorting.element)}
                    />,
                    document.body
                )
            }
        </div>
    );
}
