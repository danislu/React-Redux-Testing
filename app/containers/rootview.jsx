import React from 'react';
import { connect } from 'react-redux';
import DslNavbar from './../components/navbar';

export default class RootView extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		const {children} = this.props;
	
		return (
			<div>
				<DslNavbar />
				{children}
			</div>
		);
	}
}
