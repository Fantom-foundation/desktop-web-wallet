import { EncryptedKeystoreV3Json } from "web3-core";

export interface IAccount {
  name: string;
  icon: string;
  public_address: string;
  keystore: EncryptedKeystoreV3Json,
}