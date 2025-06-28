import { INodeType, INodeTypeDescription, IExecuteFunctions } from 'n8n-workflow';
import admin from 'firebase-admin';
import { firebaseConfig } from './helpers/firebase';

export class FirebaseCreateUser implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Firebase Create User',
		name: 'firebaseCreateUser',
		group: ['transform'],
		version: 1,
		description: 'Create a user in Firebase Authentication',
		defaults: {
			name: 'Firebase Create User',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				required: true,
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				default: '',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions) {
		if (!admin.apps.length) {
			admin.initializeApp({
				credential: admin.credential.cert(firebaseConfig),
			});
		}

		const items = this.getInputData();
		const returnData = [];

		for (let i = 0; i < items.length; i++) {
			const email = this.getNodeParameter('email', i) as string;
			const password = this.getNodeParameter('password', i) as string;

			try {
				const userRecord = await admin.auth().createUser({ email, password });
				returnData.push({ json: userRecord });
			} catch (error: any) {
				returnData.push({ json: { error: error.message || error.toString() } });
			}
		}

		return returnData;
	}
}
