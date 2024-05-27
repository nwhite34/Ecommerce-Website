const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./ecom-1001a-firebase-adminsdk-s4rml-fd87033957.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const removeDuplicates = async () => {
  const productsRef = db.collection('products');
  const snapshot = await productsRef.get();

  const productsMap = new Map();
  const duplicates = [];

  snapshot.forEach(doc => {
    const product = doc.data();
    const key = `${product.title}_${product.category}`;

    if (productsMap.has(key)) {
      duplicates.push(doc.id);
    } else {
      productsMap.set(key, doc.id);
    }
  });

  for (const duplicateId of duplicates) {
    await productsRef.doc(duplicateId).delete();
    console.log(`Deleted duplicate product with ID: ${duplicateId}`);
  }

  console.log(`Removed ${duplicates.length} duplicate products`);
};

removeDuplicates().catch(err => console.error('Error removing duplicates:', err));
