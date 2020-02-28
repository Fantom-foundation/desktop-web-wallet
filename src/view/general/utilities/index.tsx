
import Web3 from 'web3'
import BigNum from 'big-integer';

export const GAS_PRICE = 0x000000000001;



export async function estimationMaxFantomBalance(fantomWei: string, from = "") {
  const maxFantomBalanceWei = BigNum(Web3.utils.toWei(fantomWei.toString())).minus(GAS_PRICE);
  return Web3.utils.fromWei(maxFantomBalanceWei.toString(), "ether");
  // due to mock bignumber it is difficult to evaluate the behavior
}

export const convertFTMValue = value => {
  if (value) {
    const convertValue = value;
    if (convertValue <= 0.01) return convertValue.toFixed(8);
    return Number(convertValue.toFixed(2));
  }
  return 0;
};

