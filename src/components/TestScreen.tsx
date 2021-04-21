import { useCallback, useRef } from "react";
import SortableList from "./SortableList";

type SortableChildProps = {
    index: number;
    startDragging?: (ref: Node, index: number) => void;
};

function SortableChild({ startDragging, index }: SortableChildProps) {
    const ref = useRef(null);

    const onStart = useCallback((e) => {
        e.preventDefault();

        startDragging(ref.current, index);
    }, [startDragging, index]);

    return (
        <div ref={ref} onMouseDown={onStart}>
            I am a sortable child! {index}
        </div>
    );
}

export default function TestScreen() {
    const onSorted = useCallback((changes) => {
        console.log(changes);
    }, []);

    return (
        <div className="test-screen">
            Here you go. The screen for testing shit.

            <SortableList
                onSorted={onSorted}
            >
                {new Array(5).fill(0)
                    .map((_, index) =>
                        <SortableChild key={index} index={index} />
                    )
                }
            </SortableList>
        </div>
    );
}
