const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');

admin.initializeApp();

exports.myFunction = onDocumentCreated('chat/{messageId}', async (event) => {
  const data = event.data;

  if (!data || !data.username || !data.text) {
    console.error('Invalid document data:', data);
    return null;
  }

  try {
    const message = {
      notification: {
        title: data.username,
        body: data.text,
      },
      data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
      topic: 'chat',
    };

    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully:', response);
    return null;
  } catch (error) {
    console.error('Error sending notification:', error);
    return null;
  }
});
