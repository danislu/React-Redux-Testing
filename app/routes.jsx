import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

import RootView from './containers/rootview';
import MainView from './containers/mainview';
import SettingsView from './containers/settingsview';
import AboutView from './containers/aboutview';

const routes = (
	<Router>
		<Route path="" component={RootView}>
			<Route path="settings" component={SettingsView} />
			<Route path="about" component={AboutView} />
			<Route path="*" component={MainView} />
		</Route>
	</Router>);

export default routes;
