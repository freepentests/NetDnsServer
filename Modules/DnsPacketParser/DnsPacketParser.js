import DnsPacketBuilder from '../Builders/DnsPacketBuilder.js';
import DnsPacketQuestionBuilder from '../Builders/DnsPacketQuestionBuilder.js';

export default class DnsPacketParser {
	decodeQName(qName) {
		const length = qName[0];
		const decodedQNamePart = new TextDecoder().decode(qName.slice(1, 1 + length));

		const lastLetterIsNullTerminator = qName[length] === 0;
		if (lastLetterIsNullTerminator) return decodedQNamePart;

		const remainingQName = this.decodeQName(qName.slice(1 + length))
		return remainingQName ? decodedQNamePart + '.' + remainingQName : decodedQNamePart;
	}

	parseQuestions(packet, questionCount) {
		const questions = [];

		const byteArray = new Uint8Array(packet);

		let currentRecord = byteArray.slice(12);

		for (let i = 0; i < questionCount; i++) {
			const nullTerminatorPosition = currentRecord.indexOf(0); // null terminator
			const qName = currentRecord.slice(0, nullTerminatorPosition + 1);
			const decodedQName = this.decodeQName(qName);

			const recordType = new DataView(currentRecord.buffer).getUint16(qName.length);
			const classType = new DataView(currentRecord.buffer).getUint16(qName.length + 2);

			const questionObject = new DnsPacketQuestionBuilder().setDomainName(decodedQName).setRecordType(recordType).setClass(classType);
			questions.push(questionObject);

			currentRecord = currentRecord.slice(qName.length);
		}

		return questions;
	}

	parse(packet) {
		const view = new DataView(packet);
		
		const packetId = view.getUint16(0);
		const flags = view.getUint16(2);
		const questionCount = view.getUint16(4); // QDCOUNT
		const answerCount = view.getUint16(6);
		const authorityRecordCount = view.getUint16(8);
		const additionalRecordCount = view.getUint16(10);

		const questions = this.parseQuestions(packet, questionCount);

		const parsedPacket = new DnsPacketBuilder()
			.setPacketId(packetId)
			.setQuestionCount(questionCount)
			.setAnswerCount(answerCount)
			.setAuthorityRecordCount(authorityRecordCount)
			.setAdditionalRecordCount(additionalRecordCount)
			.setQuestions(questions);

		return parsedPacket
	}
}

