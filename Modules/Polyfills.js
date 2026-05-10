export const applyPolyfills = () => {
	if (!Uint8Array.fromBase64) {
		Uint8Array.fromBase64 = (base64Data) => {
			return new TextEncoder().encode(atob(base64Data));
		}
	}
}

