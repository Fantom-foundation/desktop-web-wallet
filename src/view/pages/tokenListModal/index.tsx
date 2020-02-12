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
            <h2>
              <i className="fas fa-chevron-left" />
              Tokens available for borrowing
            </h2>
          </div>
          <SearchInput />
          <Table className="tokenTable mb-0">
            <thead className="tableHead">
              <tr>
                <th
                  className={classnames({
                    [styles.up]: false,
                    [styles.down]: false,
                  })}
                >
                  <div className="tableHeading">
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
                  <div className="tableHeading">
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
                  <div className="tableHeading">
                    Price (fUSD)
                    <ArrowUpDownIcon />
                  </div>
                </th>
              </tr>
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
