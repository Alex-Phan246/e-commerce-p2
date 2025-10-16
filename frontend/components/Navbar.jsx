"use client"
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Link from "next/link"
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import "../styles/Navbar.css";
import { assets } from "../assets/assets";

const NavbarContent = () => {
  const searchParams = useSearchParams();
  const { 
    isSeller, 
    user, 
    router, 
    getCartCount, 
    logoutUser,
    fetchProducts
  } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchFromUrl = searchParams?.get('search') || '';
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  const handleSearchInput = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length >= 2) {
      setIsSearching(true);
      try {
        const response = await fetchProducts({ 
          search: query.trim(), 
          limit: 5 
        });
        if (response && response.data) {
          setSearchSuggestions(response.data);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSearchSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/all-products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    } else {
      router.push('/all-products');
      setShowSuggestions(false);
    }
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleUserMenuClick = () => {
    if (!user) {
      router.push('/login');
    } else {
      setShowUserMenu(!showUserMenu);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logoutUser();
      setShowUserMenu(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar-user-menu-container')) {
        setShowUserMenu(false);
      }
      if (!event.target.closest('.navbar-search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar-container">
      <Image
        className="navbar-logo"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
        width={128}
        height={40}
      />
      <div className="navbar-links">
        <Link href="/" className="navbar-link">
          Home
        </Link>
        <Link href="/all-products" className="navbar-link">
          Shop
        </Link>
        <Link href="/" className="navbar-link">
          About Us
        </Link>
        <Link href="/" className="navbar-link">
          Contact
        </Link>

        {isSeller && (
          <button onClick={() => router.push('/seller')} className="navbar-seller-btn">
            Seller Dashboard
          </button>
        )}
      </div>

      <div className="navbar-actions">
        <div className="navbar-search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInput}
              placeholder="Search products..."
              className="search-input"
              suppressHydrationWarning={true}
            />
            <button type="submit" className="search-btn" suppressHydrationWarning={true}>
              <Image src={assets.search_icon} alt="search icon" className="search-icon" width={18} height={18} />
            </button>
          </form>
          
          {showSuggestions && searchQuery.trim().length >= 2 && (
            <div className="search-suggestions">
              {isSearching ? (
                <div className="suggestion-loading">
                  <span>Searching...</span>
                </div>
              ) : searchSuggestions.length > 0 ? (
                <>
                  {searchSuggestions.map((product) => (
                    <div
                      key={product.id}
                      className="suggestion-item"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <Image 
                        src={product.image?.[0] || '/placeholder.png'} 
                        alt={product.name}
                        className="suggestion-image"
                        width={40}
                        height={40}
                      />
                      <div className="suggestion-info">
                        <div className="suggestion-name">{product.name}</div>
                        <div className="suggestion-price">
                          {product.offerPrice ? (
                            <>
                              <span className="offer-price">${product.offerPrice}</span>
                              <span className="original-price">${product.price}</span>
                            </>
                          ) : (
                            <span>${product.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div 
                    className="suggestion-view-all"
                    onClick={() => {
                      router.push(`/all-products?search=${encodeURIComponent(searchQuery.trim())}`);
                      setShowSuggestions(false);
                    }}
                  >
                    View all results for "{searchQuery}"
                  </div>
                </>
              ) : (
                <div className="no-suggestions">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="navbar-cart-container">
          <Image
            className="navbar-cart-icon"
            onClick={() => router.push('/cart')}
            src={assets.cart_icon}
            alt="cart"
            width={24}
            height={24}
          />
          {getCartCount() > 0 && (
            <span className="navbar-cart-count">{getCartCount()}</span>
          )}
        </div>

        <div className="navbar-user-menu-container">
          <Image
            className="navbar-user-icon"
            onClick={handleUserMenuClick}
            src={assets.user_icon}
            alt="user"
            width={24}
            height={24}
          />
          {showUserMenu && (
            <div className="navbar-user-menu">
              {user ? (
                <>
                  <div className="user-menu-header">
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <div className="user-menu-items">
                    <button onClick={() => { router.push('/account'); setShowUserMenu(false); }} className="user-menu-item">
                      My Account
                    </button>
                    <button onClick={() => { router.push('/orders'); setShowUserMenu(false); }} className="user-menu-item">
                      My Orders
                    </button>
                    <button onClick={handleLogout} className="user-menu-item logout">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="user-menu-items">
                  <button onClick={() => { router.push('/login'); setShowUserMenu(false); }} className="user-menu-item">
                    Login
                  </button>
                  <button onClick={() => { router.push('/register'); setShowUserMenu(false); }} className="user-menu-item">
                    Register
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Navbar = () => {
  return (
    <React.Suspense fallback={<nav className="navbar-container">Loading...</nav>}>
      <NavbarContent />
    </React.Suspense>
  );
};

export default Navbar;