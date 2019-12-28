import React from 'react'
import classnames from 'classnames'
import { Card, Button } from 'reactstrap';


const stackUnstack = ({handleStep}) => {
  return  (<Card
    className="mx-auto text-center pt-5 pb-6"
    style={{ maxWidth: 670 }}
  >
    <h2 className="mb-5">What would you like to do?</h2>
    <div
      className="mx-auto mt-4 w-100 d-flex justify-content-between"
      style={{ maxWidth: 480 }}
    >
      <Button className={classnames('lg mx-4')} onClick={() => handleStep('unstake')}>Unstake</Button>
      <Button color="topaz" onClick={() => handleStep('stake')} className={classnames('lg outlined mx-4')}>
      Stake
      </Button>
    </div>
  </Card>)
}

export default stackUnstack