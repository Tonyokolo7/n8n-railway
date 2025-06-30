import { IExecuteFunctions } from 'n8n-workflow';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { admin } from './helpers/firebase';

export class FirebaseCreateUser implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Firebase Create User',
    name: 'firebaseCreateUser',
    group: ['transform'],
    version: 1,
    description: 'Creates a new user in Firebase Authentication',
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
        description: 'Email address of the new user',
      },
      {
        displayName: 'Password',
        name: 'password',
        type: 'string',
        default: '',
        required: true,
        description: 'Password for the new user',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const email = this.getNodeParameter('email', i) as string;
      const password = this.getNodeParameter('password', i) as string;

      try {
        const userRecord = await admin.auth().createUser({ email, password });
        returnData.push({ json: { uid: userRecord.uid, email: userRecord.email } });
      } catch (error: unknown) {
        returnData.push({
          json: {
            error: (error as Error).message,
          },
        });
      }
    }

    return [returnData];
  }
}
