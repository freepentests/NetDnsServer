// i luv the builder pattern so much

export default class DnsPacketBuilder {
	#DNS_HEADER_SIZE_BYTES = 12;

	constructor() {
		this.packetId = null;
		this.isResponse = null;
		this.opcode = null;
		this.isAuthoritativeAnswer = null;
		this.isTruncated = null;
		this.recursionDesired = null;
		this.recursionAvailable = null;
		this.responseCode = null;
		this.questionCount = null;
		this.answerCount = null;
		this.authorityRecordCount = null;
		this.additionalRecordCount = null;
	}

	setPacketId(value) {
		this.packetId = value;
		return this;
	}

	setIsResponse(value) {
		this.isResponse = value;
		return this;
	}

	setOpcode(value) {
		this.opcode = value;
		return this;
	}

	setIsAuthoritativeAnswer(value) {
		this.isAuthoritativeAnswer = value;
		return this;
	}

	setIsTruncated(value) {
		this.isTruncated = value;
		return this;
	}

	setRecursionDesired(value) {
		this.recursionDesired = value;
		return this;
	}

	setRecursionAvailable(value) {
		this.recursionAvailable = value;
		return this;
	}

	setResponseCode(value) {
		this.responseCode = value;
		return this;
	}

	setQuestionCount(value) {
		this.questionCount = value;
		return this;
	}

	setAnswerCount(value) {
		this.answerCount = value;
		return this;
	}

	setAuthorityRecordCount(value) {
		this.authorityRecordCount = value;
		return this;
	}

	setAdditionalRecordCount(value) {
		this.additionalRecordCount = value;
		return this;
	}

	serialize() {
		const buffer = new ArrayBuffer(this.#DNS_HEADER_SIZE_BYTES);
		const view = new DataView(buffer);

		// the flags are supposed to be a section of 2 bytes instad of

		let flags = 0;

		if (this.isResponse) {
			flags = flags | 1 << 15; // leftmost bit specifies whether it's a response 
		}

		if (this.opcode) {
			flags = flags | this.opcode << 11;
		}

		if (this.isAuthoritativeAnswer) {
			flags = flags | 1 << 10; // third rightmost bit specifies whether it's an authoritative answer
		}

		if (this.isTruncated) {
			flags = flags | 1 << 9; // second rightmost bit specifies whether
		}

		if (this.recursionDesired) {
			flags = flags | 1 << 8;
		}

		if (this.recursionAvailable) {
			flags = flags | 1 << 7; // leftmost bit specifies wehther recursion is available
		}

		// there are 3 reserved bits in between these 2, but these are being ignored

		if (this.responseCode) {
			flags = flags | this.responseCode << 0;
		}

		view.setUint16(0, this.packetId);
		view.setUint16(2, flags);
		view.setUint16(4, this.questionCount);
		view.setUint16(6, this.answerCount);
		view.setUint16(8, this.authorityRecordCount);
		view.setUint16(10, this.additionalRecordCount);
	}
}

