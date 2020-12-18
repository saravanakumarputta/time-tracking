import React from 'react';
import './TextBox.css';

function TextBox(props) {
	let { label, value, changeHandler, errMsg } = props;
	return (
		<div className='input-control'>
			<label className='label'>{label}</label>
			<input
				type='text'
				className='text-input'
				value={value}
				onChange={(e) => {
					changeHandler(e.target.value);
				}}
			/>
			{errMsg ? <div className='errColor'>{errMsg}</div> : null}
		</div>
	);
}

export default TextBox;
