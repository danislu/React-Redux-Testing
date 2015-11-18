import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
 
require('brace/mode/xml')
require('brace/theme/tomorrow_night_blue')

export default class MainView extends React.Component {
	
	constructor(props){
		super(props);
		
		this.editor = null;
		
		this.onLoad = this.onLoad.bind(this);
		this.onSelectionChange = this.onSelectionChange.bind(this);
	}
	
	componentWillUnmount() {
		this.editor = null;
	}
	
	onLoad(editor){
		this.editor = editor;
		this.editor.on('changeSelection', this.onSelectionChange);
	}
	
	onSelectionChange(){
		const range = this.editor.getSelectionRange();
		console.log('getSelectionRange: ' + JSON.stringify(range));
		const selectedText = this.editor.getSession().getTextRange(range);
		console.log('onSelectionChange: ' + JSON.stringify(selectedText));
	}
	
	render(){
		return(
			<div>
				<h1>MainView</h1>
				<AceEditor
					width="100%"
					mode="xml"
					theme="tomorrow_night_blue"
					name="UNIQUE_ID_OF_DIV"
					onChange={(v) => console.log(v)}
					onLoad={this.onLoad}
					editorProps={{ $blockScrolling: true }}/>
			</div>
		);
	}
}
	