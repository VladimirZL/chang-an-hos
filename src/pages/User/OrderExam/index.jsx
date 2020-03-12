import React, {Component} from 'react';
import classnames from 'classnames';
import { DatePicker } from 'antd';
import moment from 'moment';

import { myFetchPost } from '../../../pub_funcs/myFetch.jsx'
import Button from '../../../components/Button/index.jsx';
import './style.css';

const orderExamURL = 'http://localhost:8080/springMvcDemo1/booking/regist/healthCheck';

class OrderExam extends Component {

	constructor (props) {
		super(props);
		this.state = {
			thisTypeItme: 0,
			examList: [{
				name: '入职体检',
				value: 1,
			}, {
				name: '全身体检',
				value: 2,
			}, {
				name: '孕前体检',
				value: 3,
			}],
			isLoading: false,
			data: {
				checkTypeStr: 1
			},
		}
	}

	handleClick (key) {
		let _data = this.state.data;
		const { examList } = this.state;
		_data.checkTypeStr = examList[key].value;
		this.setState({
			thisTypeItme: key,
			data: _data,
		});
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
		myFetchPost(orderExamURL, _data, (data) => {
			console.log(data);
			const { success, errCode } = data;
			if (success === 1) {
				alert('预约成功');
			} else {
				alert('预约失败');
			}
		})
	}

	render () {
		const { examList, isLoading, thisTypeItme } = this.state;
		return (
			<div className="user-orderExam">
				<div className="user-orderExam-box">
					<div className="user-orderExam-chooseType">
						{
							examList.map((value, key) => {
								return (
									<div 
										key={key}
										onClick={() => {this.handleClick(key)}}
										className={classnames(['user-orderExam-chooseItem', {'user-orderExam-chooseItem_choose': thisTypeItme === key}])}>
										<span>{value.name}</span>
									</div>
								)
							})
						}
					</div>
					<div className="user-orderExam-chooseDate">
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

export default OrderExam;