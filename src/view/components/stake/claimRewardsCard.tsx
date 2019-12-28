import React from 'react';
import classnames from 'classnames'
import { Button,Card} from 'reactstrap'

const ClaimRewardsCard = ({styles}) => {
  return (<Card className="mx-auto text-center pt-5 pb-6">
    <h2 className="mb-5">What would you like to do?</h2>
    <div className={styles.stakeBtnWrap} style={{ maxWidth: 640 }}>
      <div className={styles.m50}>
        <Button
          color="darkish-pink"
          className={classnames('lg outlined')}
        >
        Unstake
        </Button>
      </div>
      <div className={styles.m50}>
        <Button color="topaz" className={classnames('lg outlined')}>
        Stake
        </Button>
      </div>
      <div className={styles.m100}>
        <Button color="primary" className={classnames('lg outlined')}>
        Claim rewards
        </Button>
      </div>
    </div>
          </Card>)
}

export default ClaimRewardsCard