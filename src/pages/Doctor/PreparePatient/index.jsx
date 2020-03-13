import React, {Component} from 'react';
import './style.css';

import { Table } from 'antd';

import { myFetchPost } from '../../../pub_funcs/myFetch.jsx'

const patoentMessageURL = 'http://localhost:8080/springMvcDemo1/work/doctor/getPatientLst';

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '过敏史',
    dataIndex: 'history',
    key: 'history',
  },
]

const sexChange = {
  '1': '男',
  '2': '女'
}

class PreparePatient extends Component {
  constructor (props) {
    super(props);
    this.state = {
      patientList: []
    }
  }

	componentWillMount () {
    let _session = localStorage.getItem('sessionID');
    myFetchPost(patoentMessageURL, {sIDString: _session}, (data) => {
      const { success, patientInfoLst } = data;
      if (success === 1) {
        let _patientList = [];
        patientInfoLst.forEach((value, key) => {
          const { name, sex, allergy, age } = value;
          let _info = {
            key: key,
            name: name,
            sex: sexChange[String(sex)],
            age: age,
            allergy: allergy
          }
          _patientList.push(_info);
        });
        this.setState({
          patientList: _patientList
        });
      }
    }) 
	}

	render () {
    const { patientList } = this.state;
		return (
			<div className="doctor-preparePatient">
				<div className="doctor-preparePatient-box">
					<Table columns={columns} dataSource={patientList}  />
				</div>
			</div>
		)
	}
}

export default PreparePatient;