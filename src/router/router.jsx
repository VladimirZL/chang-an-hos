import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../pages/Login/index.jsx';
import Register from '../pages/Register/index.jsx';
import User from '../pages/User/index.jsx';

import Header from '../components/Header/index.jsx';

class RouteMap extends Component {

	constructor (props) {
		super(props);
		this.state = {
			headIndexMap: [{
				name: '登陆',
				link: '/login'
			}, {
				name: '注册',
				link: '/register'
			}],
			headUserMap: [{
				name: '预约住院',
				link: '/user/orderInHos'
			}, {
				name: '医生信息列表',
				link: '/user/doctourMessage'
			}, {
				name: '预约体检',
				link: '/user/orderExam'
			}, {
				name: '预约挂号',
				link: '/user/orderRegister'
			}, {
				name: '个人信息',
				link: '/user/userInfo'
			}],
			headDoctorMap: [{
				name: '就诊患者',
				link: '/doctor/curePatient'
			}, {
				name: '待诊患者',
				link: '/doctor/preparePatient'
			}, {
				name: '个人信息',
				link: '/doctor/userInfo'
			}],
			headNowMap: [],
			isLogin: false,
			loginType: 'user',
			nowLink: '',
		}
	}

	componentWillMount () {
		const { headIndexMap, headDoctorMap, headUserMap } = this.state;
		const { isLogin, loginType } = localStorage;
		// console.log(window.location.pathname);
		this.setState({
			isLogin: isLogin,
			loginType: loginType,
			nowLink: window.location.pathname,
		})
		if (isLogin) {
			this.setState({
				headNowMap: loginType === 'user' ? headUserMap : headDoctorMap
			})
		} else {
			this.setState({
				headNowMap: headIndexMap,
			})
		}
	}

	render () {
		const { headNowMap, nowLink, isLogin, loginType } = this.state;
		return (
			<BrowserRouter>
				<Header
					isLogin={isLogin}
					nowLink={nowLink}
					list={headNowMap}/>
				<Switch>
					<Route path="/">
						<Route path="/login" render={props => (
							isLogin ?
							loginType === 'user' ?
							<Redirect to="/user"/>
							:
							<Redirect to="/doctor" />
							:
							<Login />
						)} />
						<Route path="/register" render={props => (
							isLogin ?
							loginType === 'user' ?
							<Redirect to="/user"/>
							:
							<Redirect to="/doctor" />
							:
							<Register />
						)} />
						<Route path="/user" render={props => (
							isLogin ?
							<User />
							:
							<Redirect to="/login"/>
						)} />
					</Route>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default RouteMap;