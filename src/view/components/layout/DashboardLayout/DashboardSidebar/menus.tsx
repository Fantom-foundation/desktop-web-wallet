import DashboardIcon from 'src/images/icons/sidebar/dashboard.svg';
import SendIcon from 'src/images/icons/sidebar/send.svg';
import ReceiveIcon from 'src/images/icons/sidebar/receive.svg';
import StakeIcon from 'src/images/icons/sidebar/stake.svg';
import fTradeIcon from 'src/images/icons/sidebar/f-trade.svg';
import fLendIcon from 'src/images/icons/sidebar/f-lend.svg';
import DeFiIcon from 'src/images/icons/sidebar/de-fi.svg';
// import LogoutIcon from 'src/images/icons/sidebar/logout.svg';

export default [
  { name: 'Dashboard', icon: DashboardIcon },
  { name: 'Send', icon: SendIcon },
  { name: 'Receive', icon: ReceiveIcon },
  { name: 'Stake', icon: StakeIcon },
];

export const tradeLendDefiMenu = [
  { name: 'Dashboard', icon: DashboardIcon },
  { name: 'DeFi', icon: fTradeIcon },
  { name: 'fTrade', icon: SendIcon },
  { name: 'fLend', icon: fLendIcon },
];
