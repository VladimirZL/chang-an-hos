import React, { Component } from 'react';
import './style.css';
import classnames from 'classnames';
import Input from '../../components/Input/index.jsx';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loginForm: [{
				type: 'text',
				placeholder: '手机号',
				maxLength: '11',
				inputValue: '',
				regex: /^1[3456789]\d{9}$/,
				isTest: true,
			}, {
				type: 'password',
				placeholder: '密码',
				maxLength: '32',
				regex:  /[\s\S]*/,
				inputValue: '',
				isTest: true,
			}],
			loginType: '',
			isCircle: false,
			errorMessage: ''
		}
	}

	handleChange(_value, key) {
		const _loginForm = this.state.loginForm;
		_loginForm[key].inputValue = _value;
		this.setState({
			loginForm: _loginForm,
		})
	}

	handleTest (flag, key) {
		// console.log('sss')
	}

	handleClick () {
		const { loginForm, loginType } = this.state;
		const [phoneInput, passInput] = loginForm;
		if (phoneInput.inputValue !== '' && passInput.inputValue !== '' && loginType !== '') {
			console.log(phoneInput.inputValue, passInput.inputValue, loginType);
			localStorage.setItem('isLogin', true);
			localStorage.setItem('loginType', loginType);
			this.setState({
				isCircle: true,
				errorMessage: '',
			});
			window.location.href = `${window.location.origin}/${loginType}`;
		} else if (phoneInput.inputValue === '') {
			this.setState({
				errorMessage: '手机号不能为空'
			});		
		} else if (passInput.inputValue === '') {
			this.setState({
				errorMessage: '密码不能为空'
			});	
		} else {
			this.setState({
				errorMessage: '请选择登陆类型'
			});	
		}
	}

	handleChoose (type) {
		this.setState({
			loginType: type
		});
	}

	render () {
		const { loginForm, isCircle, errorMessage, loginType } = this.state;
		return (
			<div id="login">
				<div className="login-window">
					<div className="login-box">
						<div className="login-form">
							{
								loginForm.map((value, key) => {
									const { placeholder, type, maxLength, regex, inputValue } = value;
									return (
										<div key={key} className="login-form-input-box">
											<Input
												onChange={(_value) => {this.handleChange(_value, key)}}
												onTest={(flag) => {this.handleTest(flag, key)}}
												inputValue={inputValue}
												regex={regex}
												maxLength={maxLength} 
												placeholder={placeholder}
												type={type} />
										</div>
									)
								})
							}
							<div className='login-form-select'>
								<div 
									className={classnames({'login-form-select-this': loginType === 'user'})}
									onClick={() => {this.handleChoose('user')}}
									><span>用户</span></div>
								<div 
									className={classnames({'login-form-select-this': loginType === 'doctor'})}
									onClick={() => {this.handleChoose('doctor')}}
									><span>医生</span></div>
							</div>
							<div className="login-form-message">
								<span>{errorMessage}</span>
							</div>
							<div className="login-form-button">
								<div className={classnames({'form-content-circle': isCircle})}></div>
								<button 
									className={classnames({'form-content-button-box-request': isCircle})}
									onClick={() => {this.handleClick()}}>登陆</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;