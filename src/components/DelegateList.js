import React from 'react';
import { css } from "@emotion/core";
import Delegate from './Delegate.js';


class DelegateList extends React.Component {
    render() {
        let loaderOrConnect;

        const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `;
        if(this.props.delegates.length === 0 && Object.keys(this.props.web3).length !== 0) {
            loaderOrConnect =
            <div class="spinner">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        }
        
        if(Object.keys(this.props.web3).length === 0) {
            loaderOrConnect =
            <div class="spinner">
                <div className="btn btn-primary btn-lg" onClick={this.props.connect}>Connect Your Wallet</div>
            </div>
        }

        return (
            <div>
                <div class="row">
                    <div class="col-3" />
                    <div class="col-6 delegate-list">
                        <div class="delegate-title">Delegates</div>
                        {loaderOrConnect}
                        {this.props.delegates.map(delegate => (
                            <Delegate delegate={delegate} web3={this.props.web3} />
                        ))}
                    </div>
                    <div class="col-3" />
                </div>
            </div>
        );
    }
}

export default DelegateList;