import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CreateAccountForm from '~/view/components/forms/CreateAccount';

type Props = {
  formData: {
    accountName: string;
    password: string;
    reEnteredPassword: string;
    date: number;
    animateRefreshIcon: boolean;
    identiconsId: string;
    selectedIcon: string;
    error: boolean;
    containNumber: boolean;
    containCapitalLetter: boolean;
    hasLengthGreaterThanEight: boolean;
    nextButtonFunction: string;
    backButtonFunction: string;
    selectIconError: boolean;
    revealSecret: boolean;
    confirmationPhrase: string;
    isAccountNameExists: boolean;
    selectedIconError: boolean;

    onUpdate,
    getRadioIconData,
    onRefresh,
  },
}

export default class CreateAccountSection extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formData } = this.props;
    const {
      accountName,
      password,
      reEnteredPassword,
      date,
      animateRefreshIcon,
      identiconsId,
      error,
      containNumber,
      containCapitalLetter,
      hasLengthGreaterThanEight,
      selectedIcon,
      selectIconError,
      onUpdate,
      getRadioIconData,
      onRefresh,
      isAccountNameExists,
    } = formData;

    return (
      <div id="account-information" className="account-information">
        <section className="bg-dark" style={{ padding: '60px 0' }}>
          <Container>
            <Row>
              <Col>
                <CreateAccountForm
                  accountName={accountName}
                  password={password}
                  isAccountNameExists={isAccountNameExists}
                  error={error}
                  reEnteredPassword={reEnteredPassword}
                  onUpdate={onUpdate}
                  date={date}
                  animateRefreshIcon={animateRefreshIcon}
                  identiconsId={identiconsId}
                  selectedIcon={selectedIcon}
                  onRefresh={onRefresh}
                  getRadioIconData={getRadioIconData}
                  containNumber={containNumber}
                  containCapitalLetter={containCapitalLetter}
                  hasLengthGreaterThanEight={hasLengthGreaterThanEight}
                  selectIconError={selectIconError}
                />
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

// CreateAccountSection.propTypes = {
//   formData: PropTypes.oneOfType([PropTypes.object]).isRequired,
// };
