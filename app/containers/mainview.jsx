import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
 
require('brace/mode/xml')
require('brace/theme/tomorrow_night_blue')

export default class MainView extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		return(
			<div>
				<h1>MainView</h1>
				<AceEditor
					mode="xml"
					theme="tomorrow_night_blue"
					name="UNIQUE_ID_OF_DIV"
					editorProps={{$blockScrolling: true}}/>
			</div>
		);
	}
}