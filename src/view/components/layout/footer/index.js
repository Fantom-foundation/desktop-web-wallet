import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer id="footer">
        <Container>
          <Row>
            <Col sm={6} md={3}>
              <h2 className="menu-title">Resources</h2>
              <ul className="menu">
                <li className="menu-item">
                  <a className="menu-link" href="/">
                    Documentation
                  </a>
                </li>
                <li className="menu-item">
                  <a className="menu-link" href="/">
                    Legal
                  </a>
                </li>
                <li className="menu-item">
                  <a className="menu-link" href="/">
                    FAQ
                  </a>
                </li>
              </ul>
            </Col>
            <Col sm={6} md={3}>
              <h2 className="menu-title">Fantom</h2>
              <ul className="menu">
                <li className="menu-item">
                  <a
                    className="menu-link"
                    href="http://fantom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fantom.com
                  </a>
                </li>
              </ul>
            </Col>
            <Col sm={6} md={3}>
              <h2 className="menu-title">Maker</h2>
              <ul className="menu">
                <li className="menu-item">
                  <a className="menu-link" href="/">
                    Chat
                  </a>
                </li>
                <li className="menu-item">
                  <a className="menu-link" href="/">
                    Reddit
                  </a>
                </li>
              </ul>
            </Col>
            <Col sm={6} md={3}>
              <h2 className="menu-title">Follow Us</h2>
              <ul className="menu">
                <li className="menu-item">
                  <a className="menu-link" href="/">
                    Twitter
                  </a>
                </li>
                <li className="menu-item">
                  <a className="menu-link" href="/">
                    Reddit
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
