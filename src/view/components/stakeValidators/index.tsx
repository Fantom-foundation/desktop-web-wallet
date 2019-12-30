/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import mockData from './mockData';
import { connect } from 'react-redux';
import { Card, Collapse, Table, Button } from 'reactstrap';
import classnames from 'classnames';
import { ArrowUpDownIcon } from 'src/view/components/svgIcons';
import { getValidatorsList as getValidatorsListAction } from '../../../redux/stake/actions';

const SubView = ({ totalStaked, spaceLeft, txRewardWeight, stackeLeftPer }) => {
  console.log(stackeLeftPer, '****stackeLeftPer');
  return (
    <>
      <tr>
        <td className="px-md-3">
          <p className={classnames(styles.txDetails, styles.label)}>
            Total staked:
          </p>
        </td>
        <td className="px-md-3">
          <p className={classnames(styles.txDetails, styles.value)}>
            <b>
              {totalStaked} FTM ({stackeLeftPer}% full)
            </b>
          </p>
        </td>
      </tr>
      <tr>
        <td className="px-md-3">
          <p className={classnames(styles.txDetails, styles.label)}>
            Space left:
          </p>
        </td>
        <td className="px-md-3">
          <p className={classnames(styles.txDetails, styles.value)}>
            <b>{spaceLeft} FTM</b>
          </p>
        </td>
      </tr>
      <tr>
        <td className="px-md-3">
          <p className={classnames(styles.txDetails, styles.label)}>
            Commission:
          </p>
        </td>
        <td className="px-md-3">
          <p className={classnames(styles.txDetails, styles.value)}>
            <b>{txRewardWeight}%</b>
          </p>
        </td>
      </tr>
    </>
  );
};
const DataRow = props => {
  // eslint-disable-next-line one-var
  const {
    id,
    index,
    address: name,
    poi,
    validationScore: validatingPower,
    uptime,
    subView = [],
    totalStake,
    delegatedMe,
    txRewardWeight,
    validators,
    deactivatedTime,
    createdTime,
    handleValidatorSelect,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  // const createdtime = new Date(createdTime)
  const currDate = Math.round(new Date().getTime() / 1000);

  const upTime =
    100 - (Number(deactivatedTime) / (currDate - Number(createdTime))) * 100;
  // Validator is full if "delegatedMe" = "stake"*15

  const totalStaked = Number(totalStake) / 10 ** 18;
  // const spaceLeft = totalStaked - Number(delegatedMe);
  const spaceLeft = Number(
    ((Number(totalStake) * 15 - Number(delegatedMe)) / 10 ** 18).toFixed(2)
  );
  const perc = (spaceLeft / totalStaked) * 100;
  // const isFull = Number(delegatedMe) === totalStaked * 15;
  const stackeLeftPer = (Number(delegatedMe) / (totalStaked * 15)) * 100;
  console.log(perc, '******perc');
  const nodeFull = 15 * Number(totalStake) - Number(delegatedMe);

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
        <td>
          <p className={styles.txDetails}>{upTime}%</p>
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
                <SubView
                  key={name + 1}
                  spaceLeft={spaceLeft}
                  stackeLeftPer={stackeLeftPer}
                  txRewardWeight={txRewardWeight}
                  totalStaked={totalStaked}
                />
              </table>
              <div className="text-center pt-2">
                {nodeFull <= 0 ? (
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
                    onClick={() => handleValidatorSelect({ name, id })}
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

const validator = props => {
  const { getValidatorsList, validators, handleValidatorSelect } = props;
  console.log(validators, '******validators');

  useEffect(() => {
    getValidatorsList();
  }, [getValidatorsList]);

  if (!validators || (validators && validators.length === 0)) return null;

  return (
    <Card className={styles.card}>
      <h2 className={classnames(styles.title, 'font-weight-extra-bold')}>
        Validators
      </h2>
      <p>Click on a validator for more info</p>
      <div>
        <Table className={styles.table}>
          <thead className={styles.tableHead}>
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
              <DataRow
                key={data.id}
                index={index + 1}
                {...data}
                handleValidatorSelect={handleValidatorSelect}
                validators={validators}
              />
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
