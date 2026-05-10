// i luv the builder pattern so much
// this is for creating resource records

export default class DnsPacketAnswerBuilder {
	constructor() {
		this.domainName = null; // QNAME
		this.type = null;
		this.class = 1;
		this.TTL = null;
		this.length = null;
		this.data = null;
	}

	setName(value) {
		this.domainName = value;
		return this;
	}

	setType(value) {
		this.type = value;
		return this;
	}

	setClass(value) {
		this.class = value;
		return this;
	}

	setTTL(value) {
		this.TTL = value;
		return this;
	}

	setLength(value) {
		// it's recommended not to use this setter because setData automatically sets the RDATA length for you
		this.length = value;
		return this;
	}

	setData(value) {
		this.data = value;
		this.length = value.length;
		return this;
	}

	setIPv4(value) {
		return this.setData(new Uint8Array(value.split('.')));
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

		const answerByteArray = new Uint8Array(offset + 10 + this.length);
		answerByteArray.set(domainNameByteArray);
		answerByteArray.set(new Uint8Array(this.data), 10);

		const answerBuffer = answerByteArray.buffer;
		answerBuffer.setUint16(offset, this.type);
		answerBuffer.setUint16(offset + 2, this.class);
		answerBuffer.setUint16(offset + 4, this.TTL);
		answerBuffer.setUint16(offset + 8, this.length);

		return answerBuffer;
	}
}

