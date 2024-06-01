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
    images: ['casualdress.jpg', 'casualdress2.jpg', 'casualdress3.jpg'],
    title: 'Casual Dress',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
    brand: 'H&M',
    description: 'A relaxed casual dress ideal for daily wear.',
    material: 'Cotton, Polyester',
    careInstructions: 'Machine wash, cold',
  },
  {
    images: ['formalshirt.jpg', 'formalshirt2.jpg', 'formalshirt3.jpg'],
    title: 'Formal Shirt',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
    brand: 'Ralph Lauren',
    description: 'A stylish formal shirt perfect for office wear.',
    material: 'Cotton, Polyester',
    careInstructions: 'Machine wash, cold',
  },
  {
    images: ['casualshirt.jpg', 'casualshirt2.jpg', 'casualshirt3.jpg'],
    title: 'Casual Shirt',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
    brand: 'Tommy Hilfiger',
    description: 'A comfortable casual shirt ideal for everyday wear.',
    material: 'Cotton, Polyester',
    careInstructions: 'Machine wash, warm',
  },
  {
    images: ['denimshirt.jpg', 'denimshirt2.jpg', 'denimshirt3.jpg'],
    title: 'Denim Shirt',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
    brand: 'Levi\'s',
    description: 'A rugged denim shirt that combines style with durability.',
    material: 'Denim',
    careInstructions: 'Machine wash, cold, tumble dry low',
  },
  {
    images: ['linenshirt.jpg', 'linenshirt2.jpg', 'linenshirt3.jpg'],
    title: 'Linen Shirt',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
    brand: 'Banana Republic',
    description: 'A lightweight linen shirt perfect for warm weather.',
    material: 'Linen',
    careInstructions: 'Hand wash, line dry',
  },
  {
    images: ['chinos.jpg', 'chinos2.jpg', 'chinos3.jpg'],
    title: 'Chinos',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
    brand: 'Dockers',
    description: 'Versatile chinos that can be dressed up or down for any occasion.',
    material: 'Cotton, Spandex',
    careInstructions: 'Machine wash, warm, tumble dry medium',
  },
  {
    images: ['Jeansmen.jpg', 'Jeansmen2.jpg', 'Jeansmen3.jpg'],
    title: 'Jeans',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
    brand: 'Wrangler',
    description: 'Classic jeans with a comfortable fit and timeless style.',
    material: 'Denim',
    careInstructions: 'Machine wash, cold, tumble dry low',
  },
  {
    images: ['Joggersmen.jpg', 'Joggersmen2.jpg', 'Joggersmen3.jpg'],
    title: 'Joggers',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
    brand: 'Nike',
    description: 'Comfortable joggers ideal for workouts or casual wear.',
    material: 'Cotton, Polyester',
    careInstructions: 'Machine wash, cold, tumble dry low',
  },
  {
    images: ['dresspants.jpg', 'dresspants2.jpg', 'dresspants3.jpg'],
    title: 'Dress Pants',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
    brand: 'Hugo Boss',
    description: 'Elegant dress pants suitable for formal occasions.',
    material: 'Polyester, Rayon',
    careInstructions: 'Dry clean only',
  },
  {
    images: ['formadress.jpg', 'formadress2.jpg', 'formadress3.jpg'],
    title: 'Formal Dress',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
    brand: 'Zara',
    description: 'A chic formal dress perfect for evening events.',
    material: 'Silk, Polyester',
    careInstructions: 'Dry clean only',
  },
  {
    images: ['denimjacket.jpg', 'denimjacket2.jpg', 'denimjacket3.jpg'],
    title: 'Denim Jacket',
    price: 'A$89.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
    brand: 'Levi\'s',
    description: 'A stylish denim jacket that adds a cool edge to any outfit.',
    material: 'Denim',
    careInstructions: 'Machine wash, cold, tumble dry low',
  },
  {
    images: ['linentop.jpg', 'linentop2.jpg', 'linentop3.jpg'],
    title: 'Linen Top',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
    brand: 'Uniqlo',
    description: 'A breezy linen top perfect for summer days.',
    material: 'Linen',
    careInstructions: 'Hand wash, line dry',
  },
  {
    images: ['skirt.jpeg', 'skirt2.jpg', 'skirt3.jpg'],
    title: 'Skirt',
    price: 'A$39.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
    brand: 'Forever 21',
    description: 'A versatile skirt that can be dressed up or down.',
    material: 'Cotton, Polyester',
    careInstructions: 'Machine wash, warm',
  },
  {
    images: ['jeanswomen.jpg', 'jeanswomen2.jpg', 'jeanswomen3.jpg'],
    title: 'Jeans',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
    brand: 'GAP',
    description: 'Classic jeans with a comfortable fit and timeless style.',
    material: 'Denim',
    careInstructions: 'Machine wash, cold, tumble dry low',
  },
  {
    images: ['joggerswomen.jpg', 'joggerswomen2.jpg', 'joggerswomen3.jpg'],
    title: 'Joggers',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
    brand: 'Adidas',
    description: 'Comfortable joggers ideal for workouts or casual wear.',
    material: 'Cotton, Polyester',
    careInstructions: 'Machine wash, cold, tumble dry low',
  },
  {
    images: ['pants.jpg', 'pants2.jpg', 'pants3.jpg'],
    title: 'Pants',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
    brand: 'Nike',
    description: 'Versatile pants that can be dressed up or down for any occasion.',
    material: 'Cotton, Spandex',
    careInstructions: 'Machine wash, warm, tumble dry medium',
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
    const imageUrls = [];
    for (let image of product.images) {
      const imagePath = path.join(imageFolderPath, image);
      const downloadURL = await uploadImage(imagePath, image);
      imageUrls.push(downloadURL);
    }
    updatedProducts.push({ ...product, images: imageUrls, mainImage: imageUrls[0] });
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
