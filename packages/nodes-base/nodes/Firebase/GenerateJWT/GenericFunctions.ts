import * as jwt from 'jsonwebtoken';

export function generateFirebaseCustomToken(
	uid: string,
	privateKey: string,
	clientEmail: string,
): Promise<string> {
	const now = Math.floor(Date.now() / 1000);
	const payload = {
		iss: clientEmail,
		sub: clientEmail,
		aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
		iat: now,
		exp: now + 60 * 60,
		uid,
	};

	const options = {
		algorithm: 'RS256' as const,
	};

	return new Promise((resolve, reject) => {
		jwt.sign(payload, privateKey, options, (err, token) => {
			if (err || !token) {
				reject(err || new Error('Token generation failed'));
			} else {
				resolve(token);
			}
		});
	});
}
