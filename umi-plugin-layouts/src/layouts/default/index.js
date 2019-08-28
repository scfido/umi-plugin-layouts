import React from 'react';

export default props => {
  const { children } = props;
  return (
    <div>
      <div><h1>默认布局</h1></div>
      <div>{children}</div>
    </div>
  );
};
