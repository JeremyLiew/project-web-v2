import * as BaseModule from '../modules/base/router'
import * as GeneralModule from '../modules/_general/router'
import * as ProductModule from '../modules/product/router'

import BaseLayout from '../layouts/BaseLayout.vue';

const routes = [
	// redirect route for default page setting
	// {
	//   path: '/',
	//   redirect: '/normalizestrange',
	// },

	{
		path: '/',
		name: 'NormalizeStrange',
		component: BaseLayout,
		children: [
			{
				path: '/', name: 'home-page', component: BaseModule.HomePage,
			},
			{
				path: '/contact-us', name: 'contact-us-page', component: BaseModule.ContactUsPage,
			},
		]
	},

	{
		path: '/coming-soon',
		name: 'coming-soon-page',
		component: GeneralModule.ComingSoon,
	},
	{
		path: '/:catchAll(.*)', // This is a catch-all route, it will redirect to 404 for unknown routes
	  name: 'Error404',
		component: GeneralModule.Error404,
	},
];

export default routes;