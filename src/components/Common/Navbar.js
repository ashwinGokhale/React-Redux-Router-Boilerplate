import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../constants';

const CommonNav = () => (
	<React.Fragment>
		<Link to={routes.HOME}>Home</Link>
	</React.Fragment>
);

const Navbar = ({ auth }) => (
	<nav className="navbar navbar-default navbar-fixed-top">
		<div className="nav-container container">
			<div className="collapse navbar-collapse" id="navbar">
				<ul className="nav navbar-nav navbar-right">
					{auth ? (
						<React.Fragment>
							<Link to={routes.PROFILE}>Profile</Link>
							<CommonNav />
							<Link to={routes.LOGOUT}>Logout</Link>
						</React.Fragment>
					) : (
						<React.Fragment>
							<CommonNav />
							<Link to={routes.LOGIN}>Login</Link>
							<Link to={routes.SIGNUP}>Join</Link>
						</React.Fragment>
					)}
				</ul>
			</div>
		</div>
	</nav>
);

Navbar.propTypes = {
	auth: PropTypes.bool,
	id: PropTypes.string,
	user: PropTypes.object
};

Navbar.defaultProps = {
	auth: null,
	id: null,
	user: null
};

export default Navbar;
