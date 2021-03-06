class LivechatInquiry extends RocketChat.models._Base {
	constructor() {
		super();
		this._initModel('livechat_inquiry');

		this.tryEnsureIndex({ 'rid': 1 }); // room id corresponding to this inquiry
		this.tryEnsureIndex({ 'name': 1 }); // name of the inquiry (client name for now)
		this.tryEnsureIndex({ 'message': 'text' }); // message sent by the client - Need to be the same as packages/rocketchat-lib/server/models/Messages.coffee:12 (otherwise error on inserting large documents)
		this.tryEnsureIndex({ 'ts': 1 }); // timestamp
		this.tryEnsureIndex({ 'code': 1 }); // (for routing)
		this.tryEnsureIndex({ 'agents': 1}); // Id's of the agents who can see the inquiry (handle departments)
		this.tryEnsureIndex({ 'status': 1}); // 'open', 'taken'
	}

	findOneById(inquiryId) {
		return this.findOne({ _id: inquiryId });
	}

	/*
	 * mark the inquiry as taken
	 */
	takeInquiry(inquiryId) {
		this.update({
			'_id': inquiryId
		}, {
			$set: { status: 'taken' }
		});
	}

	/*
	 * mark inquiry as open
	 */
	openInquiry(inquiryId) {
		this.update({
			'_id': inquiryId
		}, {
			$set: { status: 'open' }
		});
	}

	/*
	 * return the status of the inquiry (open or taken)
	 */
	getStatus(inquiryId) {
		return this.findOne({'_id': inquiryId}).status;
	}
}

RocketChat.models.LivechatInquiry = new LivechatInquiry();
