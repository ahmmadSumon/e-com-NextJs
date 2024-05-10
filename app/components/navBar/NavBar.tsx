"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo/beti.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import useCartStore from "../../store/page";
import { NextPage } from "next";

interface NavPageProps {}

interface Item {
  title: string;
  price: number;
  quantity: number;
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
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const items: Item[] = useCartStore((state) => state.items);

  // Function to handle search input change
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

            <span className="cursor-pointer">
              <VscAccount className="navIcon text-2xl" />
            </span>
          </div>

          <nav className="hidden lg:flex justify-center items-center flex-1">
            <div className="flex justify-center items-center w-full">
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
              {categories.map((category, index) => (
                <li key={index}>
                  <Link href={category.route}>
                    <a>{category.name}</a>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cart">
                  <MdOutlineShoppingCart className="navIcon text-2xl" />
                  Cart
                  <span className="absolute top-0 right-0 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                    {items.length}
                  </span>
                </Link>
              </li>
              <li>
                <span>
                  <VscAccount className="navIcon text-2xl" />
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;
