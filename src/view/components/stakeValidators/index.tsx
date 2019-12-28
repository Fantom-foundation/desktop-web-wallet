/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import mockData from './mockData';
import { connect } from 'react-redux';
import { Card, Collapse, Table, Button } from 'reactstrap';
import classnames from 'classnames';
import { ArrowUpDownIcon } from 'src/view/components/svgIcons';
import { getValidatorsList as getValidatorsListAction } from '../../../redux/stake/actions';

const SubView = props => {
  const { title, value } = props;
  return (
    <tr>
      <td className="px-md-3">
        <p className={classnames(styles.txDetails, styles.label)}>{title}:</p>
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
      address: name,
      poi,
      validationScore: validatingPower,
      uptime = '100%',
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
              <table className={styles.subViewTable}>
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

const validator = props => {
  const { getValidatorsList, validators } = props;

  useEffect(() => {
    getValidatorsList();
  }, []);

  if (!validators || (validators && validators.length === 0)) return null;

  return (
    <Card>
      <h2 className="font-weight-extra-bold">Validators</h2>
      <p>Click on a validator for more info</p>
      <div>
        <Table className={styles.table}>
          <thead>
            <th />
            <th
              className={classnames({
                [styles.up]: false,
                [styles.down]: false,
              })}
            >
              Name
              <ArrowUpDownIcon />
            </th>
            <th
              className={classnames({
                [styles.up]: false,
                [styles.down]: true,
              })}
            >
              PoI
              <ArrowUpDownIcon />
            </th>
            <th
              className={classnames({
                [styles.up]: false,
                [styles.down]: false,
              })}
            >
              Validating power
              <ArrowUpDownIcon />
            </th>
            <th
              className={classnames({
                [styles.up]: false,
                [styles.down]: false,
              })}
            >
              Uptime
              <ArrowUpDownIcon />
            </th>
          </thead>
          <tbody>
            {validators.map((data, index) => (
              <DataRow key={data.id} index={index + 1} {...data} />
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

const mapStateToProps = state => ({
  validators: state.stakes.validators,
});

const mapDispatchToProps = {
  getValidatorsList: getValidatorsListAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(validator);
