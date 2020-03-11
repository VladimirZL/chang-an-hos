import React from 'react';
import './style.css';
import classnames from 'classnames';

import RegisterForm from './components/RegisterForm/index.jsx';

class Register extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			formType: 'user',
		}
	}

	handleClick (type) {
		this.setState({
			formType: type,
		})
	}

	render () {
		const { formType } = this.state;
		return (
			<div id="register">
				<div className="register-window">
					<div className="register-choose">
						<div className={classnames(['register-choose-user', {'register-choose-user-this': formType==='user'}])}>
							<button onClick={() => this.handleClick('user')}>用户注册</button>
						</div>
						<div className={classnames(['register-choose-user', {'register-choose-user-this': formType==='doctor'}])}>
							<button onClick={() => this.handleClick('doctor')}>医生注册</button>
						</div>
					</div>
					<div className="register-box">
						<RegisterForm formType={formType} />
					</div>
				</div>
			</div>
		)
	}
}

export default Register;


