import React from 'react';
import { Row, Col, Card, Table } from 'reactstrap';
import styles from './styles.module.scss';
import { ArrowUpDownIcon } from 'src/view/components/svgIcons';
import classnames from 'classnames';
import fantomActive from '../../../images/dashboard-icons/Archive/fantom-active.svg';
import SearchIcon from '../../../images/dashboard-icons/Archive/search.svg';

export default () => (
  <div>
    <Row>
      <Col md={4} className="mb-6">
        <Card className="h-100">
          <p className="fcard-label mb-0">
            Supply balance
            <span className={`${styles.infoIcon} ml-2`}>
              <i className="fas fa-info-circle" />
              {/* <div className={styles.tooltipWrapper}>
                <p className="mb-0">
                  The keystore file will contain your encrypted private key.
                  <br />
                  You’ll need the password to decrypt it. Don’t lose them!
                </p>
              </div> */}
            </span>
          </p>
          <div className="d-flex justify-content-between align-items-end h-100">
            <div>
              <h3 className="pt-3">0 fUSD</h3>
              <h4 className="opacity-5 mb-3 font-weight-semi-bold">Earning</h4>
            </div>
            <div>
              <h3 className="pt-3">500.00 fUSD</h3>
              <h4 className="opacity-5 mb-3 font-weight-semi-bold">
                Supply balance
              </h4>
            </div>
          </div>
        </Card>
      </Col>
      <Col md={4} className="mb-6">
        <Card className="h-100">
          <p className="fcard-label mb-0">
            Collateral
            <span className={`${styles.infoIcon} ml-2`}>
              <i className="fas fa-info-circle" />
            </span>
          </p>
          <div className={styles.circle}>
            <h3>50%</h3>
          </div>
        </Card>
      </Col>
      <Col md={4} className="mb-6">
        <Card className="h-100">
          <p className="fcard-label mb-0">
            Borrow balance
            <span className={`${styles.infoIcon} ml-2`}>
              <i className="fas fa-info-circle" />
            </span>
          </p>
          <div className="d-flex justify-content-between align-items-end h-100">
            <div>
              <h3 className="pt-3">500.00 fUSD </h3>
              <h4 className="opacity-5 mb-3 font-weight-semi-bold">
                Borrow limit
              </h4>
            </div>
            <div>
              <h3 className="pt-3">0 fUSD</h3>
              <h4 className="opacity-5 mb-3 font-weight-semi-bold">
                Borrow balance
              </h4>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col md={6} className="mb-6">
        <Card>
          <Table className={styles.table}>
            <thead className={styles.tableHead}>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                Asset
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: true,
                })}
              >
                APR
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                Balance
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                Supply
              </th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src={fantomActive} className="mr-3" alt="" />
                  Fantom
                </td>
                <td>5.70%</td>
                <td>
                  <p className="mb-0">150,615.22 FTM</p>
                  <h5 className="mb-0 text-black opacity-6">1,506.15 fUSD</h5>
                </td>
                <td>
                  <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Col>
      <Col md={6} className="mb-6">
        <Card>
          <Table className={styles.table}>
            <thead className={styles.tableHead}>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                <span>
                  <img src={SearchIcon} width="30" alt="" />
                </span>
                Asset
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: true,
                })}
              >
                Borrow APR
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                Borrowed
                <ArrowUpDownIcon />
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                % of limit
                <ArrowUpDownIcon />
              </th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span
                    className={classnames(styles.orange, styles.circleShape)}
                  />
                  <span className={styles.leftSpace}>Fantom</span>
                </td>
                <td>5.70%</td>
                <td>
                  <p className="mb-0">0 iBTC</p>
                  <h5 className="mb-0 text-black opacity-6">0 fUSD</h5>
                </td>
                <td>0%</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  </div>
);
