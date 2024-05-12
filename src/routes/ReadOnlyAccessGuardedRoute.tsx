import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Read-Only access auth guard
 *
 * @author Pavan Kumar Jadda
 * @since 1.0.0
 */
export function ReadOnlyAccessGuardedRoute({ children }: { children: React.JSX.Element }): React.JSX.Element {
	const { isUserLoggedIn } = useAuth();
	const location = useLocation();
	if (!isUserLoggedIn) return <Navigate to="login" state={{ from: location }} replace />;
	else return <Navigate to="unauthorized" state={{ from: location }} replace />;
	return children;
}
