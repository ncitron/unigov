import React from 'react';
class Delegate extends React.Component {
    render() {
        return (
            <div className='Delegate'>
                {this.props.delegate.delegate}
                <br />
                votes: {this.props.delegate.votes} UNI
            </div>
        );
    }
}

export default Delegate;