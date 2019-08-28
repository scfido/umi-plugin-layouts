import React from 'react';
import styles from "./index.css"

export default props => {
  const { children } = props;
  return (
    <React.Fragment>
      <div><h1 className={styles.h1}>后台管理布局</h1></div>
      <div>{children}</div>
    </React.Fragment>
  );
};
