import React, { FC } from "react";
import Particles from "react-particles-js";
import { PARTICLES_PARAMS } from "~/constants/particles";
import styles from "./styles.module.scss";
import { Layout } from "~/view/components/layout/Layout";
import { Link } from "react-router-dom";

const Home: FC<{}> = () => {
  return (
    <Layout noFooter>
      <div className={styles.banner}>
        <h2 className={styles.slogan}>Operachain Powered Wallet</h2>

        <h3 className={styles.subtitle}>Send and Receive FTM</h3>

        <div className={styles.buttons}>
          <Link className={styles.rounded} to="/account/create">
            Create Wallet
          </Link>

          <a
            className={styles.rounded}
            href="http://fantom.foundation/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
      </div>

      <Particles params={PARTICLES_PARAMS} className={styles.particles} />
    </Layout>
  );
};

export default Home;
