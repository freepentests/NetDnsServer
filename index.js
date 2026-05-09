import dgram from 'dgram';

const server = dgram.createSocket('udp4');

console.log('running');

server.on('message', (e) => {
	const header = new ArrayBuffer(12);

});

server.bind(53, '127.0.0.1');

