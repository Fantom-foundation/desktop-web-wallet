import React from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';
import BTC from '../../../../../images/btc.png'

const icons = [

]
export default () => (
  <>
    <tr>
      <td>
        <h4 className="m-token mb-0">
          <img alt="" src={BTC} />
          {/* <span className="token" style={{ background: 'rgb(245, 166, 35)' }} /> */}
          iBTC
        </h4>
      </td>
      <td>5.70%</td>
      <td>
        <p className="mb-0">0 iBTC</p>
        <h5 className="mb-0 text-black opacity-6">0 fUSD</h5>
      </td>
      <td>0%</td>
    </tr>
    <tr>
      <td>
        <h4 className="m-token mb-0">
          <img alt="" src={BTC} />
          iBTC
        </h4>
      </td>
      <td>5.70%</td>
      <td>
        <p className="mb-0">0 iBTC</p>
        <h5 className="mb-0 text-black opacity-6">0 fUSD</h5>
      </td>
      <td>0%</td>
    </tr>
  </>
);
