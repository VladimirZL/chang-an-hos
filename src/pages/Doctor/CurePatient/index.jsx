import React, {Component} from 'react';
import './style.css';

// import OrderInHos from './OrderInHos/index.jsx';
// import OrderExam from './OrderExam/index.jsx';
// import OrderRegister from './OrderRegister/index.jsx';


class CurePatient extends Component {

	constructor(props) {
		super(props);
		this.state = {
			infoList: [{
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
				infoText: '过敏史',
				infoKey:'history',
				value: '无',
			}, {
				infoText: '保险类型',
				infoKey:'insurance',
				value: '社会保险',
			}]
		}
	}

	componentWillMount () {

	}

	render () {
		const { infoList } = this.state;
		return (
			<div className="doctor-curePatient">
				<div className="doctor-curePatient-box">
					<h2 className="doctor-curePatient-h2">患者信息</h2>
					<div className="doctor-curePatient-info">
						{
							infoList.map((_value, _key) => {
								const { infoText, value } = _value;
								return (
									<div key={_key} className="doctor-curePatient-info-item">
										<span className="doctor-curePatient-info-item-key">{ infoText } :</span><span>{ value }</span>
									</div>
								)
							})
						}
						<div className="doctor-curePatient-result">
							
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CurePatient;