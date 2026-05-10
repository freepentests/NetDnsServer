// i luv the builder pattern so much

import DnsPacketQuestionBuilder from './DnsPacketQuestionBuilder.js';
import DnsPacketAnswerBuilder from './DnsPacketAnswerBuilder.js';

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
		this.questionCount = 0;
		this.answerCount = 0;
		this.authorityRecordCount = 0;
		this.additionalRecordCount = 0;

		this.questions = [];
		this.answers = [];
	}

	addQuestion(questionBuilderCallback) {
		const question = new DnsPacketQuestionBuilder();
		questionBuilderCallback(question); // the caller will have to use the DnsPacketQuestionBuilder to construct the question

		this.questions.push(question);
		this.questionCount++;

		return this;
	}

	addAnswer(answerBuilderCallback) {
		const answer = new DnsPacketAnswerBuilder();
		answerBuilderCallback(answer); // the caller will have to use the DnsPacketAnswerBuilder to construct the answer

		this.answers.push(answer);
		this.answerCount++;

		return this;
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
		// it is recommended not to use the setQuestionCount setter because the addQuestion method automatically increments questionCount
		this.questionCount = value;
		return this;
	}

	setAnswerCount(value) {
		// it is recommended not to use the setAnswerCount setter because the addAnswer method automatically increments answerCount
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

	#serializeHeader() {
		const buffer = new ArrayBuffer(this.#DNS_HEADER_SIZE_BYTES);
		const view = new DataView(buffer);

		let flags = 0;

		if (this.isResponse) {
			flags = flags | 1 << 15; // leftmost bit specifies whether it's a response or a query
		}

		if (this.opcode) {
			flags = flags | this.opcode << 11;
		}

		if (this.isAuthoritativeAnswer) {
			flags = flags | 1 << 10; // third rightmost bit specifies whether it's an authoritative answer
		}

		if (this.isTruncated) {
			flags = flags | 1 << 9; // second rightmost bit specifies whether the shit is truncated
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

		return buffer;
	}

	serialize() {
		let buffer = new Uint8Array(this.#serializeHeader());
		
		this.questions.forEach(question => {
			buffer = new Uint8Array([...buffer, ...new Uint8Array(question.serialize())]);
		});

		this.answers.forEach(answer => {
			buffer = new Uint8Array([...buffer, ...new Uint8Array(answer.serialize())]);
		});

		return buffer;
	}
}

