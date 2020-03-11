import React, {Component} from 'react';
import './style.css';


class DoctorInfo extends Component {

	constructor (props) {
		super(props);
		this.state = {
			myInfoList: [{
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
				infoText: '科室',
				infoKey:'department',
				value: '儿科',
			}, {
				infoText: '职称',
				infoKey:'title',
				value: '教授',
			}]
		}
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
								const { infoText, value } = _value;
								return (
									<div key={_key} className="doctor-doctorInfo-info-item">
										<span className="doctor-doctorInfo-info-item-key">{ infoText } :</span><span>{ value }</span>
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