import React from 'react';
import { css } from "@emotion/core";
class AboutUs extends React.Component {
render() {
    let loaderOrConnect;
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;
    return (
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6" style={{ padding: '0px'}}>
                <div class="aboutus content-container">
                    <div class="aboutus-title">
                        About Us
                    </div>
                    <div style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                        <br />
                        <h2 style={{ textAlign: 'center' }}>
                            🦄Codecks🦄 Integration — Waving our Magic Decentralization Wand for Penguins Everywhere:
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
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
    )
    }
}
export default AboutUs;
