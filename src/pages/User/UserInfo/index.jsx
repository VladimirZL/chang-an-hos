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
			// myInfoList: [],
			myInfoList: [{
				infoText: '姓名',
				infoKey:'name',
				infoValue: '',
			}, {
				infoText: '性别',
				infoKey:'sex',
				infoValue: '',
			}, {
				infoText: '年龄',
				infoKey:'age',
				infoValue: '',
			}, {
				infoText: '保险类型',
				infoKey:'healthCareType',
				infoValue: '',
			}, {
				infoText: '过敏史',
				infoKey:'allergy',
				infoValue: '',
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


	componentWillMount () {
		let _session = localStorage.getItem('sessionID');
		// myFetchPost(orderRegisterDataURL)
		this.getUserInofURL(getUserInofURL, _session);
		this.getOrderRegisterData(orderRegisterDataURL, _session);
		this.getorderInHosDataData(orderInHosDataURL, _session);
		this.getOrderExamData(orderExamDataURL, _session);
	} 

	getUserInofURL (url, session) {
		let _infoList = this.state.myInfoList;
		myFetchPost(url, {sessionID: session}, (data) => {
			const { success, eccCode, info} = data;
			if (success === 1) {
				_infoList.forEach((value, key) => {
					value.infoValue = info[value.infoKey];
				})
				this.setState({
					myInfoList: _infoList
				});
			} else {
				alert('请求个人信息出错');
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
				console.log('成功');
				_data.examType = examTypeChange[String(examType)];
				_data.date = `${year}-${month}-${day}`;
				_data.isSuccess = true;
			} else {
				_data.isSuccess = false;
			}
			this.setState({
				orderExamData: _data
			});
			console.log(this.state.orderExamData);
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
								const { infoText, infoValue } = _value;
								return (
									<div key={_key} className="user-userInfo-info-item">
										<span className="user-userInfo-info-item-key">{ infoText } :</span><span>{ infoValue }</span>
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