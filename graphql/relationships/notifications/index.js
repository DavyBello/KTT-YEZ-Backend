const {
  NotificationRecipientTC,
  NotificationTC,
} = require('../../composers');

NotificationRecipientTC.addRelation('details', {
  resolver: () => NotificationTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.notificationId,
  },
  projection: { notificationId: 1 },
});
