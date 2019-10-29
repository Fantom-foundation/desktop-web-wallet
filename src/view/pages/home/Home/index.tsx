import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Particles from 'react-particles-js';
import { PARTICLES_PARAMS } from '~/constants/particles';
import * as styles from './styles.module.scss';
import { Layout } from '~/view/components/layout/Layout';

class Home extends React.PureComponent {
  learnMore() {
    window.open('http://fantom.foundation/');
  }

  render() {
    return (
      <Layout noFooter>
        <div id="home" className="home landing-page">
          <section className="landing-banner">
            <Container>
              <Row className="main-row">
                <Col className="text-center">
                  <h2 className="title text-white text-uppercase">
                    <span>Operachain Powered Wallet</span>
                  </h2>

                  <h3 className="title text-white text-uppercase">
                    <span>Send and Receive FTM</span>
                  </h3>

                  <Button
                    color="dark"
                    className="rounded"
                    // onClick={() => this.goToPage('/create-account')}
                  >
                    Create Wallet
                  </Button>

                  <Button color="dark" className="rounded" onClick={this.learnMore}>
                    Learn More
                  </Button>
                </Col>
              </Row>
            </Container>
            <div id="particles-js">
              <Particles params={PARTICLES_PARAMS} className={styles.particles} />
            </div>

            <span id="scripts" />
          </section>
        </div>
      </Layout>
    );
  }
}

// Home.propTypes = {
//   history: PropTypes.oneOfType([PropTypes.object]).isRequired,
// };

export default Home;
