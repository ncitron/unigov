import React from 'react';
import { css } from "@emotion/core";
class CodecksInfo extends React.Component {
render() {
    let loaderOrConnect;

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    `;
    return (
      <iframe src="https://open.codecks.io/-penguinparty/" title="About Us"></iframe>

    );
    }
}
export default CodecksInfo;
