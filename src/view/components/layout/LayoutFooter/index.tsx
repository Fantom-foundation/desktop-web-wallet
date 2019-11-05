import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styles from './styles.module.scss';

export const LayoutFooter = () => (
  <footer className={styles.footer}>  
    <Container>
      <Row>
        <Col sm={6} md={3}>
          <h2 className="menu-title">English Channel</h2>
          <ul className="menu">
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://t.me/Fantom_English%20"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </li>
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://www.facebook.com/Fantom.Foundation.English/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://twitter.com/FantomFDN"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://medium.com/fantomfoundation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium
              </a>
            </li>
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://github.com/Fantom-Foundation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://www.youtube.com/channel/UCHON5FzG4iqFjx8f1pbZC_g"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            </li>
          </ul>
        </Col>
        <Col sm={6} md={3}>
          <h2 className="menu-title">Korean Channel</h2>
          <ul className="menu">
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://t.me/fantom_korean"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </li>
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://www.facebook.com/FANTOM.Foundation/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://open.kakao.com/o/gkxyDLK"
                target="_blank"
                rel="noopener noreferrer"
              >
                KakaoTalk
              </a>
            </li>
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://blog.naver.com/fantomfoundation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Naver
              </a>
            </li>
          </ul>
        </Col>
        <Col sm={6} md={3}>
          <h2 className="menu-title">Chinese Channel</h2>
          <ul className="menu">
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://t.me/fantom_chinese%20"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
            </li>
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://www.weibo.com/FantomFoundation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Weibo
              </a>
            </li>
          </ul>
        </Col>
        <Col sm={6} md={3}>
          <h2 className="menu-title">Contact Us</h2>
          <ul className="menu">
            <li className="menu-item">
              <a
                className="menu-link"
                href="https://fantom.foundation/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fantom
              </a>
            </li>
            <li className="menu-item">
              <a
                className="menu-link"
                href="mailto:contact@fantom.foundation"
                rel="noopener noreferrer"
              >
                Mail
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
);
