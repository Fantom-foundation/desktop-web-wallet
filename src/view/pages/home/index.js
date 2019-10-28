import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Layout from '~/view/components/layout';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const particles = document.createElement('script');
    particles.src = 'js/particles/particles.min.js';
    document.getElementById('scripts').appendChild(particles);

    particles.addEventListener('load', () => {
      const particlesApp = document.createElement('script');
      particlesApp.src = 'js/particles/app.js';
      document.getElementById('scripts').appendChild(particlesApp);

      const particlesState = document.createElement('script');
      particlesState.src = 'js/particles/lib/stats.js';
      document.getElementById('scripts').appendChild(particlesState);
    });
  }

  /**
   * @param {Page route} route
   * This method will push screen to the passed route
   */
  goToPage(route) {
    const { history } = this.props;
    history.push(route);
  }

  // eslint-disable-next-line class-methods-use-this
  learnMore() {
    // eslint-disable-next-line no-undef
    window.open('http://fantom.foundation/');
  }

  render() {
    return (
      <div id="home" className="home landing-page">
        <Layout noFooter>
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
                    onClick={() => this.goToPage('/create-account')}
                  >
                    Create Wallet
                  </Button>
                  <Button color="dark" className="rounded" onClick={this.learnMore}>
                    Learn More
                  </Button>
                </Col>
              </Row>
            </Container>
            <div id="particles-js" />
            
            <span id="scripts" />
          </section>
        </Layout>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Home;
