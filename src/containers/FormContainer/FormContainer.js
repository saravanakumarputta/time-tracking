import React from 'react';
import './FormContainer.css';
import { Multiselect } from 'multiselect-react-dropdown';
import TextBox from '../../components/TextBox/TextBox';
import Button from '../../components/Button/Button';

import { connect } from 'react-redux';

import { addTask, updateTask } from '../../actions/TaskActions';

class FormContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditForm: props.match.path !== '/addTask',
			taskTitle: '',
			tags: [
				{ prompt: 'Open', id: 'open' },
				{ prompt: 'Closed', id: 'closed' },
				{ prompt: 'on Hold', id: 'on-hold' },
				{ prompt: 'Escalated', id: 'escalated' },
				{ prompt: 'Overdue', id: 'overdue' },
				{ prompt: 'Testing', id: 'tesing' }
			],
			selectedTags: [],
			titleErrMsg: ''
		};
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleUpdateTask = this.handleUpdateTask.bind(this);
		this.handleTagRemove = this.handleTagRemove.bind(this);
		this.handleTagSelect = this.handleTagSelect.bind(this);
	}

	componentDidMount() {
		if (this.state.isEditForm) {
			let { taskInfo } = this.props;

			if (Object.keys(taskInfo).length) {
				this.setState({ taskTitle: taskInfo.title, selectedTags: taskInfo.tags });
			} else {
				this.props.history.push('/');
			}
		}
	}

	handleFieldChange(apiName, value) {
		if (apiName == 'taskTitle') {
			if (value) {
				this.setState({ [apiName]: value });
				this.setState({ titleErrMsg: '' });
			} else {
				this.setState({ [apiName]: value });
				this.setState({ titleErrMsg: "Title Canno't be empty" });
			}
		}
	}

	handleAddTask() {
		let { taskTitle, selectedTags } = this.state;

		let taskInfo = {
			id: new Date().getTime().toString(),
			title: taskTitle,
			tags: selectedTags
		};

		this.props.addTask(taskInfo);
		this.props.history.push('/');
	}

	handleUpdateTask() {
		let { taskTitle, selectedTags } = this.state;
		let taskId = this.props.match.params.id;

		let taskInfo = {
			id: taskId,
			title: taskTitle,
			tags: selectedTags
		};

		this.props.updateTask(taskInfo);
		this.props.history.push('/');
	}

	handleTagSelect(selectedList, selectedItem) {
		this.setState({ selectedTags: selectedList });
	}

	handleTagRemove(selectedList, removedItem) {
		this.setState({ selectedTags: selectedList });
	}

	render() {
		let { isEditForm, taskTitle, tags, selectedTags, titleErrMsg } = this.state;
		return (
			<div className='form-container h100 dflex flexcolumn'>
				<div>
					<TextBox
						label='Task title'
						value={taskTitle}
						changeHandler={(value) => {
							this.handleFieldChange('taskTitle', value);
						}}
						errMsg={titleErrMsg}
					/>
				</div>
				<div>
					<Multiselect
						options={tags}
						selectedValues={selectedTags}
						displayValue='prompt'
						onSelect={this.handleTagSelect}
						onRemove={this.handleTagRemove}
					/>
				</div>

				<div className='form-action'>
					{isEditForm ? (
						<Button
							label='Update'
							clickHandler={this.handleUpdateTask}
							disabled={titleErrMsg ? true : false}
						/>
					) : (
						<Button label='Add' clickHandler={this.handleAddTask} disabled={titleErrMsg ? true : false} />
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		taskInfo: state.tasks[props.match.params.id] || {},
		tags: state.tags
	};
}

export default connect(mapStateToProps, { addTask, updateTask })(FormContainer);
