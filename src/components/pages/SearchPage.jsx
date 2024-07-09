import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../Navbar';
import Footer from '../Footer';
import searchProducts from '../../services/searchProducts';
import PromoBar from '../PromoBar';

const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const SearchPage = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchProducts(query);
        setSearchResults(results);
      } catch (err) {
        setError('Error fetching search results');
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <PromoBar />
      <NavBar />
      <div className="container mx-auto mt-40 pt-20 pb-20 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-center">Search Results for "{query}"</h1>
        {searchResults.length > 0 ? (
          <ul className="space-y-4">
            {searchResults.map((result) => (
              <Link 
                key={result.id} 
                to={`/product/${encodeURIComponent(result.title.toLowerCase().replace(/\s+/g, '-'))}`}
                className="block"
              >
                <li className="flex items-center p-4 bg-white shadow rounded-lg hover:bg-gray-100">
                  <img src={result.mainImage} alt={result.title} className="w-20 h-20 object-cover rounded mr-4" />
                  <span className="text-lg font-semibold">{result.title}</span>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-center text-xl">No results found for "{query}".</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
