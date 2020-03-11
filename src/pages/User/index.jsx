import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import './style.css';

import OrderInHos from './OrderInHos/index.jsx';
import OrderExam from './OrderExam/index.jsx';
import OrderRegister from './OrderRegister/index.jsx';


class User extends Component {
	render () {
		return (
			<div id="user">
				<Route path="/user/orderInHos" component={OrderInHos} />
				<Route path="/user/orderExam" component={OrderExam} />
				<Route path="/user/orderRegister" component={OrderRegister} />
			</div>
		)
	}
}

export default User;