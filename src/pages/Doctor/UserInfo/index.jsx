import React, {Component} from 'react';
import './style.css';

import { myFetchPost } from '../../../pub_funcs/myFetch.jsx'

const getUserInofURL = 'http://localhost:8080/springMvcDemo1/user/getInfo';

const departmentChange = {
  '1': '儿科',
  '2': '外科',
  '3': '内科'
}

class DoctorInfo extends Component {

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
				infoText: '科室',
				infoKey:'departmentID',
				infoValue: '',
			}, {
				infoText: '职称',
				infoKey:'title',
				infoValue: '',
			}]
		}
	}

	componentWillMount () {
		let _infoList = this.state.myInfoList;
		let _session = localStorage.getItem('sessionID');
		myFetchPost(getUserInofURL, {sessionID: _session}, (data) => {
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

	render () {
		const { myInfoList } = this.state;
		return (
			<div className="doctor-doctorInfo">
				<div className="doctor-doctorInfo-box">
					<h2 className="doctor-doctorInfo-h2">个人信息</h2>
					<div className="doctor-doctorInfo-info">
						{
							myInfoList.map((_value, _key) => {
								const { infoText, infoValue } = _value;
								return (
									<div key={_key} className="doctor-doctorInfo-info-item">
										<span className="doctor-doctorInfo-info-item-key">{ infoText } :</span><span>{ infoValue }</span>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

export default DoctorInfo;