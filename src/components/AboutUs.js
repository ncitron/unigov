import React from 'react';
import { abi as uniABI } from '../abi/uni.json';

class AboutUs extends React.Component {

    state = {
        uni: {},
        account: ''
    }

    omponentDidMount = async () => {
        if(Object.keys(this.props.web3).length !== 0) {
            this.setup();
        }
    }

    delegateTo = async () => {
        if(Object.keys(this.props.web3).length == 0) {
            await this.props.connect();
        }
        await this.setup();
        await this.state.uni.methods.delegate('0x686B4535FF6573cef3FF37419A4fc6Ac775Ec7ea').send({ from: this.state.account });
    }

    setup = async () => {
        console.log('setup')
        const uniAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
        this.setState({ uni: new this.props.web3.eth.Contract(uniABI, uniAddress) });
        this.setState({ account: (await this.props.web3.eth.requestAccounts())[0]})
        this.props.setup();
    }

    render() {
        return (
            <div>
                <div className="col-10 ap-list aboutus">
                    <div className="aboutus-title">
                        About Us
                    </div>
                    <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <br />
                        <h2 style={{ textAlign: 'center' }}>
                            <img src="./penguin-party.png" title="Penguin Party" alt="Uniswap Governace | Penguin Party"/>
                            <br />
                            <div>🦄 Codecks 🦄</div>
                            <br />
                            <div style={{ fontSize: '16px'}}><em>Integration — Waving our Magic Decentralization Wand for Penguins Everywhere:</em></div>
                        </h2>
                        <p><img src="https://cdn-images-1.medium.com/max/2000/0*wnD9UBi83NqomtpN.gif" alt=""></img></p>
                        <p>Gather up, Penguins! You have been called to action! Now is the time to join us and have your voice heard in Defi governance! We think we have something important to say, when we say, you have a say, in what we say…anyway…</p>
                        <p><img src="https://cdn-images-1.medium.com/max/2000/1*m8ILTaniXU-V64FXRzbB5w.gif" alt="Waddle on…"></img></p>
                        <p>We at Penguin Party were looking for ways to let the community give us feedback and contribute to our mission! So, in that aim, we have integrated codecks to help us start our mission to gamify participation!</p>
                        <p><a href="https://open.codecks.io/-penguinparty">https://open.codecks.io/-penguinparty</a></p>
                        <p>Now you can see exactly what we’re working on and why, who’s working on it, and as we develop our cards/decks/journeys. Now you can see what it all means! We are now totally transparent. The community can suggest ideas to the codecks by voting it in on our discord with the command: !idea [idea] in #general. : )</p>
                        <p>Come plan the future of decentralized governance with us, at Penguin Party!&nbsp;
                        <a href="https://discord.gg/mSFmsB">https://discord.gg/mSFmsB</a></p>
                        <p><img src="https://cdn-images-1.medium.com/max/2000/1*HUCFYJcUUkND6jedFIOtPA.gif" alt=""></img></p>
                        <p>Signed,
                        0x0be0ecc301a1c0175f07a66243cff628c24db852
                        PenguinParty.eth
                        </p>
                        <div className="delegate-button-container" style={{ marginTop: '0px', float: 'left' }}>
                            <button type="button" className="btn btn-primary" onClick={this.delegateTo}>Delegate to Penguin Party</button>
                        </div>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}
export default AboutUs;
