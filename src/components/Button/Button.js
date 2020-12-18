import React from 'react';
import './Button.css';

function Button(props) {
	let { type, label, clickHandler, disabled } = props;

	return (
		<span className={`btn pointer ${type ? type : ''} ${disabled ? 'disabled' : ''}`} onClick={disabled ? null : clickHandler}>
			{label}
		</span>
	);
}

export default Button;
