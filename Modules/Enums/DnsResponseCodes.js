// I know these aren't really enums but these are just enum-like objects
//
// I only included some of the error codes here; i did not add all of the extended codes

const DnsResponseCodes = {
	0: 'NOERROR', // no error
	1: 'FORMERR', // format error
	2: 'SERVFAIL', // server failure
	3: 'NXDOMAIN', // non-existent domain
	4: 'NOTIMP', // not implemented
	5: 'REFUSED', // query refused
	'NOERROR': 0,
	'FORMERR': 1,
	'SERVFAIL': 2,
	'NXDOMAIN': 3,
	'NOTIMP': 4,
	'REFUSED': 5
};

export default DnsResponseCodes;

