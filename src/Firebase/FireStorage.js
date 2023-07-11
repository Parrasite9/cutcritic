import { getStorage } from 'firebase/storage';
import { firebaseApp } from './Firebase';

// Initialize Firebase Storage
const storage = getStorage(firebaseApp);

// Export the storage instance and any other necessary functions
export { storage };
