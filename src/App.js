import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

import { createStore, combineReducers } from 'redux';

import { Provider } from 'react-redux';

import Header from './components/Header/Header';

import TaskReducer from './Reducers/TaskReducer';

import FormContainer from './containers/FormContainer/FormContainer';
import TaskContainer from './containers/TaskContainer/TaskContainer';

let store = createStore(combineReducers({ tasks: TaskReducer }));

function App() {
	let history = useHistory();

	return (
		<Provider store={store}>
			<div className='dflex flexcolumn App h100'>
				<Router history={history}>
					<Header />
					<Switch>
						<div style={{ marginTop: '1rem' }} className='flexgrow'>
							<Route exact path='/addTask' component={FormContainer} />
							<Route exact path='/editTask/:id' component={FormContainer} />
							<Route exact path='/'>
								<div className='section-container h100'>
									<TaskContainer />
								</div>
							</Route>
						</div>
					</Switch>
				</Router>
			</div>
		</Provider>
	);
}

export default App;
