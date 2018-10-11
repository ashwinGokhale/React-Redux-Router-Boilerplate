import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { memberMatches, formatDate, err } from '../../constants';
import {
	fetchUser,
	sendFlashMessage,
	clearFlashMessages
} from '../../actions';
import { CustomRedirect, Header } from '../Common';

class UserPage extends Component {
	static propTypes = {
		match: PropTypes.shape({
			params: PropTypes.shape({
				id: PropTypes.string
			})
		}).isRequired,
		history: PropTypes.shape({
			push: PropTypes.func
		}).isRequired,
		flash: PropTypes.func.isRequired,
		clear: PropTypes.func.isRequired,
		user: PropTypes.shape({
			permissions: PropTypes.array
		})
	};

	static defaultProps = { user: null };

	constructor(props) {
		super(props);
		this.state = {
			member: null,
			notFound: false
		};
		console.log('UserPage props:', this.props);
	}

	componentDidMount = () => {
		const {
			match: {
				params: { id }
			},
			flash
		} = this.props;
		fetchUser(id)
			.then(member => {
				console.log('UserPage fetched member:', member);
				member
					? this.setState({ member })
					: this.setState({ notFound: true });
			})
			.catch(() => this.setState({ notFound: true }));
	};

	onChange = e => this.setState({ [e.target.id]: e.target.value });

	render() {
		const { member, notFound } = this.state;
		if (notFound) return <CustomRedirect msgRed="Member not found" />;
		if (!member) return <span>Loading...</span>;
		return (
			<div>
				<Header message={member.name} />
				<div className="section">
					<div className="section-container">
						<h3>Member - {member.name}</h3>
					</div>
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
	{ flash: sendFlashMessage, clear: clearFlashMessages }
)(UserPage);
