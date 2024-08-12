import { Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { Layout } from '../layout/layout';
import { Home } from '../pages/home/home';
import { Wishlist } from '../pages/wishlist/wishlist';

const AppRoutes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Layout><Suspense><Outlet /><Navigate to={'home'} replace /></Suspense> </Layout>,
            children: [
                        {index: true, element: <Navigate to={'home'} replace />},
                        {
                            path: 'home',
                            element: <Home />
                        },
                        {
                            path: 'wishlist',
                            element: <Wishlist />
                        },
                    ]
        }
    ])
};

export default AppRoutes;