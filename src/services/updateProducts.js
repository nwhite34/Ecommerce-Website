const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const db = getFirestore();
const storage = getStorage().bucket(process.env.FIREBASE_STORAGE_BUCKET);

const products = [
  {
    image: 'images/formalshirt.jpg',
    title: 'Formal Shirt',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'images/casualshirt.jpg',
    title: 'Casual Shirt',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'images/denimshirt.jpg',
    title: 'Denim Shirt',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'images/linenshirt.jpg',
    title: 'Linen Shirt',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'images/chinos.jpg',
    title: 'Chinos',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'images/Jeansmen.jpg',
    title: 'Jeans',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'images/Joggersmen.jpg',
    title: 'Joggers',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'images/dresspants.jpg',
    title: 'Dress Pants',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'images/formadress.jpg',
    title: 'Formal Dress',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'images/casualdress.jpg',
    title: 'Casual Dress',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'images/decomjacket.jpg',
    title: 'Denim Jacket',
    price: 'A$89.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'images/linentop.jpg',
    title: 'Linen Top',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'images/skirt.jpeg',
    title: 'Skirt',
    price: 'A$39.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'images/jeanswomen.jpg',
    title: 'Jeans',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'images/joggerswomen.jpg',
    title: 'Joggers',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'images/pants.jpg',
    title: 'Pants',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
];

const uploadImage = async (filePath, fileName) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileRef = storage.file(`products/${fileName}`);
    await fileRef.save(fileBuffer);
    const downloadURL = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/products/${fileName}`;
    console.log(`Uploaded ${fileName} to ${downloadURL}`);
    return downloadURL;
  } catch (error) {
    console.error(`Error uploading ${fileName}:`, error);
    throw error;
  }
};

const updateProducts = async () => {
  const imageFolderPath = path.resolve(__dirname, '../images');
  const updatedProducts = [];

  for (let product of products) {
    const imagePath = path.join(imageFolderPath, path.basename(product.image));
    const downloadURL = await uploadImage(imagePath, path.basename(product.image));
    updatedProducts.push({ ...product, image: downloadURL });
  }

  const productsRef = db.collection('products');

  // Clear existing products
  await productsRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    });
  });

  // Add new products
  for (let product of updatedProducts) {
    await productsRef.add(product);
  }
  console.log('Products updated successfully');
};

updateProducts().catch(err => console.error('Error updating products:', err));
