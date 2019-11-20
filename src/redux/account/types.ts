import { EncryptedKeystoreV3Json } from "web3-core";

export interface IAccount {
  name: string;
  icon: string;
  publicAddress: string;
  balance: string;
  keystore: EncryptedKeystoreV3Json | null, 

  is_loading_balance: boolean; 
}