export default function TaskReducer(state = {}, action) {
	switch (action.type) {
		case 'ADD_TASK_SUCCESS':
			return { ...state, [action.data.id]: action.data };
		case 'GET_TASKS_SUCCESS':
			let task = normalizeTask(action.data);
			return { ...state, ...task };
		case 'UPDATE_TASK_SUCCESS':
			let taskInfo = state[action.data.id];
			return Object.assign({}, state, { [action.data.id]: Object.assign({}, taskInfo, action.data) })
		case 'DELETE_TASK_SUCCESS':
			let updatedTask = normalizeTask(action.data)
			return updatedTask;
		default:
			return state;
	}
}

function normalizeTask(task) {
	return task.reduce((obj, item) => {
		obj[item.id] = item;
		return obj;
	}, {});
}
