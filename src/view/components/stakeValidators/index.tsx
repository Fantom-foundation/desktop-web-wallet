/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import styles from './styles.module.scss';
import mockData from './mockData';
import { Card, Collapse, Table, Button } from 'reactstrap';
import classnames from 'classnames';

const SubView = props => {
  const { title, value } = props;
  return (
    <tr>
      <td className="px-3">
        <p className={styles.txDetails}>{title}:</p>
      </td>
      <td className="px-3">
        <p className={styles.txDetails}>
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
        <td>
          <p className={styles.txDetails}>{poi}</p>
        </td>
        <td>
          <p className={styles.txDetails}>{validatingPower}</p>
        </td>
        <td>
          <p className={styles.txDetails}>{uptime}</p>
        </td>
      </tr>
      <tr className={styles.subViewRow}>
        <td colSpan={5} className="p-0">
          <Collapse isOpen={isOpen}>
            <div className={styles.subViewContainer}>
              <table>
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
                  <Button color="topaz" className="lg outlined">
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
  <Card>
    <h2 className="font-weight-extra-bold">Validators</h2>
    <p>Click on a validator for more info</p>
    <div>
      <Table className={styles.table}>
        <thead>
          <th />
          <th>Name</th>
          <th>PoI</th>
          <th>Validating power</th>
          <th>Uptime</th>
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
