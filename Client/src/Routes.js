import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';

// Pages

import Error from "@/pages/Error/Error";
import Dashboard from '@/pages/dashboard/Dashboard';
import Value from '@/pages/Value/Value';
import Principle from '@/pages/Principle/Principle';

Vue.use(Router);

export default new Router({
  routes: [
    {
    path: '/',
    redirect: 'dashboard',
    name: 'Layout',
    component: Layout,
    children: [
	{
        path: 'Dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },

{
    path: 'Value',
    name: 'Value',
    component: Value,
},
{
    path: 'Principle',
    name: 'Principle',
    component: Principle,
},
    ],
  },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ],
});
