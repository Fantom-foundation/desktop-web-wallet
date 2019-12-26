import React, { useState, FC, useCallback, useEffect } from 'react';
import { Card } from 'reactstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';
// import AddIcon from '../../../../images/icons/add.svg';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { selectAccount } from '~/redux/account/selectors';
import { push as historyPush } from 'connected-react-router';
import { convertFTMValue } from '~/view/general/utilities'
import { AccountCreateCredentialForm } from '~/view/components/account/AccountCreateCredentialForm';

// export default ({ address = '', balance = '', addNew = false }) => {
//   const [addNewWallet, setAddNewWallet] = useState(false)
//   console.log('*****addNewWallet', addNewWallet)
//   return (
//     <>
//       {addNewWallet &&
//       <AccountCreateCredentialForm
//         push={push}
//         onSubmit={accountCreateSetCredentials}
//         list={list}
//       />}

//       <Card className={classnames({ [styles.addCard]: addNew }, 'h-100')}>
//         {addNew ? (
//           <div className="text-center">

//             <>
//               <div className={styles.addCardBtn}>
//                 <button type="button" className="btn btn-dark-periwinkle mb-4 px-5" onClick={() => setAddNewWallet(!addNewWallet)}>
//           Create a new wallet
//                 </button>
//                 <button type="button" className="btn btn-topaz px-5">
//           Access your wallet
//                 </button>
//               </div>
//             </>
//           </div>
//     ) : (
//       <>
//         <p className="card-label mb-0">Address</p>
//         <h2 className={classnames(styles.value, 'mb-4')}>{address}</h2>
//         <p className="card-label mb-0">Balance</p>
//         <h2 className={styles.value}>{balance}</h2>
//       </>
//     )}
//       </Card>
//     </>)
// };

const mapStateToProps = state => ({
  accountData: selectAccount(state),
});

const mapDispatchToProps = {
  accountCreateSetCredentials: ACCOUNT_ACTIONS.accountCreateSetCredentials,
  accountGetBalance: ACCOUNT_ACTIONS.accountGetBalance,

  push: historyPush,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteComponentProps & {
    address: string;
    addNew: boolean;
    balance: string;
    accountGetBalance: (address: string) => {};
  };

const AddressCardCreateWallet: FC<IProps> = ({
  push,
  address = '',
  accountData,
  addNew = false,
  accountGetBalance,
}) => {
  const balance =  accountData.list && address && accountData.list[address].balance;

  // const getBalance = useCallback(() => accountGetBalance(address), [
  //   address,
  //   accountGetBalance,
  // ]);
  useEffect(() => {
    accountGetBalance(address)
  }, [accountGetBalance, address]);

  return (
    <>
      <div className={styles.addCardWrapper}>
        <Card className={classnames({ [styles.addCard]: addNew }, 'h-100')}>
          {addNew ? (
            <div className="text-center">
              <>
                <div className={styles.addCardBtn}>
                  <button
                    type="button"
                    className="btn btn-dark-periwinkle mb-4 px-5"
                    onClick={() => push('/account/create')}
                  >
                    Create a new wallet
                  </button>
                  <button type="button" className="btn btn-topaz px-5">
                    Access your wallet
                  </button>
                </div>
              </>
            </div>
          ) : (
            <>
              <p className="card-label mb-0">Address</p>
              <h2 className={classnames(styles.value, 'mb-4')}>{address}</h2>
              <p className="card-label mb-0">Balance</p>
              <h2 className={styles.value}>{convertFTMValue(parseFloat(balance))}</h2>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

const AccountCreateAddNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddressCardCreateWallet));

export default AccountCreateAddNew;
