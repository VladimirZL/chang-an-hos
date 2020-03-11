import React, {Component} from 'react';
import classnames from 'classnames';
import { Select, DatePicker, button  } from 'antd';

import Button from '../../../components/Button/index.jsx';
import './style.css';

class OrderRegister extends Component {

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
				value: '张三'
			}, {
				name: '李四',
				value: '李四'
			}, {
				name: '王先生',
				value: '王先生'
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
		let _data = {
			doctor: event
		}
		this.setState({
			data: _data,
		})
	}

	handleDateChange (event) {
		console.log(event);
	}

	handleSubmit () {
		console.log(this.state.data);
		this.setState({
			isLoading: true
		})
	}

	render () {
		const { departmentList, thisDepartmentItme, doctorList, isLoading } = this.state;
		// console.log(history);
		const { Option } = Select;
		return (
			<div className="user-orderRegister">
				<div className="user-orderRegister-box">
					<div className="user-orderRegister-chooseDepartment">
						{
							departmentList.map((value, key) => {
								return (
									<div 
										key={key}
										onClick={() => {this.handleClick(key)}}
										className={classnames(['user-orderRegister-chooseItem', {'user-orderRegister-chooseItem_choose': thisDepartmentItme === key}])}>
										<span>{value.name}</span>
									</div>
								)
							})
						}
					</div>
					<div className="user-orderRegister-chooseDoctor">
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
					<div className="user-orderRegister-chooseDate">
						<DatePicker onChange={(event) => {this.handleDateChange(event)}} />
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

export default OrderRegister;