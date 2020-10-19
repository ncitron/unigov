import React from 'react';
import Web3 from 'web3'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { abi as uniABI } from '../abi/uni.json';
import Delegate from './Delegate.js';
import { BeatLoader } from 'react-spinners';


class DelegateList extends React.Component {

    state = {
        delegates: []
    }

    render() {
        let loader;
        if(this.state.delegates.length === 0) {
            loader = 
                <div className="sweet-loading">
                    <BeatLoader
                    size={30}
                    color={"#ed1f89"}
                    loading={this.state.loading}
                    />
                </div>
        }

        return (
            <div>
                <div class="row">
                    <div class="col-3" />
                    <div class="col-6 delegate-list">
                        {loader}
                        <div class="delegate-title">Delegates</div>
                        {this.state.delegates.map(delegate => (
                            <Delegate delegate={delegate} />
                        ))}
                    </div>
                    <div class="col-3" />
                </div>
            </div>
        );
    }

    async componentDidMount() {
        const web3 = new Web3(window.ethereum);
        const uniAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
        let uni = new web3.eth.Contract(uniABI, uniAddress);

        let delegations = []
        for(let i = 10_500_000; i < await web3.eth.getBlockNumber(); i+=50_000) {
            console.log('working');
            delegations.push(...await uni.getPastEvents('DelegateVotesChanged', {
                fromBlock: (i-100_000),
                toBlock: i
            }));
        }
        const delegateAccounts = {};

        delegations.forEach(e => {
            const { delegate, newBalance } = e.returnValues;
            delegateAccounts[delegate] = newBalance;
        });

        const delegates = [];
        Object.keys(delegateAccounts).forEach((account) => {
            const voteWeight = +delegateAccounts[account];
            if (voteWeight === 0) return;
            delegates.push({
            delegate: account,
            votes: voteWeight
            });
        });

        delegates.sort((a, b) => {
            return a.votes < b.votes ? 1 : -1;
        });

        delegates.forEach(d => {
            d.votes = (d.votes / 1e18).toFixed(0);
        });

        this.state.delegates = delegates.slice(0, 20);
        this.forceUpdate();
    }
}

export default DelegateList;