import React from 'react';
import './Task.css';
import Button from '../Button/Button';
import Tags from '../Tags/Tags';

import { useHistory } from 'react-router-dom';

import { getDataFromSeconds } from '../../utils';



function Task(props) {
	let history = useHistory();

	let [diff, setDiff] = React.useState('');
	let [timer, setTimer] = React.useState('')

	const calculateDiff = (startDate, endDate) => {
		var startDateObj = new Date(startDate);
		var endDateObj = new Date(endDate);
		var diffDateInMS = (endDateObj - startDateObj) / 1000;
		return getDataFromSeconds(diffDateInMS);
	}

	React.useEffect(() => {
		let { startTime, endTime } = props;
		let clearInter = null;
		if (startTime && endTime) {
			setDiff(calculateDiff(startTime, endTime));
		}

		if (startTime) {
			clearInter = setInterval(() => {
				setTimer(calculateDiff(startTime, new Date(Date.now())));
			}, 1000)
		}
		return () => {
			clearInterval(clearInter);
		}
	}, [props.startTime, props.endTime]);


	let { startTimer, stopTimer, id, title, startTime, endTime, deleteTask, tags } = props;
	return (
		<div className='dflex task-container alignHorizontal alignVertical'>
			<div className="flexgrow">
				<div className="dlex flexcolumn">
					<div>{title}</div>
					<div className="dflex tags-container">{tags.map(tag => {
						return <Tags name={tag.prompt} />
					})}</div>
				</div>
			</div>
			{diff ? <div>{diff}</div> : null}
			{(startTime && endTime == null || endTime == '') ? <div>{timer}</div> : null}
			<div className='task-actions dflex'>
				<div>
					<Button
						label='Start'
						clickHandler={() => { startTimer(id) }}
						disabled={startTime ? true : false}
					/>
				</div>
				<div>
					<Button
						label='Stop'
						clickHandler={() => { stopTimer(id) }}
						type='danger'
						disabled={(startTime == undefined && endTime == undefined) ? true : (startTime && endTime) ? true : (startTime && endTime == undefined) ? false : endTime ? true : false}
					/>
				</div>
				<div>
					<Button
						label='Edit'
						clickHandler={() => {
							history.push(`/editTask/${id}`);
						}}
						disabled={endTime ? true : false}
					/>
				</div>
				<div>
					<Button
						label='Delete'
						clickHandler={() => {
							deleteTask(id);
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default Task;
