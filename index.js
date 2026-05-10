import dgram from 'dgram';
import DnsPacketBuilder from './Modules/Builders/DnsPacketBuilder.js';
import { applyPolyfills } from './Modules/Polyfills.js';

applyPolyfills();

const server = dgram.createSocket('udp4');

const packet = new DnsPacketBuilder()
	.setPacketId(Math.floor(Math.random() * 2 ** 16))
	.setIsResponse(true)
	.setOpcode(0)
	.setRecursionDesired(true)
	.addQuestion((question) => {
		question
			.setDomainName('www.google.com')
			.setRecordType(1)
	})
	.addAnswer((answer) => {
	})
	.serialize();

console.log('running');

server.on('message', (e) => {
	console.log(new TextDecoder().decode(e));
});

server.bind(53, '127.0.0.1');

