/* eslint-disable no-unused-vars */
import { IAccountState } from '.';
import { ACCOUNT_ACTIONS } from './constants';
import { IAccount } from './types';

export const accountSetCreate = (create: Partial<IAccountState['create']>) => ({
  type: ACCOUNT_ACTIONS.SET_CREATE,
  create,
});

export const accountSetFTMtoUSD = (price: string) => {
  return {
    type: ACCOUNT_ACTIONS.SET_FTM_USD,
    price,
  };
};

export const accountSetFTMMarketCap = (marketCap: string) => {
  return {
    type: ACCOUNT_ACTIONS.SET_FTM_MARKET_CAP,
    marketCap,
  };
};

export const accountSetCreateStage = (
  stage: Partial<IAccountState['create']['stage']>
) => ({
  type: ACCOUNT_ACTIONS.SET_CREATE_STAGE,
  stage,
});

export const accountCreateSetCredentials = (
  create: Partial<IAccountState['create']>
) => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_CREDENTIALS,
  create,
});

export const accountCreateSetRestoreCredentials = (
  create: Partial<IAccountState['create']>
) => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_RESTORE_CREDENTIALS,
  create,
});

export const accountCreateSetInfo = () => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_INFO,
});

export const accountCreateSetConfirm = () => ({
  type: ACCOUNT_ACTIONS.CREATE_SET_CONFIRM,
});

export const accountCreateRestoreMnemonics = ({
  mnemonic,
}: Pick<IAccountState['create'], 'mnemonic'>) => ({
  type: ACCOUNT_ACTIONS.CREATE_RESTORE_MNEMONICS,
  mnemonic,
});

export const accountCreateRestorePrivateKey = ({
  privateKey,
}: Pick<IAccountState['create'], 'privateKey'>) => ({
  type: ACCOUNT_ACTIONS.CREATE_RESTORE_PRIVATE_KEY,
  privateKey,
});

export const accountCreateCancel = () => ({
  type: ACCOUNT_ACTIONS.CREATE_CANCEL,
});

export const accountCreateClear = () => ({
  type: ACCOUNT_ACTIONS.CREATE_CLEAR,
});

export const accountSetList = (list: IAccountState['list']) => ({
  type: ACCOUNT_ACTIONS.SET_LIST,
  list,
});

export const accountAddAccount = (account: IAccount) => ({
  type: ACCOUNT_ACTIONS.ADD_ACCOUNT,
  account,
});

export const accountGetBalance = (id: IAccount['publicAddress']) => {
  return {
    type: ACCOUNT_ACTIONS.GET_BALANCE,
    id,
  };
};

export const accountRemoveAction = (publicAddress: IAccount['publicAddress'], cb) => {
  return {
    type: ACCOUNT_ACTIONS.REMOVE_ACCOUNT,
    publicAddress,
    cb,
  };
};

export const accountGetPrivateKey = (mnemonic, cb) => ({
  type: ACCOUNT_ACTIONS.GET_PRIVATE_KEY,
  mnemonic,
  cb,
});

export const accountFTMtoUSD = () => {
  return {
    type: ACCOUNT_ACTIONS.GET_FTM_TO_USD,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const accountFTMMarketCap = (cb: any) => {
  return {
    type: ACCOUNT_ACTIONS.GET_FTM_MARKET_CAP,
    cb,
  };
};

export const accountSetAccount = (
  id: IAccount['publicAddress'],
  data: Partial<IAccount>
) => ({
  type: ACCOUNT_ACTIONS.SET_ACCOUNT,
  id,
  data,
});

export const accountSendFunds = (
  { from, to, password, amount, message },
  cb
) => ({
  type: ACCOUNT_ACTIONS.SEND_FUNDS,
  from,
  to,
  password,
  amount,
  message,
  cb,
});

export const accountSendPasswordCheck = (
  { from, to, password, amount, message },
  cb
) => ({
  type: ACCOUNT_ACTIONS.SEND_FUNDS_PASS_CHECK,
  from,
  to,
  password,
  amount,
  message,
  cb,
});

export const accountTransferClear = () => ({
  type: ACCOUNT_ACTIONS.TRANSFER_CLEAR,
});

export const accountSetTransferErrors = (
  errors: IAccountState['transfer']['errors']
) => ({
  type: ACCOUNT_ACTIONS.SET_TRANSFER_ERRORS,
  errors,
});

export const accountSetTransfer = (
  transfer: Partial<IAccountState['transfer']>
) => ({
  type: ACCOUNT_ACTIONS.SET_TRANSFER,
  transfer,
});

export const accountGetTransferFee = (gasLimit, cb) => ({
  type: ACCOUNT_ACTIONS.GET_TRANSFER_FEE,
  gasLimit,
  cb,
});

export const accountSetTransferFee = (
  fee: IAccountState['transfer']['fee']
) => ({
  type: ACCOUNT_ACTIONS.SET_TRANSFER_FEE,
  fee,
});

export const accountUploadKeystore = (file: File, password: string) => ({
  type: ACCOUNT_ACTIONS.UPLOAD_KEYSTORE,
  file,
  password,
});


export const accountSet = (account: Partial<IAccountState>) => ({
  type: ACCOUNT_ACTIONS.SET,
  account,
});

export const accountSetConnection = (
  connection: Partial<IAccountState['connection']>
) => ({
  type: ACCOUNT_ACTIONS.SET_CONNECTION,
  connection,
});

export const accountChangeProvider = (
  provider: IAccountState['connection']['current_node']
) => ({
  type: ACCOUNT_ACTIONS.CHANGE_PROVIDER,
  provider,
});

export const accountAddProvider = (address: string) => ({
  type: ACCOUNT_ACTIONS.ADD_PROVIDER,
  address,
});

export const accountReconnectProvider = () => ({
  type: ACCOUNT_ACTIONS.RECONNECT_PROVIDER,
});

export const accountProviderConnected = () => ({
  type: ACCOUNT_ACTIONS.PROVIDER_CONNECTED,
});
