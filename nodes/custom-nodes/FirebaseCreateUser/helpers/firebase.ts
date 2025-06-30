import * as admin from 'firebase-admin';
import serviceAccount from '../../../service-account.json';

// Initialize the Firebase app only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const firebaseConfig = admin;
