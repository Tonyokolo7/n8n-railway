import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IDataObject,
} from 'n8n-workflow';

import { firebaseConfig } from './helpers/firebase';
import * as admin from 'firebase-admin';

let firebaseInitialized = false;

export class FirebaseCreateUser implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Firebase Create User',
    name: 'firebaseCreateUser',
    group: ['transform'],
    version: 1,
    description: 'Creates a new Firebase Auth user',
    defaults: {
      name: 'FirebaseCreateUser',
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

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    if (!firebaseInitialized) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
      });
      firebaseInitialized = true;
    }

    for (let i = 0; i < items.length; i++) {
      const email = this.getNodeParameter('email', i) as string;
      const password = this.getNodeParameter('password', i) as string;

      try {
        const userRecord = await admin.auth().createUser({
          email,
          password,
        });

        returnData.push({ json: userRecord as unknown as IDataObject });
      } catch (error) {
        returnData.push({ json: { error: (error as Error).message } });
      }
    }

    return [returnData];
  }
}
