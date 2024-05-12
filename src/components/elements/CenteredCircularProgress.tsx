import React from 'react';
import { CircularProgress } from '@mui/material';

/**
 * Reusable Circular Progress component
 *
 * @author Pavan Kumar Jadda
 * @since 0.1.0
 */
export default function CenteredCircularProgress() {
	return (
		<div style={{ margin: '15px' }} className="custom-flex-justify-center">
			<CircularProgress />
		</div>
	);
}
