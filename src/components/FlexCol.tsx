import * as React from 'react';
import styled from 'styled-components';

interface FlexColProps {
    id?: string;
    className?: string;
    children?: React.ReactNode;
}

class FlexCol extends React.Component<FlexColProps> {
    public render() {
        return (
            <div
                id={this.props.id}
                className={this.props.className}
            >
                {this.props.children}
            </div>
        );
    }
};

export default styled(FlexCol)`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
