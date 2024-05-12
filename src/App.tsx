import './App.scss';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProvider from './provider/AuthProvider';

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
					<CssBaseline />
					<AppRoutes />
				</QueryClientProvider>
			</ThemeProvider>
		</AuthProvider>
	);
}
