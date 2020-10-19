import React from 'react';
class Delegate extends React.Component {
    render() {
        return (
            <div className='Delegate row'>
                <div class="col-9">
                    {this.props.delegate.delegate}
                    <br />
                    votes: {this.props.delegate.votes} UNI
                </div>
                <div class="col-3 delegate-button-container">
                    <button type="button" class="btn btn-primary">Delegate</button>
                </div>
            </div>
        );
    }
}

export default Delegate;