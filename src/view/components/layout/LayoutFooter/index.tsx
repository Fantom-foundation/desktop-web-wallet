import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styles from './styles.module.scss';

export const LayoutFooter = () => (
  <footer className={styles.footer}>
    <Container>
      <Row>
        <Col lg={12}>
          <div className={styles.footerContent}>
            <h6 className="mb-0">
              ©2019 Fantom Foundation. All rights reserved
            </h6>
            <div className={styles.socialIcon}>
              <a
                href="https://t.me/Fantom_English%20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-telegram-plane" />
              </a>
              <a
                href="https://twitter.com/FantomFDN"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="https://github.com/Fantom-Foundation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);
