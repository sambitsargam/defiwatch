import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import Loading from '../Loading/Spinner';
import { RouteList } from './RouteList';
import Layout from './layout';

const PrivateRoute = lazy(() => import('./PrivateRoute'));
const PublicRoute = lazy(() => import('./PublicRoute'));

const Routing = ({ isSidebarVisible }) => {
  const routes = RouteList;
  return (
    <Suspense fallback={<Loading />}>
      <div
        className={`h-100 ${isSidebarVisible ? '' : 'sidebar-hidden'}`}
        style={{ overflowX: 'hidden' }}
      >
        <Switch>
          {routes.map((route, index) => {
            return route.private ? (
              <PrivateRoute
                restricted={route.restricted}
                key={index}
                exact
                path={route.link}
              >
                <Layout layout={route.layout}>
                  <route.render />
                </Layout>
              </PrivateRoute>
            ) : (
              <PublicRoute
                restricted={route.restricted}
                exact
                path={route.link}
                key={index}
              >
                <Layout layout={route.layout}>
                  <route.render />
                </Layout>
              </PublicRoute>
            );
          })}
          <Redirect to="/404" />
        </Switch>
      </div>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  isSidebarVisible: state.settings.isSidebarVisible,
});

export default compose(withRouter, connect(mapStateToProps))(Routing);
