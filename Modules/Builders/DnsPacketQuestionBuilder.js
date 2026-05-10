// i luv the builder pattern so much

export default class DnsPacketQuestionBuilder {
	constructor() {
		this.domainName = null;
		this.recordType = null; // "A" record for mapping domains to IPv4 addresses, "AAAA" record for mapping domains to IPv6 addresses, "CNAME" record for mapping domains to other domains, etc. I will later create enum-like structures for record type codes (1 for A, 5 for CNAME, etc)
		this.class = 1; // class should almost always be set to 1 since most of the time we're looking up domain names on the internet
	}

	setDomainName(value) {
		this.domainName = value;
		return this;
	}

	setRecordType(value) {
		this.recordType = value;
		return this;
	}

	setClass(value) {
		this.class = value;
		return this;
	}

	#serializeDomainName() {
		const parts = this.domainName.split('.');
		let byteArray = new Uint8Array();
		
		parts.forEach(part => {
			byteArray = new Uint8Array([...byteArray, part.length, ...new TextEncoder().encode(part)]); // the label length is thankfully a uint8 rather than a varint (I hate working with varints)
		});

		byteArray = new Uint8Array([...byteArray, 0]); // null terminate the shit

		return byteArray;
	}

	serialize() {
		const domainNameByteArray = this.#serializeDomainName();
		const offset = domainNameByteArray.byteLength;

		const questionByteArray = new Uint8Array(offset + 4);
		questionByteArray.set(domainNameByteArray);

		const questionBuffer = questionByteArray.buffer;
		const view = new DataView(questionBuffer);

		view.setUint16(offset, this.recordType);
		view.setUint16(offset + 2, this.class);

		return questionBuffer;
	}
}

