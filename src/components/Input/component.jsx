import React, { Component } from "react";
import classnames from 'classnames'
import './style.css';

class Input extends Component {

	constructor(props) {
		super(props);
		this.state = {
			focused: false,
		}
	}

	handleFocus () {
		this.setState({
			focused: true,
		});
	}

	handleBlur () {
		this.setState({
			focused: false,
		})
	}

	handleChange (event) {
		const { regex, onTest, onChange } = this.props;
		onChange(event.target.value);
		if (regex.test(event.target.value)) {
			onTest(true);
		} else {
			onTest(false);
		}
	}

	render () {
		const { placeholder, isTest=true, inputValue, size='default', type, maxLength='' } = this.props;
		const { focused } = this.state;
		return (
			<span className={
				classnames(
					'my-input', 
					`${size}`, 
					{'my-input_focused': focused},
					{'test-wrong': !isTest}
				)}>
				<input
				  maxLength={maxLength}
				  value={inputValue}
					type={type}
					placeholder={placeholder}
					onChange={(event) => this.handleChange(event)}
					onFocus={() => this.handleFocus()}
					onBlur={() => this.handleBlur()} />
			</span>
		)
	}
}

export default Input;