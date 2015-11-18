import { combineReducers } from 'redux';
import { initalState } from './constants';
/*
urls: [],
editor: {
	selectedText: "",
	fullText: ""
},
ui: {
	activeView: "main"
}
*/

function urls(urls = initalState.urls, action){
	switch (action.type){
		case "push":
			let a = urls.slice();
			a.push(action.url);
			return a;
		case "pop":
			let b = urls.slice();
			b.pop();
			return b;
		default:
			return urls;
	}
}



function selection(selection = initalState.editor.selection, action){
	switch(action.type){
		case "selectionChanged":
			return { 
				range: action.selection.range,
				text: action.selection.text
			};
		default:
			return selection;
	}
}

function fullText(text = initalState.editor.fullText, action){
	switch(action.type){
		case "fulltext":
			return action.text;
		default:
			return text;
	}
}

const editor = combineReducers({
	selection,
	fullText
});

const app = combineReducers({
	urls,
	editor
});

export default app;