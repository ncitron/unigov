import React from 'react';
import AutonomousProposal from './AutonomousProposal';

class AutonomousProposalList extends React.Component {
    render() {

        let loaderOrConnect;
        if(Object.keys(this.props.web3).length === 0) {
            loaderOrConnect =
            <div class="spinner">
                <div className="btn btn-primary btn-lg" onClick={this.props.connect}>Connect Your Wallet</div>
            </div>
        }

        let noProps;
        if(loaderOrConnect == null && this.props.autoProps.length === 0) {
            noProps = 
            <div style={{ textAlign: 'center', marginTop: '25%', fontSize: '30px', color: 'grey'}}>
                None Found.
            </div>
        }

        return (
            <div>
                <div class="row">
                    <div class="col-3" />
                    <div class="col-6 ap-list">
                        <div class="delegate-title">Autonomous Proposals</div>
                        {loaderOrConnect}
                        {noProps}
                        {this.props.autoProps.map(autoProp => (
                            <AutonomousProposal autoProp={autoProp} web3={this.props.web3} />
                        ))}
                    </div>
                    <div class="col-3" />
                </div>
            </div>
        );
    }
}

export default AutonomousProposalList;