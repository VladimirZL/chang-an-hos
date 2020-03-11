import React, {Component} from 'react';
import classnames from 'classnames';

import Button from '../../../components/Button/index.jsx';
import './style.css';

class OrderExam extends Component {

	constructor (props) {
		super(props);
		this.state = {
			thisTypeItme: 0,
			examList: [{
				name: '入职体检',
			}, {
				name: '全身体检'
			}, {
				name: '孕前体检'
			}],
			isLoading: false,
			data: {
				orderExamType: '入职体检'
			},
		}
	}

	handleClick (key) {
		const { examList } = this.state;
		const _data = {
			orderExamType: examList[key].name
		}
		this.setState({
			thisTypeItme: key,
			data: _data,
		});
	}

	handleSubmit () {
		console.log(this.state.data);
		this.setState({
			isLoading: true
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