import { db } from '@/firebase/client'; // adjust based on your Firebase init file
import { doc, updateDoc } from 'firebase/firestore';

/**
 * Update user name in Firebase Firestore
 */
export const updateUserName = async (uid: string, newName: string) => {
    if (!uid) throw new Error('No user ID provided');
    
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        name: newName
    });
};
