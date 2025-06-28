import * as admin from 'firebase-admin';

// Replace with the actual contents or secure loading of your service account
const serviceAccount = {
  type: 'service_account',
  project_id: 'smarthelper-cfc87',
  private_key_id: 'YOUR_PRIVATE_KEY_ID',
  private_key: '-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-fbsvc@smarthelper-cfc87.iam.gserviceaccount.com',
  client_id: 'YOUR_CLIENT_ID',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'YOUR_CLIENT_CERT_URL',
};

let initialized = false;

export const initializeAppIfNeeded = () => {
  if (!initialized) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    initialized = true;
  }
};

export { admin };
