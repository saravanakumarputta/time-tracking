import React from 'react';
import './Tags.css'

function Tag(props) {
  let { name } = props;
  return <div className="tag">
    {name}
  </div>
}

export default Tag;
