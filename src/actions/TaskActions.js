function localStorageUtil(obj) {
	let oldPayload = localStorage.getItem(obj.key) || [];
	oldPayload = typeof oldPayload == 'string' ? JSON.parse(oldPayload) : oldPayload;


	switch (obj.type) {
		case 'add':
			oldPayload.push(obj.payload)
			localStorage.setItem(obj.key, JSON.stringify(oldPayload));
			return obj.payload;
		case 'get':
			let data = localStorage.getItem(obj.key);
			if (data) {
				data = JSON.parse(data)
			} else {
				data = []
			}
			return data;
		case 'delete':
			let newPayload = oldPayload.filter(old => {
				return old.id !== obj.payload.id;
			})
			localStorage.setItem(obj.key, JSON.stringify(newPayload));
			return newPayload;
			break;
		case 'update':
			let updatedData = oldPayload.map(old => {
				if (old.id == obj.payload.id) {
					old = Object.assign({}, old, obj.payload);
				}
				return old;
			})
			localStorage.setItem(obj.key, JSON.stringify(updatedData));
			return obj.payload
	}
}


export function getTasks() {
	return {
		type: 'GET_TASKS_SUCCESS',
		data: localStorageUtil({
			type: 'get',
			key: 'task'
		})
	};
}

export function addTask(taskObj) {
	return {
		type: 'ADD_TASK_SUCCESS',
		data: localStorageUtil({
			type: 'add',
			key: 'task',
			payload: taskObj
		})
	}

}

export function updateTask(taskObj) {
	return {
		type: 'UPDATE_TASK_SUCCESS',
		data: localStorageUtil({
			type: 'update',
			key: 'task',
			payload: taskObj
		})
	}
}

export function deleteTask(taskId) {
	return {
		type: 'DELETE_TASK_SUCCESS',
		data: localStorageUtil({
			type: 'delete',
			key: 'task',
			payload: taskId
		})
	}
}
