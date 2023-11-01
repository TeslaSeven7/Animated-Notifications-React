import { motion } from 'framer-motion';
import React from 'react';
export default function ({ children }) {
	let base = 4;
	let t = function (d) {
		return d * base;
	};
	return (
		<motion.li
			className='relative'
			initial={{ height: 0, opacity: 0 }}
			animate={{
				height: 'auto',
				opacity: 1,
				transition: {
					type: 'spring',
					bounce: 0.3,
					opacity: { delay: t(0.0025) },
				},
			}}
			exit={{ height: 0, opacity: 0 }}
			transition={{
				duration: t(0.15),
				type: 'spring',
				bounce: 0,
				opacity: { duration: t(0.03) },
			}}>
			{children}
		</motion.li>
	);
}
