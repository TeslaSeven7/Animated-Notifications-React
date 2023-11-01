import { v4 as uuid } from 'uuid';
let titles = [
	['New Comment', 'Someone commented on your post.'],
	['Daily Reminder', "Don't forget to exercise today."],
	['Friend Tagged You', 'You were tagged in a photo.'],
	['Product Restock', 'Back in stock: Your favorite item.'],
	['Emergency Alert', 'Important weather update.'],
	['Event Cancelled', 'The event is cancelled.'],
	['New Like', 'Your post received a like.'],
	['Package Delivered', 'Your package has arrived.'],
	['Traffic Update', 'Heavy traffic on your route.'],
	['Appointment Confirmed', 'Your appointment is confirmed.'],
	['System Update', 'Update your app to the latest version.'],
	['Low Storage', 'Running out of storage space.'],
	['Connection Lost', 'No internet connection.'],
	["Friend's Birthday", 'Wish your friend a happy birthday!'],
	['News Flash', 'Top headlines today.'],
	['Product Recommendation', 'You might like this product.'],
	['Security Alert', 'Unusual login detected.'],
	['Payment Reminder', "Don't forget your payment."],
	['Achievement Unlocked', "You've earned a new badge."],
	['Flight Delayed', 'Your flight is delayed.'],
];
export const generateMessages = () => {
	return {
		id: uuid(),
		content: titles[Math.floor(Math.random() * titles.length)],
	};
};
