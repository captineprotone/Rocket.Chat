Meteor.publish 'subscription', ->
	unless this.userId
		return this.ready()

	RocketChat.models.Subscriptions.findByUserId this.userId,
		fields:
			t: 1
			ts: 1
			ls: 1
			name: 1
			rid: 1
			code: 1
			f: 1
			open: 1
			alert: 1
			answered: 1
			lastActivity: 1
			lastCustomerActivity: 1 /* timestamp from the initial contact or the first message after agent activity */
			unread: 1
			archived: 1
			desktopNotifications: 1
			mobilePushNotifications: 1
			emailNotifications: 1
