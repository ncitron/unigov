import React from 'react';
class Delegate extends React.Component {
    render() {
        return (
            <div className='Delegate'>
                address: {this.props.delegate.delegate}
                <br />
                votes: {this.props.delegate.votes} UNI
            </div>
        );
    }
}

export default Delegate;