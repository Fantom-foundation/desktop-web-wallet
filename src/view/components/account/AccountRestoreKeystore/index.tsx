import React, { FC, useCallback, ChangeEvent } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  accountUploadKeystore: ACCOUNT_ACTIONS.accountUploadKeystore,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {};

const AccountRestoreKeystoreUnconnected: FC<IProps> = ({
  accountUploadKeystore,
}) => {
  const onUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];

      if (!file) return;

      console.log(file);
      
      // accountUploadKeystore(file, 'asdsa');
    },
    []
  );

  return (
    <section className={styles.wrap}>
      <Container>
        <Row>
          <Col>
            <div className={styles.dropzone}>
              <div className={styles.dropzone_sign}>
                <h2>Drop keystore file here</h2>

                <Button color="primary">Upload keystore file</Button>
              </div>
              <input type="file" onChange={onUpload} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const AccountRestoreKeystore = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountRestoreKeystoreUnconnected);

export { AccountRestoreKeystore };
