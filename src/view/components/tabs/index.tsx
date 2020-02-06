import React, { useState } from 'react';
import { Card } from 'reactstrap';
import styles from './styles.module.scss';
import classnames from 'classnames';

export default props => {
  const { tabs = [] } = props;
  const [activeTab, setActiveTab] = useState(tabs[0].title);
  const activeContent = tabs.filter(tab => tab.title === activeTab)[0].content;

  return (
    <Card className="p-0">
      <div className={styles.tabWtaper}>
        {tabs.map(({ title }) => (
          <button
            type="button"
            className={classnames(styles.tabBtn, {
              [styles.active]: title === activeTab,
            })}
            key={title}
            onClick={() => setActiveTab(title)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className={styles.contentWtaper}>{activeContent}</div>
    </Card>
  );
};
