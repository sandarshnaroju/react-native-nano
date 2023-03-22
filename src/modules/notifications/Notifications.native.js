import notifee from '@notifee/react-native';

class Notification {
  constructor(props) {}

  async showNotification(name, notificationConfig) {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: name,
      name: name,
    });

    // Display a notification
    await notifee.displayNotification({
      ...notificationConfig,
      android: {
        // smallIcon: 'folder', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        ...notificationConfig.android,
        channelId,
      },
    });
  }
}
var notif = null;
const getNotification = () => {
  try {
    if (notif == null) {
      require('@notifee/react-native');

      notif = new Notification();
    }
  } catch (e) {
    notif = null;
  }

  return notif;
};
export default getNotification;
