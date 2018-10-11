import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import routes from '../../constants';
import {
	ProtectedRoute,
	NotFound,
	Footer,
	FlashMessage,
	Navigation
} from '../Common';
import Home from '../Home';
import User from '../User';
import Login from '../Login';
import Logout from '../Logout';
import SignUp from '../Signup';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import {
	storageChanged,
	clearFlashMessages,
	fetchProfile
} from '../../actions';

class App extends Component {
	static propTypes = {
		token: PropTypes.string,
		history: PropTypes.shape({
			listen: PropTypes.func
		}).isRequired,
		fetchProfile: PropTypes.func.isRequired,
		clearFlashMessages: PropTypes.func.isRequired,
		storageChanged: PropTypes.func.isRequired
	};

	static defaultProps = {
		token: null
	};

	constructor(props) {
		super(props);
		window.addEventListener('storage', this.props.storageChanged);
		this.props.history.listen(() => this.props.clearFlashMessages());
		console.log('App props:', this.props);
	}

	componentWillMount = async () => {
		try {
			const response = await this.props.fetchProfile();
			console.log('Sign in response:', response);
		} catch (error) {
			console.error('Sign in error:', error);
		}
	};

	render() {
		const { token } = this.props;
		return (
			<div>
				<Navigation auth={!!token} />
				<div className="pageWrap">
					<FlashMessage />
					<Switch>
						<Route exact path={routes.HOME} component={Home} />
						<Route exact path={routes.LOGIN} component={Login} />
						<ProtectedRoute
							exact
							path={routes.LOGOUT}
							component={Logout}
							token={token}
						/>
						<Route exact path={routes.SIGNUP} component={SignUp} />
						<Route
							exact
							path={routes.FORGOT_PASSWORD}
							component={ForgotPassword}
						/>
						<Route
							exact
							path={routes.RESET_PASSWORD}
							component={ResetPassword}
						/>
						<Route exact path={routes.USER} component={User} />
						<Route component={NotFound} />
					</Switch>
				</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.sessionState
});

export default withRouter(
	connect(
		mapStateToProps,
		{ storageChanged, clearFlashMessages, fetchProfile }
	)(App)
);
