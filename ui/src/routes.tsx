import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route, } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import LoadingScreen from 'src/components/LoadingScreen';

type Routes = {
  id?: number;
  exact?: boolean;
  path?: string | string[];
  layout?: any;
  component?: any;
  routes?: Routes;
}[];

export const renderRoutes = (routes: Routes = []): JSX.Element => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={route.id}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Layout>
                {route.routes
                  ? renderRoutes(route.routes)
                  : <Component {...props} />}
              </Layout>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes: Routes = [
  {
    id: 1,
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView')),
  },
  {
    id: 2,
    path: '*',
    layout: DashboardLayout,
    routes: [
      {
        id: 3,
        exact: true,
        path: '/',
        component: () => <Redirect to="/app" />,
      },
      {
        id: 4,
        exact: true,
        path: '/app/emails',
        component: lazy(() => import('src/views/emails/List')),
      },
      {
        id: 5,
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/emails" />
      },
      {
        id: 6,
        component: () => <Redirect to="/404" />,
      },
    ],
  }
];

export default routes;
