import React, {Component} from 'react';
import classnames from 'classnames';
import './style.css';

class Button extends Component {
	constructor (props) {
		super(props);
	}

	render () {
		const { content, isLoading, onClick } = this.props;
		return (
			<div className="my-button">
				{
					isLoading ? <div className="my-button-loading"></div> : <div></div>
				}
				<button 
					onClick={onClick}
					className={classnames(['my-button-text', {'my-button-text-loading': isLoading}])}>{content}</button>
			</div>
		)
	}
}

export default Button;