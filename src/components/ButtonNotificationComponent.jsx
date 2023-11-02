import React from 'react';
import { useState } from 'react';
export default function ButtonNotificationComponent({
	title,
	content,
	icon,
	selectedMessages,
	message,
	onClickHandlerDisable,
	onClickHandlerEnable,
	onClickHandler2,
}) {
	let followCursor;
	let buttonLeft;
	let constrainedNewLeft;
	let reference;
	const [newLeft, setNewLeft] = useState(0);
	const [transition, setTransition] = useState('');
	const [border, setBorder] = useState('border-zinc-300');
	const [fill, setFill] = useState('fill-zinc-300');
	const startSlideComponent = (e) => {
		setTransition('');
		const button = e.currentTarget;
		const buttonRect = button.getBoundingClientRect();
		buttonLeft = buttonRect.left;

		const handleMouseMove = (e) => {
			followCursor = e.clientX;
			const newL = followCursor - buttonLeft;
			constrainedNewLeft = Math.min(Math.max(newL, 0), 350);
			setNewLeft(Math.round(constrainedNewLeft) / 5);
		};

		const handleMouseUp = () => {
			if (constrainedNewLeft >= 200) {
				setTransition('transition-transform');
				reference = 350 / 5;
				setNewLeft(reference);
				setBorder('border-red-400');
				setFill('fill-red-400');
				toggleMessagesChild(message.id);
				console.log('MOUSE UP SELECTED');
			} else {
				console.log('MOUSE UP NOT SELECTED');
				setTransition('transition-transform');
				reference = 0;
				setNewLeft(reference);
				setBorder('border-zinc-300');
				toggleMessagesChild(message.id);
				setFill('fill-zinc-300');
			}
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const toggleMessagesChild = (id) => {
		if (reference === 0) {
			console.log('disbale');
			onClickHandlerDisable(id);
		} else {
			onClickHandlerEnable(id);
		}
	};
	const handleChildClick2 = (id) => {
		console.log('Archive Message');
		onClickHandler2(id);
	};
	return (
		<>
			<div className='relative rounded-md overflow-hidden bg-zinc-50'>
				<button
					className={`flex flex-col w-full p-4 rounded-md transition-colors relative z-10 ${transition} ${
						selectedMessages.includes(message.id) ? 'bg-blue-500' : 'bg-white'
					}`}
					style={{ transform: `translateX(${newLeft}px)` }}
					onMouseDown={(e) => startSlideComponent(e)}>
					<div className='flex flex-row items-start justify-center'>
						<p className='pe-2'>{icon}</p>
						<div className='text-start'>
							<p
								className={`font-medium transition-colors ${
									selectedMessages.includes(message.id)
										? 'text-white'
										: 'text-zinc-900'
								}`}>
								{title}
							</p>
							<span
								className={`text-sm transition-colors ${
									selectedMessages.includes(message.id)
										? 'text-white'
										: 'text-zinc-700'
								}`}>
								{content}
							</span>
						</div>
					</div>
				</button>
				<div className='absolute left-0 top-0 h-full px-2 flex items-center justify-center transition group'>
					<button
						className={`border rounded-md p-3 transition group-hover:border-red-500 ${border}`}
						onClick={() => handleChildClick2(message.id)}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							id='Layer_2'
							data-name='Layer 2'
							width='20'
							height='20'
							viewBox='0 0 24 24'
							className={`transition group-hover:fill-red-500 ${fill}`}>
							<path d='M19,7a1,1,0,0,0-1,1V19.191A1.92,1.92,0,0,1,15.99,21H8.01A1.92,1.92,0,0,1,6,19.191V8A1,1,0,0,0,4,8V19.191A3.918,3.918,0,0,0,8.01,23h7.98A3.918,3.918,0,0,0,20,19.191V8A1,1,0,0,0,19,7Z' />
							<path d='M20,4H16V2a1,1,0,0,0-1-1H9A1,1,0,0,0,8,2V4H4A1,1,0,0,0,4,6H20a1,1,0,0,0,0-2ZM10,4V3h4V4Z' />
							<path d='M11,17V10a1,1,0,0,0-2,0v7a1,1,0,0,0,2,0Z' />
							<path d='M15,17V10a1,1,0,0,0-2,0v7a1,1,0,0,0,2,0Z' />
						</svg>
					</button>
				</div>
			</div>
		</>
	);
}
