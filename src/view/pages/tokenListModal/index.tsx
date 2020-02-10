import React from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';
import { Modal, ModalBody, Table, Input } from 'reactstrap';
import { ArrowUpDownIcon } from 'src/view/components/svgIcons';
import SearchTokenList from 'src/view/pages/fLend/component/tokenList/searchTokenList';
import SearchInput from 'src/view/components/forms/searchInput';

export default ({ isOpen = false, toggle }) => {
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered className={styles.modal}>
        <ModalBody className={styles.body}>
          <div className={styles.header}>
            <i className="fas fa-chevron-left" />
            <h2>Tokens available for borrowing</h2>
          </div>
          <SearchInput />
          <Table className={styles.table}>
            <thead className={styles.tableHead}>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                <div className={styles.tableHeading}>
                  Asset
                  <ArrowUpDownIcon />
                </div>
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: true,
                })}
              >
                <div className={styles.tableHeading}>
                  Borrow APR
                  <ArrowUpDownIcon />
                </div>
              </th>
              <th
                className={classnames({
                  [styles.up]: false,
                  [styles.down]: false,
                })}
              >
                <div className={styles.tableHeading}>
                  Price (fUSD)
                  <ArrowUpDownIcon />
                </div>
              </th>
            </thead>
            <tbody>
              <SearchTokenList />
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </>
  );
};
