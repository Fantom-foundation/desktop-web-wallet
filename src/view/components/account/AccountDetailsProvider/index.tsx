import React, { FC, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { selectAccountConnection } from '~/redux/account/selectors';
import { DEFAULT_PROVIDERS } from '~/utility/web3';
import styles from './styles.module.scss';
import { FaIcon } from '../../inputs/FaIcon';
import * as ACCOUNT_ACTIONS from '~/redux/account/actions';
import { DialogAddNode } from '../../dialogs/DialogAddNode';

const mapStateToProps = state => ({
  connection: selectAccountConnection(state),
});

const mapDispatchToProps = {
  accountChangeProvider: ACCOUNT_ACTIONS.accountChangeProvider,
  accountAddProvider: ACCOUNT_ACTIONS.accountAddProvider,
};

type IProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {};

const AccountDetailsProviderUnconnected: FC<IProps> = ({
  connection: { current_node, custom_nodes },
  accountChangeProvider,
  accountAddProvider,
}) => {
  const [is_modal_opened, setIsModalOpened] = useState(false);
  const [is_opened, setIsOpened] = useState(false);

  const showModal = useCallback(() => setIsModalOpened(true), []);
  const hideModal = useCallback(() => setIsModalOpened(false), []);

  const onFocus = useCallback(() => setIsOpened(true), []);
  const onBlur = useCallback(() => setIsOpened(false), []);

  const nodes = [...DEFAULT_PROVIDERS, ...custom_nodes];
  const node = nodes[current_node];

  return (
    <div>
      <div
        className={styles.select}
        tabIndex={-1}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {/* <span>{`Node: ${node.name}`}</span> */}
        <FaIcon icon="fa-caret-down" />
      </div>

      {is_opened && (
        <div className={styles.list}>
          {nodes.map((item, index) => (
            <div
              className={styles.item}
              // key={`${index}`}
              onMouseDown={() => accountChangeProvider(index)}
            >
              <div className={styles.info}>
                {/* <div>{item.name}</div> */}
                <small>{item.address}</small>
              </div>

              <div className={styles.icon}>
                {current_node === index && <FaIcon icon="fa-check" />}
              </div>
            </div>
          ))}

          <div className={styles.custom_item} onMouseDown={showModal}>
            Add custom node...
          </div>
        </div>
      )}

      <DialogAddNode
        isOpened={is_modal_opened}
        onClose={hideModal}
        onAdd={accountAddProvider}
      />
    </div>
  );
};

const AccountDetailsProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetailsProviderUnconnected);

export { AccountDetailsProvider };
