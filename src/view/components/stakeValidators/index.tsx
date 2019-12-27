/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import styles from './styles.module.scss';
import mockData from './mockData';
import { Card, Collapse, Table, Button } from 'reactstrap';
import classnames from 'classnames';
import { ArrowUpDownIcon } from 'src/view/components/svgIcons';

const SubView = props => {
  const { title, value, poi, uptime } = props;
  return (
    <tr>
      <td className="px-md-3">
        <p className={classnames(styles.txDetails, styles.label)}>
          {title}
          <span>:</span>
        </p>
      </td>
      <td className="px-md-3">
        <p className={classnames(styles.txDetails, styles.value)}>
          <b>{value}</b>
        </p>
      </td>
    </tr>
  );
};
const DataRow = props => {
  // eslint-disable-next-line one-var
  const {
      index,
      name,
      poi,
      validatingPower,
      uptime,
      subView = [],
      nodeFull = false,
    } = props,
    [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <tr className={styles.contentRow} onClick={() => setIsOpen(!isOpen)}>
        <td className={styles.indexBox}>
          <p className={classnames(styles.txDetails, styles.index)}>{index}</p>
        </td>
        <td>
          <p className={styles.txDetails}>
            <b>{name}</b>
          </p>
        </td>
        <td className="no-mobile">
          <p className={styles.txDetails}>{poi}</p>
        </td>
        <td className="text-right text-md-left">
          <p className={classnames(styles.validatingPowerLable, 'd-md-none')}>
            Validating power
          </p>
          <p className={styles.txDetails}>{validatingPower}</p>
        </td>
        <td className="no-mobile">
          <p className={styles.txDetails}>{uptime}</p>
        </td>
      </tr>
      <tr className={styles.subViewRow}>
        <td colSpan={5} className="p-0">
          <Collapse isOpen={isOpen}>
            <div className={styles.subViewContainer}>
              <table className={styles.subViewTable}>
                <tr>
                  <td className="d-md-none">
                    <p className={classnames(styles.txDetails, styles.label)}>
                      Proof of Importance
                    </p>
                  </td>
                  <td className="d-md-none">
                    <p className={classnames(styles.txDetails, styles.value)}>
                      {poi}
                    </p>
                  </td>
                  <td className="d-md-none">
                    <p className={classnames(styles.txDetails, styles.label)}>
                      Uptime
                    </p>
                  </td>
                  <td className="d-md-none">
                    <p className={classnames(styles.txDetails, styles.value)}>
                      {uptime}
                    </p>
                  </td>
                </tr>
                {subView.map((data: object) => (
                  <SubView key={name + 1} {...data} />
                ))}
              </table>
              <div className="text-center pt-2">
                {nodeFull ? (
                  <p className={styles.txDetails}>
                    <b>
                      This node is full at the moment.
                      <br />
                      Please select a different node.
                    </b>
                  </p>
                ) : (
                  <Button
                    color="topaz"
                    className={classnames('lg outlined', styles.selectBtn)}
                  >
                    Select
                  </Button>
                )}
              </div>
            </div>
          </Collapse>
        </td>
      </tr>
    </>
  );
};

export default () => (
  <Card className={styles.card}>
    <h2 className={classnames(styles.title, 'font-weight-extra-bold')}>
      Validators
    </h2>
    <p className={styles.dec}>Click on a validator for more info</p>
    <div>
      <Table className={styles.table}>
        <thead className={styles.tableHead}>
          <th />
          <th
            className={classnames({ [styles.up]: false, [styles.down]: false })}
          >
            Name
            <ArrowUpDownIcon />
          </th>
          <th
            className={classnames({ [styles.up]: false, [styles.down]: true })}
          >
            PoI
            <ArrowUpDownIcon />
          </th>
          <th
            className={classnames({ [styles.up]: false, [styles.down]: false })}
          >
            Validating power
            <ArrowUpDownIcon />
          </th>
          <th
            className={classnames({ [styles.up]: false, [styles.down]: false })}
          >
            Uptime
            <ArrowUpDownIcon />
          </th>
        </thead>
        <tbody>
          {mockData.map((data, index) => (
            <DataRow key={data.id} index={index + 1} {...data} />
          ))}
        </tbody>
      </Table>
    </div>
  </Card>
);
