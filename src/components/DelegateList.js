import React from 'react';
import Delegate from './Delegate.js';


class DelegateList extends React.Component {
    render() {
        let loaderOrConnect;

        if(this.props.delegates.length === 0 && Object.keys(this.props.web3).length !== 0) {
            loaderOrConnect =
            <div className="spinner">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        }
        
        if(Object.keys(this.props.web3).length === 0) {
            loaderOrConnect =
            <div className="spinner" style={{ textAlign: 'center' }}>
                <div className="btn btn-primary btn-lg" onClick={this.props.connect}>Connect Your Wallet</div>
            </div>
        }

        return (
            <div>
                <div className="col-10 delegate-list">
                    <div className="delegate-title">Delegates</div>
                    {loaderOrConnect}
                    {this.props.delegates.map(delegate => (
                        <Delegate delegate={delegate} web3={this.props.web3} />
                    ))}
                </div>
            </div>
        );
    }
}

export default DelegateList;