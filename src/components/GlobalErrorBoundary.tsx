import { Component, ReactNode } from 'react';

import './css/GlobalErrorBoundary.css';

type GlobalErrorBoundaryProps = {
    children: ReactNode;
};

type GlobalErrorBoundaryState = {
    errored: boolean;
    error: any;
    errorInfo: ReactErrorInfo;
};

type ReactErrorInfo = null | {
    componentStack: string;
};

export default class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
    constructor(props: GlobalErrorBoundaryProps) {
        super(props);
        this.state = {
            errored: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError() {
        return {
            errored: true
        };
    }

    componentDidCatch(error: any, errorInfo: ReactErrorInfo) {
        this.setState({
            error,
            errorInfo
        });
    }

    prettifySource(source: string): string {
        return source.replace(/\((.+)\)/, (_, href) => {
            try {
                const url = new URL(href);

                return `(${url.pathname.slice(1)})`;
            } catch(e) {
                return href;
            }
        });
    }

    prettifyComponentStack(stack: string) {
        return stack.replace(/^(\s+)at (\w+)($|.+)/gm,
            (_, indent, component, rest) => `${indent}at <${component}>${this.prettifySource(rest)}`
        );
    }

    render() {
        if (this.state.errored) {
            const { error, errorInfo } = this.state;

            return (
                <div className="error-boundary">
                    <h1>Something went wrong.</h1>
                    <pre>
                        {error && String(error)}
                        {errorInfo && this.prettifyComponentStack(errorInfo.componentStack)}

                        {'\n\n-------\n\n'}

                        {error && error.stack}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}
