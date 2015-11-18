
import fetch from 'isomorphic-fetch'

export const FETCHING_XML_START = "fetching_xml_1";
export const FETCHING_XML_SUCCESS = "fetching_xml_2";
export const FETCHING_XML_FAILED = "fetching_xml_3";

function fetchingXml(url){
	return {
		type: FETCHING_XML_START,
		url: url,
		isFetching: true		
	}
}

function fetchingXmlFailed(url, err){
	return {
		type: FETCHING_XML_FAILED,
		url: url,
		isFetching: false,
		error: err
	}
}

function fetchingXmlSuccess(url, value){
	return {
		type: FETCHING_XML_SUCCESS,
		url: url,
		isFetching: false,
		value: value
	}
}

export function fetchXml(url){
	return (dispatch, getState) => {
		dispatch(fetchingXml(url));
		
		fetch(url)
			.then(response => response.body)
			.then(body => dispatch(fetchingXmlSuccess(url, body)))
			.catch(err => dispatch(fetchingXmlFailed(url, err)));
	}
}