import dgram from 'dgram';
import DnsPacketBuilder from './Modules/Builders/DnsPacketBuilder.js';
import DnsPacketParser from './Modules/DnsPacketParser/DnsPacketParser.js';
import { applyPolyfills } from './Modules/Polyfills.js';

applyPolyfills();

const server = dgram.createSocket('udp4');


console.log('running');

server.on('message', (msg, rinfo) => {
	const parsedPacket = new DnsPacketParser().parse(msg.buffer);
	console.log(parsedPacket);

	server.send(packet, rinfo.port, rinfo.address, (err) => {
		console.log(err);
	});
});

server.bind(53, '127.0.0.1');

