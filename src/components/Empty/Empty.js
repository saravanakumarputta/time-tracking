import React from 'react';
import './Empty.css';

import empty from '../../assets/empty.svg'


function Empty(props) {
  let { errMsg } = props;
  return <div className="dflex flexcolumn alignHorizontal alignVertical no-content h100">
    <div className="image-holder">
      <img src={empty} alt="Empty" />
    </div>
    <div>{errMsg}</div>
  </div >
}

export default Empty;