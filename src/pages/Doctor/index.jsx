import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import './style.css';

import CurePatient from './CurePatient/index.jsx';
import PreparePatient from './PreparePatient/index.jsx';
import DoctorInfo from './UserInfo/index.jsx';


class Doctor extends Component {
	render () {
		return (
			<div id="doctor">
				<Route path="/doctor/curePatient" component={CurePatient} />
				<Route path="/doctor/preparePatient" component={PreparePatient} />
				<Route path="/doctor/userInfo" component={DoctorInfo} />
			</div>
		)
	}
}

export default Doctor;