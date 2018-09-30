import * as React from 'react';
import styled from 'styled-components';

interface FlexRowProps {
    id?: string;
    className?: string;
    children?: React.ReactNode;
}

class FlexRow extends React.PureComponent<FlexRowProps> {
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

export default styled(FlexRow)`
    display: flex;
    flex-direction: row;
    flex: 1;
`;
