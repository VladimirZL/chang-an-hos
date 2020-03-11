import React, {Component} from 'react';
import './style.css';

import { Table } from 'antd';

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
const data = [{
    key: '1',
    name: 'John Brown',
    sex: '男',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    sex: '男',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    sex: '男',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
class PreparePatient extends Component {

	componentWillMount () {

	}

	render () {
		return (
			<div className="doctor-preparePatient">
				<div className="doctor-preparePatient-box">
					<Table columns={columns} dataSource={data}  />
				</div>
			</div>
		)
	}
}

export default PreparePatient;