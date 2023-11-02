import React from 'react';
import { useState } from 'react';
import { generateMessages } from '../utils/MessageGenerator';
import AnimatedListComponent from './AnimatedListComponent';
import ButtonNotificationComponent from './ButtonNotificationComponent';
import { motion, AnimatePresence } from 'framer-motion';
export default function NotificationComponent() {
	const [messages, setMessages] = useState([]);
	const [selectedMessages, setSelectedMessages] = useState([]);
	const addMessage = () => {
		const newMessage = generateMessages();
		setMessages([...messages, newMessage]);
	};
	const enableMessage = (id) => {
		setSelectedMessages((prev) => {
			return [...prev, id];
		});
	};

	const disableMessage = (id) => {
		setSelectedMessages((prev) => {
			return prev.filter((i) => i != id);
		});
	};
	const archiveMessages = () => {
		setMessages((prev) => {
			return prev.filter((message) => !selectedMessages.includes(message.id));
		});
		setSelectedMessages([]);
	};

	const archiveSingleMessage = (id) => {
		setMessages((prev) => {
			return prev.filter((message) => message.id !== id);
		});
		setSelectedMessages((prev) => {
			return prev.filter((message) => message !== id);
		});
	};

	return (
		<div className='bg-white rounded-xl border border-zinc-200 shadow-xl'>
			<div className='flex justify-between w-full border-b-zinc-200 border-b-[1px] p-4'>
				<button
					className='text-zinc-400 px-2 py-1 hover:text-zinc-500 -mx-2 flex items-center group'
					onClick={addMessage}>
					<span className=' group-hover:border-zinc-500 h-5 w-5 flex items-center justify-center me-1 font-bold'>
						<svg
							viewBox='0 0 512 512'
							className='fill-zinc-400 group-hover:fill-zinc-500'>
							<path d='m256 .001c-141.158 0-255.999 114.841-255.999 255.999s114.841 255.999 255.999 255.999 255.999-114.84 255.999-255.999-114.841-255.999-255.999-255.999zm0 479.998c-123.513 0-223.999-100.486-223.999-223.999s100.486-223.999 223.999-223.999 223.999 100.485 223.999 223.999c0 123.513-100.486 223.999-223.999 223.999zm142-223.999c0 8.837-7.164 16-16 16h-110v110c0 8.837-7.164 16-16 16s-16-7.163-16-16v-110h-110c-8.836 0-16-7.163-16-16s7.164-16 16-16h110v-110c0-8.837 7.164-16 16-16s16 7.163 16 16v110h110c8.836 0 16 7.164 16 16z' />
						</svg>
					</span>
					Add
				</button>
				<button
					className='text-zinc-400 px-2 py-1 hover:text-zinc-500 -mx-2'
					onClick={archiveMessages}>
					{selectedMessages.length > 0
						? `Archive (${selectedMessages.length})`
						: 'Archive'}
				</button>
			</div>
			<div
				className={`max-h-[400px] px-3 py-2 rounded-xl notif-content ${
					messages.length > 0 ? 'overflow-y-scroll overflow-x-hidden' : ''
				}`}>
				<ul>
					<AnimatePresence initial={false}>
						{messages.length > 0 ? (
							[...messages].reverse().map((message) => {
								return (
									<AnimatedListComponent key={message.id}>
										<div className='py-0.5 transition'>
											<ButtonNotificationComponent
												key={message.id}
												title={message.content[0]}
												content={message.content[1]}
												icon={message.content[2]}
												selectedMessages={selectedMessages}
												message={message}
												onClickHandlerEnable={enableMessage}
												onClickHandlerDisable={disableMessage}
												onClickHandler2={archiveSingleMessage}
											/>
										</div>
									</AnimatedListComponent>
								);
							})
						) : (
							<AnimatedListComponent>
								<h2 className='text-center font-semi-bol py-4'>
									You have no new notification
								</h2>
							</AnimatedListComponent>
						)}
					</AnimatePresence>
				</ul>
			</div>
		</div>
	);
}
