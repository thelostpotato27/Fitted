import {imgDB, txtDB } from "../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs  } from "firebase/firestore"

async function fetchqueryData() {
  const collectionRef = collection(txtDB, "Clothing-item");
  const q = query(collectionRef, limit(5));
  const items = [];

  await getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const allreviews = collection(txtDB, "Clothing-item", doc.id, "reviews")
      const firstreview = query(allreviews)
      getDocs(firstreview).then((reviewSnapshot) => {
        reviewSnapshot.forEach((doc2) => {
          const imgref = ref(imgDB, `Imgs/${doc2.data().image}`);
          getDownloadURL(imgref).then(val => {
            items.push({image: val, review: doc2.data(), header: doc.data()});
          }).catch(error => {
            console.error("Error getting download URL:", error);
          });
        })
      })
    });
    console.log("First 5 items:", items);
    console.log("type of item: ", (typeof items))
  })

  return items
}

export default fetchqueryData;