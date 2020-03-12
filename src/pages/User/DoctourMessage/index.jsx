import React, {Component} from 'react';
import './style.css';
import { Table } from 'antd';

import { myFetchPost } from '../../../pub_funcs/myFetch.jsx'

const doctourMessageURL = 'http://localhost:8080/springMvcDemo1/work/patient/getDoctorLst';

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  }, {
    title: '科室',
    dataIndex: 'department',
    key: 'department',
  }, {
    title: '职称',
    dataIndex: 'title',
    key: 'title',
  },
]
// const data = [{
//     key: '1',
//     name: 'John Brown',
//     sex: '男',
//     department: '儿科',
//     title: '教授',
//   }, {
//     key: '2',
//     sex: '男',
//     name: 'Jim Green',
//     department: '外科',
//     title: '教授',
//   }, {
//     key: '3',
//     sex: '男',
//     name: 'Joe Black',
//     department: '内科',
//     title: '副教授',
//   },
// ];

const departmentChange = {
  '1': '儿科',
  '2': '外科',
  '3': '内科'
}
class DoctourMessage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      doctorList: []
    }
  }
	componentWillMount () {
    myFetchPost(doctourMessageURL, {departmentIDstr: 1000}, (data) => {
      const { success, docInfoLst } = data;
      if (success === 1) {
        let _doctorList = [];
        docInfoLst.forEach((value, key) => {
          const { name, sex, department, title } = value;
          let _info = {
            key: key,
            name: name,
            sex: sex,
            department: departmentChange[String(department)],
            title: title
          }
          _doctorList.push(_info);
        });
        this.setState({
          doctorList: _doctorList
        });
      }
    })
	}

	render () {
    const { doctorList } = this.state;
		return (
			<div className="user-doctourMessage">
				<div className="user-doctourMessage-box">
					<Table columns={columns} dataSource={doctorList}  />
				</div>
			</div>
		)
	}
}

export default DoctourMessage;