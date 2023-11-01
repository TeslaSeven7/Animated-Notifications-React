import React from 'react';
import { useState } from 'react';
import { generateMessages } from '../utils/MessageGenerator';
import AnimatedListComponent from './AnimatedListComponent';
import { motion, AnimatePresence } from 'framer-motion';
export default function NotificationComponent() {
	const [messages, setMessages] = useState([]);
	const [selectedMessages, setSelectedMessages] = useState([]);
	const addMessage = () => {
		const newMessage = generateMessages();
		setMessages([...messages, newMessage]);
	};
	const toggleMessage = (id) => {
		if (selectedMessages.includes(id)) {
			setSelectedMessages((prev) => {
				return prev.filter((i) => i != id);
			});
		} else {
			setSelectedMessages((prev) => {
				return [...prev, id];
			});
		}
	};
	const archiveMessages = () => {
		setMessages((prev) => {
			return prev.filter((message) => !selectedMessages.includes(message.id));
		});
		setSelectedMessages([]);
	};
	return (
		<div className='bg-white rounded-xl'>
			<div className='flex justify-between w-full border-b-zinc-100 border-b-[1px] p-4'>
				<button
					className='text-zinc-400 px-2 py-1 hover:text-zinc-500 -mx-2'
					onClick={addMessage}>
					Add
				</button>
				<button
					className='text-zinc-400 px-2 py-1 hover:text-zinc-500 -mx-2'
					onClick={archiveMessages}>
					Archive
				</button>
			</div>
			<div
				className={`max-h-[400px] px-3 py-2 rounded-xl ${
					messages.length > 0 ? 'overflow-y-scroll' : ''
				}`}>
				<ul>
					<AnimatePresence initial={false}>
						{messages.length > 0 ? (
							[...messages].reverse().map((message) => {
								return (
									<AnimatedListComponent key={message.id}>
										<div className='py-0.5 transition'>
											<button
												className={`flex flex-col w-full p-4 rounded-md transition-colors ${
													selectedMessages.includes(message.id)
														? 'bg-blue-400'
														: 'bg-white'
												} `}
												onClick={() => toggleMessage(message.id)}>
												<p
													className={`font-medium transition-colors ${
														selectedMessages.includes(message.id)
															? 'text-white'
															: 'text-zinc-900'
													}`}>
													{message.content[0]}
												</p>
												<span
													className={`text-sm transition-colors ${
														selectedMessages.includes(message.id)
															? 'text-white'
															: 'text-zinc-700'
													}`}>
													{message.content[1]}
												</span>
											</button>
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
