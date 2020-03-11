import React from 'react';
import { render } from 'react-dom';

import RouteMap from './router/router.jsx';

import 'antd/dist/antd.css'
import './index.css';


render (
	<RouteMap />,
	document.getElementById('root')
)