import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { err } from '../../constants';
import { sendFlashMessage, clearFlashMessages, signUp } from '../../actions';
import { Header } from '../Common';

class SignUpPage extends Component {
	static propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func
		}).isRequired,
		signUp: PropTypes.func.isRequired,
		flash: PropTypes.func.isRequired,
		clear: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			passwordConfirm: ''
		};
		console.log('Signup page props', this.props);
	}

	onChange = e => {
		const { id, value } = e.target;
		this.setState({ [id]: value });
	};

	onSubmit = async e => {
		e.preventDefault();
		const { name, email, password, passwordConfirm } = this.state;
		const { flash, clear, signUp, history } = this.props;
		try {
			clear();
			if (!name) return flash('Please enter your full name');
			if (!email) return flash('An email is required for your account');
			if (!password) return flash('A password is required');
			if (!passwordConfirm) return flash('Please confirm your password');
			if (password !== passwordConfirm)
				return flash('Passwords does not match');

			flash('Creating your account...', 'green');
			const resp = await signUp(this.state);
			history.push('/');
			return flash(`Welcome ${resp.user.name}!`, 'green');
		} catch (error) {
			clear();
			console.error('EditProfile Page error:', error);
			return flash(err(error));
		}
	};

	render() {
		const { name, email, password, passwordConfirm } = this.state;
		return (
			<div className="section">
				<div className="section-container">
					<Header message="Signup" />
					<form onSubmit={this.onSubmit}>
						<label htmlFor="name">
							Name:&nbsp;
							<input
								id="name"
								placeholder="Full Name"
								value={name}
								onChange={this.onChange}
								pattern="([a-zA-Z]+ )+[a-zA-Z]+"
								title="Please enter your first and last name"
								required
							/>
						</label>
						<br />
						<label htmlFor="email">
							Email:&nbsp;
							<input
								type="email"
								id="email"
								placeholder="me@example.com"
								value={email}
								onChange={this.onChange}
								title="Please enter your email"
								required
							/>
						</label>
						<br />
						<label htmlFor="password">
							Password:&nbsp;
							<input
								type="password"
								id="password"
								value={password}
								onChange={this.onChange}
								title="Please enter a password"
								required
							/>
						</label>
						<br />
						<label htmlFor="passwordConfirm">
							Confirm Password:&nbsp;
							<input
								type="password"
								id="passwordConfirm"
								value={passwordConfirm}
								onChange={this.onChange}
								title="Please confirm your password"
								required
							/>
						</label>
						<br />
						<input type="submit" value="Join" />
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.sessionState
});

export default connect(
	mapStateToProps,
	{
		flash: sendFlashMessage,
		clear: clearFlashMessages,
		signUp
	}
)(SignUpPage);
