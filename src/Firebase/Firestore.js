import { collection, addDoc } from 'firebase/firestore';

export async function addUser(firstName, lastName, birthYear) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: firstName,
          last: lastName,
          born: birthYear,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}