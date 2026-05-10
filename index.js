import Server from './Modules/Server.js';

const server = new Server(53);
server.listen(() => {
	console.log('listening');
});

