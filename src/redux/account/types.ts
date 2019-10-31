import { EncryptedKeystoreV3Json } from "web3-core";

export interface IAccount {
  name: string;
  icon: string;
  publicAddress: string;
  privateKey: string;
  balance: number;
  keystore: EncryptedKeystoreV3Json | null,

  is_loading_balance: boolean; 
}