import ComingSoon from '../modules/_general/views/ComingSoon.vue';
import Error404 from '../modules/_general/views/404.vue';

const routes = [
  {
    path: '/',
    redirect: '/comingsoon', // You might want a default route
  },
  {
    path: '/comingsoon',
    name: 'ComingSoon',
    component: ComingSoon,
  },
  {
    path: '/:catchAll(.*)', // This is a catch-all route, it will redirect to 404 for unknown routes
	name: 'Error404',
    component: Error404,
  },
];

export default routes;