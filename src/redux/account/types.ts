import { EncryptedKeystoreV3Json } from "web3-core";

export interface IAccount {
  name: string;
  icon: string;
  public_address: string;
  balance: number;
  keystore: EncryptedKeystoreV3Json | null,

  is_loading_balance: boolean; 
}