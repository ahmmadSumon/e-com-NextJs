import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                {/* Footer content */}
                <div className="flex flex-wrap justify-between items-center">
                    {/* Contact information */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <p className="mb-2">123 Main Street</p>
                        <p className="mb-2">City, State, ZIP</p>
                        <p className="mb-2">Phone: (123) 456-7890</p>
                        <p>
                            Email: 
                            <Link href="mailto:support@example.com" passHref>
                                <span className="text-blue-400 cursor-pointer">support@example.com</span>
                            </Link>
                        </p>
                    </div>

                    {/* Quick links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about">
                                    <span className="hover:text-gray-400 cursor-pointer">About Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop">
                                    <span className="hover:text-gray-400 cursor-pointer">Shop</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    <span className="hover:text-gray-400 cursor-pointer">Contact</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq">
                                    <span className="hover:text-gray-400 cursor-pointer">FAQ</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social media links */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" passHref>
                                <span target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-400 cursor-pointer" aria-label="Facebook">
                                    <FaFacebook />
                                </span>
                            </Link>
                            <Link href="https://twitter.com" passHref>
                                <span target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-400 cursor-pointer" aria-label="Twitter">
                                    <FaTwitter />
                                </span>
                            </Link>
                            <Link href="https://instagram.com" passHref>
                                <span target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-400 cursor-pointer" aria-label="Instagram">
                                    <FaInstagram />
                                </span>
                            </Link>
                            <Link href="https://youtube.com" passHref>
                                <span target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-400 cursor-pointer" aria-label="YouTube">
                                    <FaYoutube />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Footer bottom */}
                <div className="mt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Your E-Commerce. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
