import dgram from 'dgram';
import DnsPacketBuilder from './Modules/Builders/DnsPacketBuilder.js';
import { applyPolyfills } from './Modules/Polyfills.js';

applyPolyfills();

const server = dgram.createSocket('udp4');


console.log('running');

server.on('message', (msg, rinfo) => {
	const packetId = new DataView(msg.buffer).getUint16(0);

	const packet = new DnsPacketBuilder()
		.setPacketId(packetId)
		.setIsResponse(true)
		.addQuestion((question) => {
			question
				.setDomainName('landchad.net')
				.setRecordType(1);
		})
		.addAnswer((answer) => {
			answer
				.setName('landchad.net')
				.setRecordType(1)
				.setTTL(60)
				.setIPv4('205.185.115.79');
		})
		.serialize();


	server.send(packet, rinfo.port, rinfo.address, (err) => {
		console.log(err);
	});
});

server.bind(53, '127.0.0.1');

