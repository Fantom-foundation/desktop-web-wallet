import React, { useState, useCallback} from 'react';
import styles from './styles.module.scss';
import { Row, Col, Card } from 'reactstrap';
import { StakeSummaryCard } from 'src/view/components/cards';
import StakeValidators from 'src/view/components/stakeValidators';
import StackUnstack from 'src/view/components/stake/stakeUnstake'
import StakeInput from 'src/view/components/stake/stakeInput'
import FailureCard from 'src/view/components/stake/failureCard'
import UnstakeDecisionCard from 'src/view/components/stake/unstakeDecisionCard'
import ClaimRewardsCard from 'src/view/components/stake/claimRewardsCard'
import SuccessCard from '~/view/components/stake/sucessCard';

const overViewMock = [
  { title: 'Available to stake', value: '200,756,680.84 FTM' },
  { title: 'Currently staking', value: '0 FTM' },
];
const rewardMock = [
  { title: 'Claimed rewards', value: '0 FTM' },
  { title: 'Available to claim', value: '0 FTM' },
];
export default () => {
  const [stakeValue, setStakeValue] = useState('');
  const [step, setStep] = useState(1)
  const [type, setType] = useState('')
  const [errors, setErrors] = useState({})
  const handleStep = useCallback(actionType => {
    setStep(step + 1)
    if(actionType){
      setType(actionType)
    }
    
  }, [step]);

  const handleStackSubmit = useCallback(actionType => {
    const validation_errors = {
      stakeValueInvalid: stakeValue === '' || stakeValue === undefined || stakeValue === null,
      stakeValueMax: parseFloat(stakeValue) > 10,
      
    };

    if (Object.values(validation_errors).includes(true))
      return setErrors(validation_errors);
      setStep(step + 1)
   
    
  }, [stakeValue, step]);

  const getCurrentCard = () => {
    switch(step){
      case 1: return <StackUnstack handleStep={handleStep} />
      case 2: return  (<StakeInput 
        stakeValue={stakeValue} 
        handleChange={val => {
          setStakeValue(val), 
          setErrors({})}}
        errors={errors}
        validatorBtn={styles.validatorBtn}
        handleStep={handleStackSubmit}
      />)
      case 3: return   <StakeValidators />
      case 4: return    <StakeSummaryCard />
      case 5: return <StackUnstack handleStep={handleStep} />
      case 6: return <StackUnstack handleStep={handleStep} />
      default : break;

    }
    
  }
  return (
    <div>
      <Row>
        <Col md={6} className="mb-6">
          <Card className="h-100">
            <p className="card-label mb-4">Overview</p>
            <div className="text-right">
              {overViewMock.map(({ title, value }) => (
                <>
                  <h2 className="pt-3">{value}</h2>
                  <h3 className="opacity-5 mb-3">{title}</h3>
                </>
              ))}
            </div>
          </Card>
        </Col>

        <Col md={6} className="mb-6">
          <Card className="h-100 ">
            <p className="card-label mb-4">Rewards</p>
            <div className="text-right">
              {rewardMock.map(({ title, value }) => (
                <>
                  <h2 className="pt-3">{value}</h2>
                  <h3 className="opacity-5 mb-3">{title}</h3>
                </>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-6">
        <Col>
          {getCurrentCard()}
        </Col>
      </Row> 
      {/* <Row className="mt-6">
        <Col>
          <StackUnstack handleStep={handleStep} />
        </Col>
      </Row> */}
      {/* <Row>
        <Col>
          <StakeValidators />
        </Col>
      </Row>
     */}
      {/* <Row className="mt-6">
        <Col>
          <StakeInput 
            stakeValue={stakeValue} 
            setStakeValue={setStakeValue}
            validatorBtn={styles.validatorBtn}
            handleStep={handleStep}

          />
        </Col>
      </Row> */}
      {/* <Row className="mt-6">
        <Col>
          <Card
            className="mx-auto text-center pt-5 pb-6"
            style={{ maxWidth: 670 }}
          >
            <h2>How much FTM would you like to stake?</h2>
            <div className="mx-auto w-100" style={{ maxWidth: 480 }}>
              <DashboardInput
                lg
                placeholder="0"
                rightLabel="Max"
                handleChange={setTo}
              />
              <Button
                color="topaz"
                className={classnames(styles.validatorBtn, 'outlined lg')}
              >
                Select a validator
                <i className="fas fa-chevron-right" />
              </Button>
            </div>
          </Card>
        </Col>
      </Row> */}
      {/* <Row className="mt-6">
        <Col>
          <StakeSummaryCard />
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <SuccessCard cardCss={styles.card} iconGapCss={styles.iconGap} />
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <FailureCard cardCss={styles.card} iconGapCss={styles.iconGap} />
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <UnstakeDecisionCard />
        </Col>
      </Row>
      <Row className="mt-6">
        <Col>
          <ClaimRewardsCard styles={styles} />
        </Col>
      </Row> */}
    </div>
  );
};
