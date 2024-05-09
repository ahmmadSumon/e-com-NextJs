"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi"; 
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart, MdOutlineAccountCircle } from "react-icons/md";
import { VscSignIn, VscAccount } from "react-icons/vsc";
import { RiCustomerService2Fill } from "react-icons/ri";
import { TbReorder } from "react-icons/tb";
import Button from "@mui/material/Button";
import Image from "next/image";
import logo from "../../../public/logo/beti.png";
import useCartStore from "../../store/page";
import DropDown from "../dropDown/DropDown";
import { NextPage } from "next";

interface NavPageProps {
  // Define any props your home page component expects here
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (index: number) => void;
  incrementQuantity: (index: number) => void;
  decrementQuantity: (index: number) => void;
  clearCart: () => void;
}

const NavBar: NextPage<NavPageProps> = () => {
  const [categories] = useState([
    { name: "Home", route: "/" },
    { name: "Men's Collection", route: "/menscollection" },
    { name: "Women's Collection", route: "/womenscollection" },
    { name: "Women's Jewelry", route: "/womensjewelery" },
    { name: "Electronic Products", route: "/electronics" },
    { name: "About", route: "/about" },
    { name: "Cart", route: "/cart" },
  ]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  const items = useCartStore((state) => state.items);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    // Function to fetch search results from API
    const fetchSearchResults = async () => {
      try {
        // Make a request to your API endpoint with the search query
        console.log("Fetching search results for query:", searchQuery);
        const response = await fetch(`https://fakestoreapi.com/products?query=${searchQuery}`);
        const data = await response.json();
        console.log("Search results:", data);
        setSearchResults(data); // Update search results state with the fetched data
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
  
    // Fetch search results only if search query is not empty
    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear search results if search query is empty
    }
  }, [searchQuery]);

  // Function to close mobile menu
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="logo">
            <Link href={"/"}>
              <Image className="w-[280px]" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="flex items-center space-x-4 lg:hidden">
            <Link href="/cart" className="relative">
              <MdOutlineShoppingCart className="navIcon text-2xl" />
              <span className="absolute bottom-5 left-2 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                {items.length}
              </span>
            </Link>

            <span
              className="cursor-pointer"
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            >
              <VscAccount className="navIcon text-2xl" />
            </span>

            <button
              className="focus:outline-none text-gray-600"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <HiX className="text-2xl" />
              ) : (
                <HiOutlineMenuAlt3 className="text-2xl" />
              )}
              <span className="sr-only">Toggle Mobile Menu</span>
            </button>
          </div>

          <nav className="hidden lg:flex justify-center items-center flex-1">
            <div className="flex justify-center items-center w-full">
              <DropDown placeholder="Main menu" data= {categories.map((category, index) => (
                <li key={index}>
                  <Link href={category.route} onClick={handleMenuItemClick}>
                    {category.name}
                  </Link>
                </li>
              ))}/>
              <div className="flex items-center ml-2 border p-2 rounded-md">
                <input
                  type="text"
                  className="outline-none"
                  placeholder="Search your products"
                  value={searchQuery} // Bind searchQuery state to input value
                  onChange={handleSearchInputChange} // Handle input change
                />
                <CiSearch className="text-gray-500" />
              </div>
            </div>

            <ul className="flex space-x-4">
              <li className="relative">
                <Link href="/cart">
                  <MdOutlineShoppingCart className="navIcon text-2xl" />
                  Cart
                  <span className="absolute top-0 right-0 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                    {items.length}
                  </span>
                </Link>
              </li>
              <li>
                <span
                  className="cursor-pointer"
                  onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                >
                  <VscAccount className="navIcon" />
                  Account
                </span>
                {isDropDownOpen && (
                  <ul className="absolute bg-white shadow-md mt-2 rounded-md">
                    <li>
                      <Button>
                        <MdOutlineAccountCircle /> Account
                      </Button>
                    </li>
                    <li>
                      <Button>
                        <TbReorder /> Claim Order
                      </Button>
                    </li>
                    <li>
                      <Button>
                        <RiCustomerService2Fill /> Services
                      </Button>
                    </li>
                    <li>
                      <Button>
                        <VscSignIn /> Sign Up
                      </Button>
                    </li>
                    <li>
                      <Button>Log Out</Button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>

        {isMobileMenuOpen && (
          <nav
            className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md mt-2 z-50"
            style={{ width: "80%" }}
          >
            <div className="container mx-auto p-4">
              <ul className="space-y-4">
                <li>
                  <div className="flex items-center border p-2 rounded-md">
                    <input
                      type="text"
                      className="outline-none"
                      placeholder="Search your products"
                      value={searchQuery} // Bind searchQuery state to input value
                      onChange={handleSearchInputChange} // Handle input change
                    />
                    <CiSearch className="text-gray-500" />
                  </div>
                </li>
                <li className="relative">
                  <Link href="/cart">
                    <MdOutlineShoppingCart className="navIcon" />
                    Cart
                    <span className="absolute top-0 right-0 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                      {items.length}
                    </span>
                  </Link>
                </li>
                <li>
                  <span
                    className="cursor-pointer"
                    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                  >
                    <VscAccount className="navIcon" />
                    Account
                  </span>
                  {isDropDownOpen && (
                    <ul className="absolute bg-white shadow-md mt-2 rounded-md">
                      <li>
                        <Button>
                          <MdOutlineAccountCircle /> Account
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <TbReorder /> Claim Order
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <RiCustomerService2Fill /> Services
                        </Button>
                      </li>
                      <li>
                        <Button>
                          <VscSignIn /> Sign Up
                        </Button>
                      </li>
                      <li>
                        <Button>Log Out</Button>
                      </li>
                    </ul>
                  )}
                </li>
                <li onClick={closeMobileMenu}>
                  <Link href="/about">About</Link>
                </li>
                <li onClick={closeMobileMenu}>
                  <Link href="/menscollection">Men's Collection</Link>
                </li>
                <li onClick={closeMobileMenu}>
                  <Link href="/womenscollection">Women's Collection</Link>
                </li>
                <li onClick={closeMobileMenu}>
                  <Link href="/womensjewelery">Womens Jewelery</Link>
                </li>
                <li onClick={closeMobileMenu}>
                  <Link href="/electronics">Electrics</Link>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default NavBar;
