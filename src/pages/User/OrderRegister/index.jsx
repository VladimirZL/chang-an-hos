import React, {Component} from 'react';
import classnames from 'classnames';
import { Select, DatePicker  } from 'antd';
import moment from 'moment';

import { myFetchPost } from '../../../pub_funcs/myFetch.jsx'
import Button from '../../../components/Button/index.jsx';
import './style.css';

const orderRegisterURL = 'http://localhost:8080/springMvcDemo1/booking/regist/doctor';
const doctourMessageURL = 'http://localhost:8080/springMvcDemo1/work/patient/getDoctorLst';

class OrderRegister extends Component {

	constructor (props) {
		super(props);
		this.state = {
			thisDepartmentItme: 1,
			departmentList: [{
				name: '儿科',
				type: 1
			}, {
				name: '外科',
				type: 2
			}, {
				name: '内科',
				type: 3				
			}],
			doctorList: [],
			isLoading: false,
			data: {},
		}
	}

	componentWillMount () {
		const { thisDepartmentItme } = this.state;
    this.getDoctorLst(thisDepartmentItme);
	}

	getDoctorLst (type) {
		myFetchPost(doctourMessageURL, {departmentIDstr: type}, (data) => {
      const { success, docInfoLst } = data;
      if (success === 1) {
        let _doctorList = [];
        docInfoLst.forEach((value, key) => {
          const { name, docUIDstr, title, id } = value;
          let _info = {
            name: name,
            title: title,
            // docUIDstr: docUIDstr,
            id: id
          }
          _doctorList.push(_info);
        });
        this.setState({
          doctorList: _doctorList
        });
      }
    })
	}

	handleClick (key) {
		this.setState({
			thisDepartmentItme: key,
		});
		this.getDoctorLst(key);
	}

	handleSelectChange (event) {
		let _data = this.state.data;
		_data.id = event;
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
		myFetchPost(orderRegisterURL, _data, (data) => {
			console.log(data);
			const { success, errCode } = data;
			this.setState({
				isLoading: false,
			});
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
			<div className="user-orderRegister">
				<div className="user-orderRegister-box">
					<div className="user-orderRegister-chooseDepartment">
						{
							departmentList.map((value, key) => {
								return (
									<div 
										key={key}
										onClick={() => {this.handleClick(value.type)}}
										className={classnames(['user-orderRegister-chooseItem', {'user-orderRegister-chooseItem_choose': thisDepartmentItme === value.type}])}>
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
									const { id, name, title} = value;
									return <Option key={key} value={id}>{name}({title})</Option>
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