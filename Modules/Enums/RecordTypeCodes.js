// I know these aren't really enums but these are just enum-like objects

// source: https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml

// DISCLAMER: I used AI to build the RecordTypeCodes object for me after I gave it the iana.org thing. before anyone says this is skidding, I just want to say that this is NOT skidding because this is literally just an object and requires no coding experience to create. I actually manually copied half of the record type codes before I got the AI to do the rest for me, but I just want to say that this is NOT skidding

// the AI also even got this wrong the first time somehow and I had to manually fix it; i don't know how some skids manage to vibe code entire games and libraries with AI if AI can't even write a simple plain object like this correctly

const RecordTypeCodes = {
	1: 'A', // a host address
	2: 'NS', // authoritative name server
	3: 'MD', // mail destination (obsolete)
	4: 'MF', // mail forwarder (obsolete)
	5: 'CNAME', // the canonical name for an alias
	6: 'SOA', // marks the start of a zone of authority
	7: 'MB', // a mailbox domain name (experimental)
	8: 'MG', // a mail group member (experimental)
	9: 'MR', // a mail rename domain name (experimental)
	10: 'NULL', // a null RR (experimental)
	11: 'WKS', // a well known service description
	12: 'PTR', // a domain name pointer
	13: 'HINFO', // host information
	14: 'MINFO', // mailbox or mail list information
	15: 'MX', // mail exchange
	16: 'TXT', // text strings
	17: 'RP', // Responsible Person
	18: 'AFSDB', // AFS Data Base location
	19: 'X25', // X.25 PSDN address
	20: 'ISDN', // ISDN address
	21: 'RT', // Route Through
	22: 'NSAP', // NSAP address, NSAP style A record
	23: 'NSAP-PTR', // domain name pointer, NSAP style
	24: 'SIG', // security signature
	25: 'KEY', // security key
	26: 'PX', // X.400 mail mapping information
	27: 'GPOS', // Geographical Position
	28: 'AAAA', // IPv6 address
	29: 'LOC', // Location Information
	30: 'NXT', // Next Domain (obsolete)
	31: 'EID', // Endpoint Identifier
	32: 'NIMLOC', // Nimrod Locator
	33: 'SRV', // Server Selection
	34: 'ATMA', // ATM Address
	35: 'NAPTR', // Naming Authority Pointer
	36: 'KX', // Key Exchanger
	37: 'CERT', // CERT
	38: 'A6', // A6 (obsolete)
	39: 'DNAME', // DNAME
	40: 'SINK', // SINK
	41: 'OPT', // OPT
	42: 'APL', // APL
	43: 'DS', // Delegation Signer
	44: 'SSHFP', // SSH Key Fingerprint
	45: 'IPSECKEY', // IPSECKEY
	46: 'RRSIG', // RRSIG
	47: 'NSEC', // NSEC
	48: 'DNSKEY', // DNSKEY
	49: 'DHCID', // DHCID
	50: 'NSEC3', // NSEC3
	51: 'NSEC3PARAM', // NSEC3PARAM
	52: 'TLSA', // TLSA
	53: 'SMIMEA', // S/MIME cert association
	54: 'UNASSIGNED',
	55: 'HIP', // Host Identity Protocol
	56: 'NINFO', // NINFO
	57: 'RKEY', // RKEY
	58: 'TALINK', // Trust Anchor LINK
	59: 'CDS', // Child DS
	60: 'CDNSKEY', // DNSKEY for child
	61: 'OPENPGPKEY', // OpenPGP Key
	62: 'CSYNC', // Child-To-Parent Synchronization
	63: 'ZONEMD', // Message Digest Over Zone Data
	64: 'SVCB', // General-purpose service binding
	65: 'HTTPS', // SVCB-compatible type for HTTP
	66: 'DSYNC', // Endpoint discovery for delegation sync
	67: 'HHIT', // Hierarchical Host Identity Tag
	68: 'BRID', // UAS Broadcast Remote ID
	99: 'SPF',
	100: 'UINFO',
	101: 'UID',
	102: 'GID',
	103: 'UNSPEC',
	104: 'NID',
	105: 'L32',
	106: 'L64',
	107: 'LP',
	108: 'EUI48',
	109: 'EUI64',
	128: 'NXNAME', // NXDOMAIN indicator
	249: 'TKEY', // Transaction Key
	250: 'TSIG', // Transaction Signature
	251: 'IXFR', // Incremental transfer
	252: 'AXFR', // Zone transfer
	253: 'MAILB', // Mailbox-related RRs
	254: 'MAILA', // Mail agent RRs
	255: '*', // Request for all records
	256: 'URI', // URI
	257: 'CAA', // Certification Authority Restriction
	258: 'AVC', // Application Visibility and Control
	259: 'DOA', // Digital Object Architecture
	260: 'AMTRELAY', // Automatic Multicast Tunneling Relay
	261: 'RESINFO', // Resolver Information
	262: 'WALLET', // Wallet address
	263: 'CLA', // Convergence Layer Adapter
	264: 'IPN', // Node Number
	32768: 'TA', // DNSSEC Trust Authorities
	32769: 'DLV', // DNSSEC Lookaside Validation (obsolete)
	'A': 1,
	'NS': 2,
	'MD': 3,
	'MF': 4,
	'CNAME': 5,
	'SOA': 6,
	'MB': 7,
	'MG': 8,
	'MR': 9,
	'NULL': 10,
	'WKS': 11,
	'PTR': 12,
	'HINFO': 13,
	'MINFO': 14,
	'MX': 15,
	'TXT': 16,
	'RP': 17,
	'AFSDB': 18,
	'X25': 19,
	'ISDN': 20,
	'RT': 21,
	'NSAP': 22,
	'NSAP-PTR': 23,
	'SIG': 24,
	'KEY': 25,
	'PX': 26,
	'GPOS': 27,
	'AAAA': 28,
	'LOC': 29,
	'EID': 31,
	'NIMLOC': 32,
	'SRV': 33,
	'ATMA': 34,
	'NAPTR': 35,
	'KX': 36,
	'CERT': 37,
	'DNAME': 39,
	'SINK': 40,
	'OPT': 41,
	'APL': 42,
	'DS': 43,
	'SSHFP': 44,
	'IPSECKEY': 45,
	'RRSIG': 46,
	'NSEC': 47,
	'DNSKEY': 48,
	'DHCID': 49,
	'NSEC3': 50,
	'NSEC3PARAM': 51,
	'TLSA': 52,
	'SMIMEA': 53,
	'HIP': 55,
	'NINFO': 56,
	'RKEY': 57,
	'TALINK': 58,
	'CDS': 59,
	'CDNSKEY': 60,
	'OPENPGPKEY': 61,
	'CSYNC': 62,
	'ZONEMD': 63,
	'SVCB': 64,
	'HTTPS': 65,
	'DSYNC': 66,
	'HHIT': 67,
	'BRID': 68,
	'SPF': 99,
	'UINFO': 100,
	'UID': 101,
	'GID': 102,
	'NID': 104,
	'L32': 105,
	'L64': 106,
	'LP': 107,
	'EUI48': 108,
	'EUI64': 109,
	'NXNAME': 128,
	'TKEY': 249,
	'TSIG': 250,
	'IXFR': 251,
	'AXFR': 252,
	'MAILB': 253,
	'MAILA': 254,
	'*': 255,
	'URI': 256,
	'CAA': 257,
	'AVC': 258,
	'DOA': 259,
	'AMTRELAY': 260,
	'RESINFO': 261,
	'WALLET': 262,
	'CLA': 263,
	'IPN': 264,
	'TA': 32768,
	'DLV': 32769
};

export default RecordTypeCodes;

