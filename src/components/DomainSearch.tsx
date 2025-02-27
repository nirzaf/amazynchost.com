import { useState } from 'react';
import '../styles/DomainSearch.css';

const domainExtensions = ['.com', '.net', '.org', '.io'];

const DomainSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ domain: string, available: boolean, price: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const results = domainExtensions.map(ext => ({
        domain: `${searchTerm}${ext}`,
        available: Math.random() > 0.3, // Random availability for demo
        price: `$${(Math.random() * 10 + 8).toFixed(2)}`
      }));
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="domain-search-container">
      <div className="domain-search-content">
        <h2>Find Your Perfect Domain Name</h2>
        <p>Search for your new domain and secure it before someone else does</p>
        
        <form onSubmit={handleSearch} className="domain-search-form">
          <div className="search-input-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter your domain name..."
              className="domain-search-input"
            />
            <button type="submit" className="domain-search-button" disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <div className="domain-results">
            {searchResults.map((result, index) => (
              <div key={index} className={`domain-result-item ${result.available ? 'available' : 'unavailable'}`}>
                <div className="domain-name">{result.domain}</div>
                <div className="domain-status">
                  {result.available ? (
                    <>
                      <span className="status-badge available">Available</span>
                      <span className="domain-price">{result.price}/yr</span>
                    </>
                  ) : (
                    <span className="status-badge unavailable">Unavailable</span>
                  )}
                </div>
                {result.available && (
                  <button className="add-to-cart-btn">Add to Cart</button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="popular-extensions">
          <div className="extension-item">
            <span className="extension-name">.com</span>
            <span className="extension-price">$9.99/yr</span>
          </div>
          <div className="extension-item">
            <span className="extension-name">.net</span>
            <span className="extension-price">$8.99/yr</span>
          </div>
          <div className="extension-item">
            <span className="extension-name">.org</span>
            <span className="extension-price">$10.99/yr</span>
          </div>
          <div className="extension-item">
            <span className="extension-name">.io</span>
            <span className="extension-price">$29.99/yr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSearch;
