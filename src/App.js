import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import './App.css';
import Web3 from 'web3'
import { abi as uniABI } from './abi/uni.json';
import DelegateList from './components/DelegateList';

class App extends React.Component {
    state = {
        delegates: []
    }

    async componentDidMount() {
        const web3 = new Web3(window.ethereum);
        const uniAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
        let uni = new web3.eth.Contract(uniABI, uniAddress);

        let delegations = []
        for(let i = 10_500_000; i < await web3.eth.getBlockNumber(); i+=100_000) {
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

        let delegates = [];
        Object.keys(delegateAccounts).forEach((account) => {
            const voteWeight = +delegateAccounts[account];
            if (voteWeight === 0) return;
            delegates.push({
            delegate: account,
            votes: voteWeight
            });
        });

        delegates = delegates.sort((a, b) => {
            return a.votes < b.votes ? 1 : -1;
        });

        delegates = delegates.slice(0, 50);

        for(let i = 0; i < delegates.length; i++) {
            delegates[i].votes = parseInt(await uni.methods.getCurrentVotes(delegates[i].delegate).call() / 1e18);
            console.log('sorting');
        }

        delegates = delegates.sort((a, b) => {
            return a.votes < b.votes ? 1 : -1;
        });

        this.setState({delegates: delegates.slice(0, 20)});


        this.forceUpdate();
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <div class="row header">
                        <div class="col-4 name-page">Uniswap Governance</div>
                        <div class="col-4 nav">
                            <NavLink to='/ap' className="ap-nav" style={{ textDecoration: 'none'}} activeStyle = {{ color: '#db2cc4', borderBottom: '2px solid #db2cc4'}}>
                                    Autonomous Proposals
                            </NavLink>
                            <NavLink to='/del' className="delegate-nav" 
                            style={{ textDecoration: 'none'}} 
                            activeStyle = {{ color: '#db2cc4', borderBottom: '2px solid #db2cc4'}}>
                                    Delegates
                            </NavLink>
                        </div>
                        <div class="col-4"></div>
                    </div>
                    <div class="hero" />
                    <Switch>
                        <Route path='/del'>
                            <DelegateList delegates={this.state.delegates} />
                        </Route>
                        <Route path='/ap'></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
