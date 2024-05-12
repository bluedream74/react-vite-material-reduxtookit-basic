import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
// import { AdminGuardedRoute } from './AdminGuardedRoute';
import { ReadOnlyAccessGuardedRoute } from './ReadOnlyAccessGuardedRoute';
// import { DataUserGuardedRoute } from './DataUserGuardedRoute';
import CenteredCircularProgress from '../components/elements/CenteredCircularProgress';

// Lazy load all pages
const UnauthorizedPage = React.lazy(() => import('../pages/UnAuthorizedPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));


/**
 * Define all Routes and Sub-Routes
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export default function AppRoutes(): React.JSX.Element {
	return (
		<div>
			<Routes>
				{/* Core Routes */}
				{/* <Route element={<LoginPage />} path="login" /> */}
				{/* <Route element={<LogoutPage />} path="logout" /> */}
				<Route element={<UnauthorizedPage />} path="unauthorized" />
				{/* <Route element={<FaqPage />} path="faq" /> */}
				{/* <Route element={<HelpPage />} path="help" /> */}

				{/* Read Only User Routes */}
				<Route
					path="/"
					element={
						<ReadOnlyAccessGuardedRoute>
							<Suspense fallback={<CenteredCircularProgress />}>
								<div>Home Page</div>
							</Suspense>
						</ReadOnlyAccessGuardedRoute>
					}
				/>

				{/* Books Routes */}
				{/* <Route path="book">
					<Route
						element={
							<ReadOnlyAccessGuardedRoute>
								<Suspense fallback={<CenteredCircularProgress />}>
									<AllBooksPage />
								</Suspense>
							</ReadOnlyAccessGuardedRoute>
						}
						path="all"
					/>
					<Route
						element={
							<ReadOnlyAccessGuardedRoute>
								<Suspense fallback={<CenteredCircularProgress />}>
									<FindBookPage />
								</Suspense>
							</ReadOnlyAccessGuardedRoute>
						}
						path="find"
					/>
					<Route
						element={
							<ReadOnlyAccessGuardedRoute>
								<Suspense fallback={<CenteredCircularProgress />}>
									<ViewBookPage />
								</Suspense>
							</ReadOnlyAccessGuardedRoute>
						}
						path=":id"
					/>
					<Route
						element={
							<ReadOnlyAccessGuardedRoute>
								<Suspense fallback={<CenteredCircularProgress />}>
									<AllBooksPage />
								</Suspense>
							</ReadOnlyAccessGuardedRoute>
						}
						path=""
					/>
				</Route> */}

				{/* Report Routes */}
				{/* <Route
					element={
						<DataUserGuardedRoute>
							<Suspense fallback={<CenteredCircularProgress />}>
								<ReportsSearchPage />
							</Suspense>
						</DataUserGuardedRoute>
					}
					path="report"
				/> */}

				{/* Admin Routes */}
				{/* <Route path="admin">
					<Route
						element={
							<AdminGuardedRoute>
								<Suspense fallback={<CenteredCircularProgress />}>
									<ManageAdGroupPage />
								</Suspense>
							</AdminGuardedRoute>
						}
						path="group/manage"
					/>
				</Route> */}

				<Route element={<NotFoundPage />} path="*" />
			</Routes>
		</div>
	);
}
