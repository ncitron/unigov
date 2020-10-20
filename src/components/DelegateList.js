import React from 'react';
import { css } from "@emotion/core";
import Delegate from './Delegate.js';


class DelegateList extends React.Component {
    render() {
        const override = css`
            display: block;
            margin: 0 auto;
            border-color: red;
            `;
        let loader;
        if(this.props.delegates.length === 0) {
            loader =
            <div class="spinner">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        }

        return (
            <div>
                <div class="row">
                    <div class="col-3" />
                    <div class="col-6 delegate-list">
                        <div class="delegate-title">Delegates</div>
                        {loader}
                        {this.props.delegates.map(delegate => (
                            <Delegate delegate={delegate} />
                        ))}
                    </div>
                    <div class="col-3" />
                </div>
            </div>
        );
    }
}

export default DelegateList;