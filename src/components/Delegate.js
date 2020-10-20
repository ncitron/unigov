import React from 'react';
import Web3 from 'web3'
import { abi as uniABI } from '../abi/uni.json';
//import  ENS from 'ethereum-ens';
const ENS = require('ethereum-ens');

class Delegate extends React.Component {

    state = {
        uni: {},
        account: ''
    }

    async componentDidMount() {
        const web3 =new Web3(Web3.givenProvider);
        const uniAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
        this.setState({ uni: new web3.eth.Contract(uniABI, uniAddress) });
        this.setState({ account: (await web3.eth.requestAccounts())[0]})

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

    delegateTo = async () => {
        console.log('delegating')
        console.log(this.state.account);
        await this.state.uni.methods.delegate(this.props.delegate.delegate).send({ from: this.state.account })
    }

    render() {
        return (
            <div className='Delegate row'>
                <div class="col-9">
                    {this.props.delegate.name !== null ? this.props.delegate.name : this.props.delegate.delegate}
                    <br />
                    votes: {this.props.delegate.votes} UNI
                </div>
                <div class="col-3 delegate-button-container">
                    <button type="button" class="btn btn-primary" onClick={this.delegateTo}>Delegate</button>
                </div>
            </div>
        );
    }
}

export default Delegate;