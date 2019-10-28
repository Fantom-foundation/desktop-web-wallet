import { createReducer } from '~/utility/createReducer';
import { ACCOUNT_HANDLERS } from './handlers';
import { AccountCreateCredentials } from '~/view/pages/create-account/AccountCreateCredentials';

export const ACCOUNT_CREATION_STAGES = {
  CREDENTIALS: 0,
  INFO: 1,
  CONFIRM: 2,
};

export const ACCOUNT_CREATION_STAGES_COMPONENTS = {
  [ACCOUNT_CREATION_STAGES.CREDENTIALS]: AccountCreateCredentials,
};

export interface IAccountState {
  create: {
    stage: typeof ACCOUNT_CREATION_STAGES[keyof typeof ACCOUNT_CREATION_STAGES];
    name: string;
    password: string;
    icon: string;
    mnemonic: string[];
    errors: Record<string, string>;
  };
}

const INITIAL_STATE: IAccountState = {
  create: {
    stage: ACCOUNT_CREATION_STAGES.CREDENTIALS,
    name: '',
    password: '',
    icon: '',
    mnemonic: [],
    errors: {},
  },
};

export const account = createReducer(INITIAL_STATE, ACCOUNT_HANDLERS);
