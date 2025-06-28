import {
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	generateFirebaseCustomToken,
} from './GenericFunctions';

export class GenerateJWT implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Generate JWT',
		name: 'generateJwt',
		group: ['transform'],
		version: 1,
		description: 'Generates a Firebase JWT for a user ID',
		defaults: {
			name: 'Generate JWT',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				required: true,
				description: 'Firebase user ID for whom to generate the JWT',
			},
			{
				displayName: 'Private Key',
				name: 'privateKey',
				type: 'string',
				default: '',
				required: true,
				description: 'Private key from Firebase service account',
			},
			{
				displayName: 'Client Email',
				name: 'clientEmail',
				type: 'string',
				default: '',
				required: true,
				description: 'Client email from Firebase service account',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const userId = this.getNodeParameter('userId', i) as string;
			const privateKey = this.getNodeParameter('privateKey', i) as string;
			const clientEmail = this.getNodeParameter('clientEmail', i) as string;

			const token = await generateFirebaseCustomToken(userId, privateKey, clientEmail);

			returnData.push({
				json: {
					token,
				},
			});
		}

		return [returnData];
	}
}
