import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { CustomRedirect } from '.';

const ProtectedRoute = ({ component: Component, token, msg, type, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			token ? <Component {...props} type={type} /> : <CustomRedirect to="/" msgRed={msg} />
		}
	/>
);

ProtectedRoute.propTypes = {
	component: PropTypes.any.isRequired,
	token: PropTypes.string,
	msg: PropTypes.string,
	type: PropTypes.string
};

ProtectedRoute.defaultProps = {
	token: null,
	msg: 'Permission Denied',
	type: ''
};

export default ProtectedRoute;
