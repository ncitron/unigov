import React from 'react';
import Web3 from 'web3'
import { abi as uniABI } from '../abi/uni.json';
//import  ENS from 'ethereum-ens';
const ENS = require('ethereum-ens');

class Delegate extends React.Component {

    state = {
        uni: {},
        account: '',
        votes: ''
    }

    async componentDidMount() {
        if(Object.keys(this.props.web3).length !== 0) {
            const uniAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
            this.setState({ uni: new this.props.web3.eth.Contract(uniABI, uniAddress) });
            this.setState({ account: (await this.props.web3.eth.requestAccounts())[0]})

            //format votes
            if(this.props.delegate.votes >= 1_000_000) {
                this.setState({ votes: (this.props.delegate.votes / 1_000_000).toFixed(2) + 'M' });
            } else if(this.props.delegate.votes >= 1_000) {
                this.setState({ votes: (this.props.delegate.votes / 1_000).toFixed(2) + 'K' });
            } else {
                this.setState({ votes: (this.props.delegate.votes).toFixed(0) });
            }

            //check if address has an ens name
            const ens = new ENS(Web3.givenProvider);
            let name;
            try {
                name = await ens.reverse(this.props.delegate.delegate).name();
            } catch {
                name = null;
            }
            this.props.delegate.name = name
            this.forceUpdate();
        }
    }

    delegateTo = async () => {
        await this.state.uni.methods.delegate(this.props.delegate.delegate).send({ from: this.state.account });
    }

    render() {
        return (
            <div className='Delegate row'>
                <div className="col-9 delegate-key">
                    {this.props.delegate.name !== null ? this.props.delegate.name : this.props.delegate.delegate}
                    <br />
                    votes: {this.state.votes} UNI
                </div>
                <div className="col-3 delegate-button-container">
                    <button type="button" className="btn btn-primary" onClick={this.delegateTo}>Delegate</button>
                </div>
            </div>
        );
    }
}

export default Delegate;