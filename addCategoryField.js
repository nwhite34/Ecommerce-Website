const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./ecom-1001a-firebase-adminsdk-s4rml-fd87033957.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function addCategoryField() {
  const productsRef = db.collection('products');
  const snapshot = await productsRef.get();

  snapshot.forEach(doc => {
    const product = doc.data();
    let category = '';

    // Determine category based on product title or other criteria
    if (product.title.toLowerCase().includes('shirt')) {
      category = 'men';
    } else if (product.title.toLowerCase().includes('dress') || product.title.toLowerCase().includes('skirt') || product.title.toLowerCase().includes('top') || product.title.toLowerCase().includes('jeans')) {
      category = 'women';
    } else {
      // If category can't be determined, default to 'unisex'
      category = 'unisex';
    }

    // Update document with category field
    doc.ref.update({ category })
      .then(() => {
        console.log(`Document ${doc.id} updated with category: ${category}`);
      })
      .catch((error) => {
        console.error(`Error updating document ${doc.id}: `, error);
      });
  });
}

addCategoryField();
