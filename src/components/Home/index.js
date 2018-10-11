import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { err } from '../../constants';
import {
	sendFlashMessage,
	clearFlashMessages,
	createPost
} from '../../actions';
import { Header } from '../Common';

class HomePage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Workly</h1>
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
		clear: clearFlashMessages
	}
)(HomePage);
