import { Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { Home } from '../pages/home/home';
import { Wishlist } from '../pages/wishlist/wishlist';

const AppRoutes = () => {
    return useRoutes([
        {
            path: '/',
            children: [
                        {path: '/', element: <Navigate to={'/home'} />},
                        {
                            path: 'home',
                            element: <Layout><Suspense><Outlet /><Home /></Suspense> </Layout>
                        },
                        {
                            path: 'wishlist',
                            element: <Layout><Suspense><Outlet /><Wishlist /></Suspense> </Layout>
                        },
                    ]
        }
    ])
};

export default AppRoutes;