import { EncryptedKeystoreV3Json } from "web3-core";

export interface IAccount {
  icon: string;
  publicAddress: string;
  balance: string;
  keystore: EncryptedKeystoreV3Json | null, 

  is_loading_balance: boolean; 
}

export interface INodeRecord {
  address: string,
}