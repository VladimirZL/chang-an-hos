import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import './style.css';

import OrderInHos from './OrderInHos/index.jsx';
import OrderExam from './OrderExam/index.jsx';
import OrderRegister from './OrderRegister/index.jsx';
import DoctourMessage from './DoctourMessage/index.jsx';
import UserInfo from './UserInfo/index.jsx';


class User extends Component {
	render () {
		return (
			<div id="user">
				<Route path="/user/orderInHos" component={OrderInHos} />
				<Route path="/user/doctourMessage" component={DoctourMessage} />
				<Route path="/user/orderExam" component={OrderExam} />
				<Route path="/user/orderRegister" component={OrderRegister} />
				<Route path="/user/userInfo" component={UserInfo} />
			</div>
		)
	}
}

export default User;