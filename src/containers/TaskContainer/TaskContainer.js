import React from 'react';
import './TaskContainer.css';
import { connect } from 'react-redux';

import Task from '../../components/Task/Task';

import Empty from '../../components/Empty/Empty';

import { getTasks, updateTask, deleteTask } from '../../actions/TaskActions';

class TaskContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteTask = this.handleDeleteTask.bind(this);
		this.handleStartTimer = this.handleStartTimer.bind(this);
		this.handleStopTimer = this.handleStopTimer.bind(this);
	}

	componentDidMount() {
		this.props.getTasks();
	}

	handleDeleteTask(id) {
		this.props.deleteTask({ id: id })
	}

	handleStartTimer(id) {
		this.props.updateTask({
			id,
			startTime: new Date(Date.now()).toISOString()
		})
	}

	handleStopTimer(id) {
		this.props.updateTask({
			id,
			endTime: new Date(Date.now()).toISOString()
		})
	}

	render() {
		let { tasks, updateTask } = this.props;
		return (
			<div className='dflex flexcolumn h100'>
				{ Object.keys(tasks).length ? Object.keys(tasks).map((task) => {
					let { title, tags, endTime, startTime } = tasks[task];
					return <Task
						id={task}
						key={task}
						title={title}
						tags={tags}
						startTime={startTime}
						endTime={endTime}
						startTimer={this.handleStartTimer}
						stopTimer={this.handleStopTimer}
						deleteTask={this.handleDeleteTask} />;
				}) : <Empty errMsg="No Task Found" />}

			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		tasks: state.tasks || {}
	};
}

export default connect(mapStateToProps, { getTasks, updateTask, deleteTask })(TaskContainer);
