const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./ecom-1001a-firebase-adminsdk-s4rml-fd87033957.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const products = [
  {
    image: 'https://source.unsplash.com/featured/?men,formal-shirt',
    title: 'Formal Shirt',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'https://source.unsplash.com/featured/?men,casual-shirt',
    title: 'Casual Shirt',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'https://source.unsplash.com/featured/?men,denim-shirt',
    title: 'Denim Shirt',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'https://source.unsplash.com/featured/?men,linen-shirt',
    title: 'Linen Shirt',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'https://source.unsplash.com/featured/?men,chinos',
    title: 'Chinos',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'https://source.unsplash.com/featured/?men,jeans',
    title: 'Jeans',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'https://source.unsplash.com/featured/?men,joggers',
    title: 'Joggers',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'https://source.unsplash.com/featured/?men,dress-pants',
    title: 'Dress Pants',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
    category: 'men',
  },
  {
    image: 'https://source.unsplash.com/featured/?women,formal-dress',
    title: 'Formal Dress',
    price: 'A$79.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'https://source.unsplash.com/featured/?women,casual-dress',
    title: 'Casual Dress',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'https://source.unsplash.com/featured/?women,denim-jacket',
    title: 'Denim Jacket',
    price: 'A$89.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'https://source.unsplash.com/featured/?women,linen-top',
    title: 'Linen Top',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'https://source.unsplash.com/featured/?women,skirt',
    title: 'Skirt',
    price: 'A$39.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'https://source.unsplash.com/featured/?women,jeans',
    title: 'Jeans',
    price: 'A$69.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'https://source.unsplash.com/featured/?women,joggers',
    title: 'Joggers',
    price: 'A$49.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
  {
    image: 'https://source.unsplash.com/featured/?women,pants',
    title: 'Pants',
    price: 'A$59.99',
    sizes: ['S', 'M', 'L'],
    category: 'women',
  },
];

const addProductsToFirestore = async () => {
  const productsRef = db.collection('products');
  await productsRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref.delete();
    });
  });
  for (let product of products) {
    await productsRef.add(product);
  }
  console.log('Products added successfully');
};

addProductsToFirestore().catch(err => console.error('Error adding products:', err));
