import React, {Component} from 'react';
import classnames from 'classnames';
import { Select, DatePicker  } from 'antd';
import moment from 'moment';

import { myFetchGet } from '../../../pub_funcs/myFetch.jsx'
import Button from '../../../components/Button/index.jsx';
import './style.css';

const orderInHosURL = 'http://localhost:8080/springMvcDemo1/booking/regist/sickbed'

class OrderInHos extends Component {

	constructor (props) {
		super(props);
		this.state = {
			thisDepartmentItme: 0,
			departmentList: [{
				name: '儿科',
			}, {
				name: '外科'
			}, {
				name: '内科'
			}],
			doctorList: [{
				name: '张三',
				value: '0000000A'
			}, {
				name: '李四',
				value: '0000000B'
			}, {
				name: '王先生',
				value: '0000000C'
			}],
			isLoading: false,
			data: {},
		}
	}

	handleClick (key) {
		this.setState({
			thisDepartmentItme: key,
		});
	}

	handleSelectChange (event) {
		let _data = this.state.data;
		_data.docUIDstr = event;
		this.setState({
			data: _data,
		})
	}

	handleDateChange (event) {
		let _data = this.state.data;
		let _date = moment(event).format('YYYY-MM-DD');
		let _dateArr = _date.split('-');
		_data.yearString = _dateArr[0];
		_data.monthString = _dateArr[1];
		_data.dayString = _dateArr[2];
		this.setState({
			data: _data,
		})
	}

	handleSubmit () {
		let _session = localStorage.getItem('sessionID');
		let _data = this.state.data;
		_data.sidStr = _session;
		this.setState({
			data: _data,
			isLoading: true
		});
		myFetchGet(orderInHosURL, _data, (data) => {
			const { success, errCode } = data;
			if (success === 1) {
				alert('预约成功');
			} else {
				alert('预约失败');
			}
		})
	}

	render () {
		const { departmentList, thisDepartmentItme, doctorList, isLoading } = this.state;
		// console.log(history);
		const { Option } = Select;
		return (
			<div className="user-orderInHos">
				<div className="user-orderInHos-box">
					<div className="user-orderInHos-chooseDepartment">
						{
							departmentList.map((value, key) => {
								return (
									<div 
										key={key}
										onClick={() => {this.handleClick(key)}}
										className={classnames(['user-orderInHos-chooseItem', {'user-orderInHos-chooseItem_choose': thisDepartmentItme === key}])}>
										<span>{value.name}</span>
									</div>
								)
							})
						}
					</div>
					<div className="user-orderInHos-chooseDoctor">
						<Select 
							defaultValue="none" 
							style={{ width: 180 }} 
							onChange={(event) => {this.handleSelectChange(event)}}>
							<Option value="none">无</Option>
							{
								doctorList.map((value, key) => {
									return <Option key={key} value={value.value}>{value.name}</Option>
								})
							}
				    </Select>
					</div>
					<div className="user-orderInHos-chooseDate">
						<DatePicker
							format='YYYY-MM-DD' 
							onChange={(event) => {this.handleDateChange(event)}} />
					</div>
					<Button
						onClick={() => {this.handleSubmit()}}
						isLoading={isLoading} 
						content="预约" />
				</div>
			</div>
		)
	}
}

export default OrderInHos;