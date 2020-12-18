import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

function Header() {
	return (
		<div className='header-container'>
			<div className='dflex section-container'>
				<div className='flexgrow brand'>
					<Link to='/'>Time Tracking</Link>
				</div>
				<div>
					<Link to='/addTask'>Add Task</Link>
				</div>
			</div>
		</div>
	);
}

export default Header;
