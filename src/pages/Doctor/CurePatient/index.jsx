import React, {Component} from 'react';
import { Input } from 'antd';
import './style.css';

import Button from '../../../components/Button/index.jsx';
import { myFetchPost } from '../../../pub_funcs/myFetch.jsx'

const { TextArea } = Input;
const patoentMessageURL = 'http://localhost:8080/springMvcDemo1/work/doctor/getPatientLst';

class CurePatient extends Component {

	constructor(props) {
		super(props);
		this.state = {
			infoList: [{
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
				infoText: '过敏史',
				infoKey:'allergy',
				infoValue: '',
			}, {
				infoText: '保险类型',
				infoKey:'healthCareType',
				infoValue: '',
			}],
			isLoading: false
		}
	}

	componentWillMount () {
		let _infoList = this.state.infoList;
		let _session = localStorage.getItem('sessionID');
    myFetchPost(patoentMessageURL, {sIDString: _session}, (data) => {
      const { success, patientInfoLst } = data;
      if (success === 1) {
      	console.log('成功');
      	console.log(patientInfoLst);
      	if (patientInfoLst.length === 0) {
      		alert('无待诊患者');
      		return;
      	}
        _infoList.forEach((value, key) => {
        	value.infoValue = patientInfoLst[0][value.infoKey]
        })
        this.setState({
          infoList: _infoList
        });
      }
    }) 
	}

	handleSubmit () {
		console.log(this.state.data);
		this.setState({
			isLoading: true
		})
	}

	render () {
		const { infoList, isLoading } = this.state;
		return (
			<div className="doctor-curePatient">
				<div className="doctor-curePatient-box">
					<h2 className="doctor-curePatient-h2">患者信息</h2>
					<div className="doctor-curePatient-info">
						{
							infoList.map((_value, _key) => {
								const { infoText, infoValue } = _value;
								return (
									<div key={_key} className="doctor-curePatient-info-item">
										<span className="doctor-curePatient-info-item-key">{ infoText } :</span><span>{ infoValue }</span>
									</div>
								)
							})
						}
						<div className="doctor-curePatient-result">
							<TextArea 
								autoSize={{ minRows: 3, maxRows: 3 }}
								placeholder="诊断结果" />
						</div>
						<div className="doctor-curePatient-result">
							<TextArea 
								autoSize={{ minRows: 3, maxRows: 3 }}
								placeholder="处方意见" />
						</div>
						<Button 
							onClick={() => {this.handleSubmit()}}
							isLoading={isLoading} 
							content="提交" />
					</div>
				</div>
			</div>
		)
	}
}

export default CurePatient;