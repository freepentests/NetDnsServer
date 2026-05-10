import { applyPolyfills } from './Polyfills.js';
import DnsPacketBuilder from './Builders/DnsPacketBuilder.js';
import DnsPacketParser from './DnsPacketParser/DnsPacketParser.js';
import dgram from 'dgram';

import ClassTypeCodes from './Enums/ClassTypeCodes.js';
import RecordTypeCodes from './Enums/RecordTypeCodes.js';

import fs from 'fs';

export default class Server {
	static instance;

	constructor(port) {
		if (Server.instance) return Server.instance;

		this.port = port;

		Server.instance = this;
	}

	static getInstance(port) {
		if (Server.instance) return Server.instance;
		else return new Server(port);
	}

	#findMatchingRecord(question) {
		const database = JSON.parse(fs.readFileSync('database.json', 'utf8'));

		return database.filter(record => record.QNAME === question.domainName && record.CLASS === ClassTypeCodes[question.class] && record.TYPE === RecordTypeCodes[question.recordType])[0];
	}

	listen(callback) {
		const server = dgram.createSocket('udp4');

		server.on('message', (msg, rinfo) => {
			const parsedPacket = new DnsPacketParser().parse(msg.buffer);

			if (parsedPacket.isResponse) return; // ignore the packet if it's a response since we only care about queries

			const response = new DnsPacketBuilder()
				.setPacketId(parsedPacket.packetId)
				.setQuestionCount(parsedPacket.questionCount)
				.setQuestions(parsedPacket.questions);

			parsedPacket.questions.forEach(question => {
				response.addAnswer((answerBuilder) => {
					const matchingRecord = this.#findMatchingRecord(question);

					if (!matchingRecord) return;

					answerBuilder
						.setDomainName(question.domainName)
						.setRecordType(question.recordType)
						.setClass(question.class)
						.setTTL(60);

					if (question.recordType === 1) {
						answerBuilder.setIPv4(matchingRecord.RDATA);
					} else {
						const byteArray = Uint8Array.fromBase64(matchingRecord.RDATA); // i gotta add a polyfill for this since this isn't in my node.js version
						answerBuilder.setData(byteArray)
					}
				});
			});

			const packet = response.serialize();

			server.send(packet, rinfo.port, rinfo.address, err => {if (err) console.log(err)});

		});

		server.bind(this.port);

		callback(this);
	}
}

