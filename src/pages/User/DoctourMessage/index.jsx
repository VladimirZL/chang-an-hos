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
    title: '科室',
    dataIndex: 'department',
    key: 'department',
  }, {
    title: '职称',
    dataIndex: 'title',
    key: 'title',
  },
]
const data = [{
    key: '1',
    name: 'John Brown',
    sex: '男',
    department: '儿科',
    title: '教授',
  }, {
    key: '2',
    sex: '男',
    name: 'Jim Green',
    department: '外科',
    title: '教授',
  }, {
    key: '3',
    sex: '男',
    name: 'Joe Black',
    department: '内科',
    title: '副教授',
  },
];
class DoctourMessage extends Component {

	componentWillMount () {

	}

	render () {
		return (
			<div className="user-doctourMessage">
				<div className="user-doctourMessage-box">
					<Table columns={columns} dataSource={data}  />
				</div>
			</div>
		)
	}
}

export default DoctourMessage;