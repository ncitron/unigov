import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import './App.css';
import Web3 from 'web3'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import MewConnect from "@myetherwallet/mewconnect-web-client";
import Portis from "@portis/web3";
import { abi as uniABI } from './abi/uni.json';
import apFactoryABI from './abi/apFactory.json';
import DelegateList from './components/DelegateList';
import AutonomousProposalList from './components/AutonomousProposalList';
import CodecksInfo from './components/CodecksInfo';
import AboutUs from './components/AboutUs.js';
require('dotenv').config();

class App extends React.Component {
    state = {
        delegates: [],
        autoProps: [],
        web3: {}
    }

    getDelegates = async () => {
        console.log(1)
        if(Object.keys(this.state.web3).length !== 0) {
            const uniAddress = process.env.REACT_APP_UNI_ADDRESS;
            let uni = new this.state.web3.eth.Contract(uniABI, uniAddress);

            let delegations = [];
            let startingBlock = 10_750_000;
            if(process.env.REACT_APP_NETWORK === 'goerli') startingBlock = 100_000;
            for(let i = startingBlock; i < await this.state.web3.eth.getBlockNumber()+100_000; i+=100_000) {
                console.log('indexing delegates');
                console.log(i);
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

            let delegates = [];
            Object.keys(delegateAccounts).forEach((account) => {
                const voteWeight = +delegateAccounts[account];
                if (voteWeight === 0) return;
                delegates.push({
                delegate: account,
                votes: voteWeight / 1e18
                });
            });

            delegates = delegates.sort((a, b) => {
                return a.votes < b.votes ? 1 : -1;
            });

            this.setState({delegates: delegates.slice(0, 20)});

            this.forceUpdate();
        }
    }

    getAutonomousProps = async () => {
        const apFactoryAddress = process.env.REACT_APP_AP_FACTORY_ADDRESS;
        console.log(apFactoryAddress);
        let apFactory = new this.state.web3.eth.Contract(apFactoryABI, apFactoryAddress);
        let autoProps = await apFactory.getPastEvents('CrowdProposalCreated', {
            fromBlock: 0,
            toBlock: await this.state.web3.eth.getBlockNumber()
        });
        this.setState({ autoProps: autoProps });
    }

    connect = async () => {
        console.log("connecting...");
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: process.env.REACT_APP_INFURA_KEY
                }
            },
            mewconnect: {
                package: MewConnect,
                options: {
                    infuraId: process.env.REACT_APP_INFURA_KEY
                }
            },
            portis: {
                package: Portis,
                options: {
                    id: process.env.REACT_APP_PORTIS_KEY
                }
            }
        };

        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: false,
            disableInjectedProvider: false,
            providerOptions
        });

        web3Modal.clearCachedProvider()
        const provider = await web3Modal.connect();
        this.setState({web3: new Web3(provider)});

        await this.getAutonomousProps();
        await this.getDelegates();
    }

    ConnectButton = () => {
        return (
            <button type="button" class="btn btn-primary" onClick={this.connect}>
                {Object.keys(this.state.web3) != 0 ? 'Connected' : 'Connect'}
            </button>
        )
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <div class="row header">
                        <div class="col-2 name-page">Uniswap Governance</div>
                        <div class="col-8 nav">
                            <NavLink to='/ap' className="ap-nav" style={{ textDecoration: 'none'}} activeStyle = {{ color: '#db2cc4', borderBottom: '2px solid #db2cc4'}}>
                                    Autonomous Proposals
                            </NavLink>
                            <NavLink to='/del' className="delegate-nav"
                            style={{ textDecoration: 'none'}}
                            activeStyle = {{ color: '#db2cc4', borderBottom: '2px solid #db2cc4'}}>
                                    Delegates
                            </NavLink>
                            <NavLink to='/co' className="codecks-nav"
                            style={{ textDecoration: 'none'}}
                            activeStyle = {{ color: '#db2cc4', borderBottom: '2px solid #db2cc4'}}>
                                    Codecks
                            </NavLink>
                            <NavLink to='/aboutUs' className="aboutus-nav"
                            style={{ textDecoration: 'none'}}
                            activeStyle = {{ color: '#db2cc4', borderBottom: '2px solid #db2cc4'}}>
                                    About Us
                            </NavLink>
                        </div>
                        <div class="col-2">
                            <this.ConnectButton></this.ConnectButton>
                        </div>
                    </div>
                    <div class="hero" />
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to="/ap"></Redirect>
                        </Route>
                        <Route path='/del'>
                            <DelegateList delegates={this.state.delegates} web3={this.state.web3} connect={this.connect} />
                        </Route>
                        <Route path='/ap'>
                            <AutonomousProposalList autoProps={this.state.autoProps} web3={this.state.web3} connect={this.connect}></AutonomousProposalList>
                        </Route>
                        <Route path='/co'>
                            <CodecksInfo></CodecksInfo>
                        </Route>
                        <Route path='/aboutUs'>
                            <AboutUs></AboutUs>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
