import React, { Component } from 'react';
import classnames from 'classnames';
import { Select } from 'antd';
import './style.css';

import { myFetchPost } from '../../../../pub_funcs/myFetch.jsx'
import Input from '../../../../components/Input/index.jsx';


const { Option } = Select;
const userRegisterURL = 'http://localhost:8080/springMvcDemo1/user/regist/patient';
const doctorRegisterURL = 'http://localhost:8080/springMvcDemo1/user/regist/doctor';
class RegisterForm extends Component {

	constructor (props) {
		super(props);
		this.state = {
			formPrototype: {
				doctorForm: [{
					dataName: 'name',
					type: 'text',
					placeholder: '姓名',
					maxLength: '8',
					regex:  /[\s\S]*/,
					inputValue: '',
					isTest: true,
				}, {
					dataName: 'phone',
					type: 'text',
					placeholder: '手机号',
					maxLength: '11',
					// regex: /^1[3456789]\d{9}$/,
					regex: /([\s\S]*)/,
					inputValue: '',
					isTest: true,
				}, {
					dataName: 'password',
					type: 'password',
					placeholder: '密码',
					maxLength: '32',
					regex:  /[\s\S]*/,
					inputValue: '',
					isTest: true,
				}, {
					dataName: 'idNumber',
					type: 'text',
					placeholder: '执照信息',
					maxLength: '8',
					regex: /^[A-Z0-9]*$/,
					inputValue: '',
					isTest: true,
				}], 
				userForm: [{
					type: 'text',
					placeholder: '姓名',
					maxLength: '8',
					dataName: 'name',
					regex: /([\s\S]*)/,
					inputValue: '',
					isTest: true,
				}, {
					dataName: 'age',
					type: 'text',
					placeholder: '年龄',
					maxLength: '3',
					regex: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
					inputValue: '',
					isTest: true,
				}, {
					dataName: 'phone',
					type: 'text',
					placeholder: '手机号',
					maxLength: '11',
					// regex: /^1[3456789]\d{9}$/,
					regex: /([\s\S]*)/,
					inputValue: '',
					isTest: true,
				}, {
					dataName: 'password',
					type: 'password',
					placeholder: '密码',
					maxLength: '32',
					regex: /([^\s])/,
					inputValue: '',
					isTest: true,
				}, {
					dataName: 'idNumber',
					type: 'text',
					placeholder: '身份证号',
					maxLength: '18',
					regex: /\d|\d/,
					inputValue: '',
					isTest: true,
				}, {
					dataName: 'history',
					type: 'text',
					placeholder: '过敏史',
					maxLength: '32',
					regex: /([^\s])/,
					inputValue: '',
					isTest: true,
				}]},
			selectPrototype: {
				doctorSelect: [{
					dataName: 'sex',
					selectValue: '',
					defalut: 'sex',
					options: [{
						value: 'sex',
						name: '请选择性别',
					}, {
						value: 'man',
						name: '男',
					}, {
						value: 'woman',
						name: '女',
					}]
				}, {
					dataName: 'department',
					selectValue: '',
					defalut: 'department',
					options: [{
						value: 'department',
						name: '请选择科室'
					}, {
						value: 1,
						name: '儿科'
					}, {
						value: 2,
						name: '外科'
					}, {
						value: 3,
						name: '内科'
					}]
				}, {
					dataName: 'title',
					selectValue: '',
					defalut: 'title',
					options: [{
						value: 'title',
						name: '请选择职称'
					}, {
						value: 'professor',
						name: '教授'
					}, {
						value: 'lowProfessor',
						name: '副教授'
					}]
				}],
				userSelect: [{
					dataName: 'insurance',
					selectValue: '',
					defalut: 'insurance',
					options: [{
						value: 'insurance',
						name: '请选择医保类型'
					}, {
						value: 'socialInsurance',
						name: '社会保险'
					}, {
						value: 'schoolInsurance',
						name: '学校保险'
					}]
				}, {
					dataName: 'sex',
					selectValue: '',
					defalut: 'sex',
					options: [{
						value: 'sex',
						name: '请选择性别',
					}, {
						value: 'man',
						name: '男',
					}, {
						value: 'woman',
						name: '女',
					}]
				}],
			},
			isRegister: false,
			errorMessage: '',
			data: {},
			isCircle: false, 
		}
	}

	handleChange(_value, key) {
		const { formType } = this.props;
		const _formPrototype = this.state.formPrototype;
		if (formType === 'user') {
			_formPrototype.userForm[key].inputValue = _value;
		} else {
			_formPrototype.doctorForm[key].inputValue = _value;
		}
		this.setState({
			formPrototype: _formPrototype,
		})
	}

	handleTest (flag, key) {
		const { formType } = this.props;
		const _formPrototype = this.state.formPrototype;
		if (formType === 'user') {
			_formPrototype.userForm[key].isTest = flag;
		} else {
			_formPrototype.doctorForm[key].isTest = flag;
		}
		this.setState({
			formPrototype: _formPrototype,
		})
	}

	handleClick () {
		const { formType } = this.props;
		const _url = formType === 'user' ? userRegisterURL : doctorRegisterURL;
		let isRegister = false;
		// const { isRegister } = this.state;
		const _form = this.state.formPrototype[`${formType}Form`];
		const _select = this.state.selectPrototype[`${formType}Select`];
		let _data = {};

		// 判断是否可以注册
		isRegister = _form.every((value) => {
			const { isTest } = value;
			return isTest;
		})
		if (!isRegister) {
			this.setState({
				errorMessage: '输入有误，请检查后再提交'
			})
			return; 
		}
		// 如可以注册写入数据
		_data.loginType = formType;
		_form.forEach((value, key) => {
			const { dataName, inputValue } = value;
			_data[dataName] = inputValue;
		})
		_select.forEach((value, key) => {
			const { dataName, selectValue } = value;
			_data[dataName] = selectValue;
		})
		this.setState({
			isRegister: isRegister,
			data: _data,
			isCircle: true,
		})
		// console.log(_data);
		myFetchPost(_url, _data, (data) => {
			console.log(data);
			const { success, errCode, sessionID } = data;
			if (success === 1) {
				localStorage.setItem('isLogin', true);
				localStorage.setItem('loginType', formType);
				localStorage.setItem('sessionID', sessionID);
				// window.location.href = `${window.location.origin}/${loginType}`;
			} else {
				console.log('注册失败');
				console.log(errCode)
				this.setState({
					isCircle: false,
					errorMessage: errCode
				})
			}
		}, 'POST');
	}

	handleSelect (event, selectKey) {
		const { formType } = this.props;
		const _select = this.state.selectPrototype;
		_select[`${formType}Select`][selectKey].selectValue = event;
		this.setState({
			selectPrototype: _select
		});
	}

	render () {
		const { errorMessage, isCircle, formPrototype, selectPrototype } = this.state;
		const { formType } = this.props;
		const { doctorForm, userForm } = formPrototype;
		const _form = formType === 'user' ? userForm : doctorForm;
		const { doctorSelect, userSelect } = selectPrototype;
		const _select = formType === 'user' ? userSelect : doctorSelect;
		return (
			<div className="form-content">
				{
					_form.map((value, key) => {
						const { placeholder, type, maxLength, regex, inputValue, isTest } = value
						return (
							<div key={key} className="form-content-input-box">
								<Input
									onChange={(_value) => {this.handleChange(_value, key)}}
									onTest={(flag) => {this.handleTest(flag, key)}}
									inputValue={inputValue}
									isTest={isTest}
									regex={regex}
									maxLength={maxLength} 
									placeholder={placeholder}
									type={type} />
							</div>
						)
					})
				}
				{
					_select.map((selectValue, selectKey) => {
						const { defalut, options, dataName } = selectValue;
						return (
							<div key={dataName} className="form-content-select-box">
								<Select
									onChange={(event) => this.handleSelect(event, selectKey)}
									style={{ width: 200 }}
									defaultValue={defalut}>
									{
										options.map((optionValue, optionKey) => {
											const { name, value } = optionValue;
											return <Option key={optionKey} value={value}>{name}</Option>
										})
									}
								</Select>
							</div>
						)
					})
				}
				<div className="form-content-message">
					<span> {errorMessage} </span>
				</div>
				<div className="form-content-button-box">
					<div className={classnames({'form-content-circle': isCircle})}></div>
					<button 
						className={classnames({'form-content-button-box-request': isCircle})}
						onClick={() => {this.handleClick()}}>注册</button>
				</div>
			</div>
		)
	}
}


export default RegisterForm;