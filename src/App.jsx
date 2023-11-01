import { useState } from 'react';
import NotificationComponent from './components/NotificationComponent';
function App() {
	return (
		<main className='flex justify-center items-center min-h-screen bg-zinc-300'>
			<div className='h-[400px] w-full max-w-lg'>
				<NotificationComponent />
			</div>
		</main>
	);
}

export default App;
