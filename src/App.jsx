import { useState } from 'react';
import NotificationComponent from './components/NotificationComponent';
function App() {
	return (
		<main className='flex justify-center items-center flex-col min-h-screen bg-gray-900'>
			<div className='mb-10'>
				<h1 className='text-8xl font-bold text-blue-500 mb-3'>SWIPIT.</h1>
				<h2 className='text-start text-zinc-200 text-xl'>
					A swipping notification board made with : <br />{' '}
					<strong>ReactJS, FramerMotion and Tailwind.</strong>
				</h2>
			</div>
			<div className='h-[400px] w-full max-w-lg'>
				<NotificationComponent />
			</div>
		</main>
	);
}

export default App;
