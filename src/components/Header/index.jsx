import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './style.css';

import logo from './image/logo.png';

class Header extends Component {

	constructor (props) {
		super(props);
		this.state = {
			thisList: props.nowLink
		}
	}
 	
 	handleChangeList (_path) {
 		this.setState({
 			thisList: _path,
 		})
 	}

 	handleLogout () {
 		localStorage.removeItem('isLogin');
    localStorage.removeItem('loginType');
    window.location.href = `${window.location.origin}/login`;
 	}

	render () {
		const { list, isLogin } = this.props;
		const { thisList } = this.state;
		return (
			<div className="header">
				<div className="header-img">
					<img src={logo} />
				</div>
				<div className="header-menu">
					{
						list.map((value, key) => {
							return (
								<div className={
									classnames(['header-menu-item', {'header-menu-item-this': value.link === thisList}])} 
									key={key}>
									<Link 
										onClick={() => this.handleChangeList(value.link)}
										to={value.link}>{value.name}
									</Link>
								</div>
							)
						})
					}
				</div>
				{
					isLogin ? 
					<div className="header-logout">
						<span onClick={() => this.handleLogout()}>退出登陆</span>
					</div> : 
					<div></div>
				}
			</div>
		)
	}
}

export default Header;