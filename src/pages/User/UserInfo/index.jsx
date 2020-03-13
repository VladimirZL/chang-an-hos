import React, {Component} from 'react';
import './style.css';

import { myFetchPost } from '../../../pub_funcs/myFetch.jsx'

const getUserInofURL = 'http://localhost:8080/springMvcDemo1/user/getInfo';
const orderRegisterDataURL = 'http://localhost:8080/springMvcDemo1/booking/query/doctorInfo';
const orderInHosDataURL = 'http://localhost:8080/springMvcDemo1/booking/query/sickbedInfo';
const orderExamDataURL = 'http://localhost:8080/springMvcDemo1/booking/query/healthCheckInfo';

const departmentChange = {
  '1': '儿科',
  '2': '外科',
  '3': '内科'
}

const examTypeChange = {
  '1': '入职体检',
  '2': '全身体检',
  '3': '孕前体检'
}

class UserInfo extends Component {

	constructor (props) {
		super(props);
		this.state = {
			myInfoList: [],
			indexInfoList: [{
				infoText: '姓名',
				infoKey:'name',
				value: '赵尔语',
			}, {
				infoText: '性别',
				infoKey:'sex',
				value: '难',
			}, {
				infoText: '年龄',
				infoKey:'age',
				value: '18',
			}, {
				infoText: '保险类型',
				infoKey:'healthCareType',
				value: '儿科',
			}, {
				infoText: '过敏史',
				infoKey:'allergy',
				value: '无',
			}],
			orderRegisterData: {
				isSuccess: false
			},
			orderInHosData: {
				isSuccess: false
			},
			orderExamData: {
				isSuccess: false
			}
		}
	}

	// data = {
	// 	succees:,

	// }

	componentWillMount () {
		let _session = localStorage.getItem('sessionID');
		// myFetchPost(orderRegisterDataURL)
		// this.getUserInofURL(getUserInofURL, _session);
		this.getOrderRegisterData(orderRegisterDataURL, _session);
		this.getorderInHosDataData(orderInHosDataURL, _session);
		this.getOrderExamData(orderExamDataURL, _session);
	} 

	getUserInofURL (url, session) {
		const {indexInfoList} = this.state;
		let _dataArr = [];
		myFetchPost(url, {sessionID: session}, (data) => {
			const { success, eccCode, info} = data;
			if (success === 1) {
				const { name, sex, age, healthCareType, allergy } = info;
				let _arr = ['name', 'sex', 'age', 'healthCareType', 'allergy'];
				_arr.forEach((value, key) => {
					let _data = {};
					_data.infoText = value;
					_data.infoKey = value;
					_data.infoValue = info[value];
					_dataArr.push(_data);
				});
				this.setState({
					myInfoList: _dataArr
				});
			} else {
				this.setState({
					myInfoList: indexInfoList
				});
			}
		})
	}

	getOrderRegisterData (url, session) {
		let _data = {};
		myFetchPost(url, {sessionID: session}, (data) => {
			_data = data
			const { success, errCode, registerID, doctorName, year, month, day, department } = data;
			if (success === 1) {
				_data.registerId = registerID;
				_data.department = departmentChange[String(department)];
				_data.doctorName = doctorName;
				_data.date = `${year}-${month}-${day}`;
				_data.isSuccess = true;
			} else {
				_data.isSuccess = false;
			}
			this.setState({
				orderRegisterData: _data
			});
		})
	}

	getorderInHosDataData (url, session) {
		let _data = {};
		myFetchPost(url, {sessionID: session}, (data) => {
			_data = data
			const { success, errCode, year, month, day, department } = data;
			if (success === 1) {
				_data.department = departmentChange[String(department)];
				_data.date = `${year}-${month}-${day}`;
				_data.isSuccess = true;
			} else {
				_data.isSuccess = false;
			}
			this.setState({
				orderInHosData: _data
			});
		})
	}

	getOrderExamData (url, session) {
		let _data = {};
		myFetchPost(url, {sessionID: session}, (data) => {
			_data = data
			const { success, errCode, year, month, day, examType } = data;
			if (success === 1) {
				_data.examType = examTypeChange[String(examType)];
				_data.date = `${year}-${month}-${day}`;
				_data.isSuccess = true;
			} else {
				_data.isSuccess = false;
			}
			this.setState({
				orderExamData: _data
			});
		})
	}

	render () {
		const { myInfoList, orderRegisterData, orderExamData, orderInHosData } = this.state;
		return (
			<div className="user-userInfo">
				<div className="user-userInfo-box">
					<h2 className="user-userInfo-h2">个人信息</h2>
					<div className="user-userInfo-info">
						{
							myInfoList.map((_value, _key) => {
								const { infoText, value } = _value;
								return (
									<div key={_key} className="user-userInfo-info-item">
										<span className="user-userInfo-info-item-key">{ infoText } :</span><span>{ value }</span>
									</div>
								)
							})
						}
					</div>
					<div className="user-userInfo-order">
						<h2 className="user-userInfo-h2">预约信息</h2>
						<div className="user-userInfo-order-box">
							<div className="user-userInfo-order-item">
								<div className="user-userInfo-order-item-title"><span>挂号预约</span></div>
								{
									!orderRegisterData.isSuccess ? <div className="user-userInfo-order-item-content">无</div> :
									<div>
										<div className="user-userInfo-order-item-content">
											<span>挂号编号:</span><span>orderRegisterData.registerId</span>
										</div>
										<div className="user-userInfo-order-item-content">
											<span>科室:</span><span>orderRegisterData.department</span>
										</div>
										<div className="user-userInfo-order-item-content">
											<span>医生姓名:</span><span>orderRegisterData.doctorName</span>
										</div>
										<div className="user-userInfo-order-item-content">
											<span>挂号时间:</span><span>orderRegisterData.date</span>
										</div>
									</div>
								}
							</div>
							<div className="user-userInfo-order-item">
								<div className="user-userInfo-order-item-title"><span>住院预约</span></div>
								{
									!orderInHosData.isSuccess ? <div className="user-userInfo-order-item-content">无</div> :
									<div>
										<div className="user-userInfo-order-item-content">
											<span>科室:</span><span>orderInHosData.department</span>
										</div>
										<div className="user-userInfo-order-item-content">
											<span>住院时间:</span><span>orderInHosData.date</span>
										</div>
									</div>
								}
								</div>
							<div className="user-userInfo-order-item">
								<div className="user-userInfo-order-item-title"><span>体检预约</span></div>
								{
									!orderExamData.isSuccess ? <div className="user-userInfo-order-item-content">无</div> :
									<div>
										<div className="user-userInfo-order-item-content">
											<span>体检类型:</span><span>orderExamData.examType</span>
										</div>
										<div className="user-userInfo-order-item-content">
											<span>体检时间:</span><span>orderExamData.date</span>
										</div>
									</div>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default UserInfo;