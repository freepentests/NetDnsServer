// I know these aren't really enums but these are just enum-like objects
//
// source: https://www.rfc-editor.org/rfc/rfc1035#section-3.2.4

const ClassTypeCodes = {
	1: 'IN', // internet
	2: 'CSNET', // CSNET class
	3: 'CH', // CHAOS class
	4: 'HS', // hesoid [dyer 87]
	'IN': 1,
	'CSNET': 2,
	'CH': 3,
	'HS': 4
};

export default ClassTypeCodes;

