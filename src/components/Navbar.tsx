"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition duration-500 ${scrolled
                ? "bg-gray-900/70 backdrop-blur-md shadow-md"
                : "bg-gray-900/40 backdrop-blur-sm"
                }`}
        >
            <div className="flex justify-center items-center px-6 py-4">
                <button
                    onClick={() => setOpen(!open)}
                    className="text-gray-300 focus:outline-none md:hidden"
                >
                    ☰
                </button>
                <ul className="hidden md:flex space-x-8 font-medium tracking-wide">
                    <li><Link href="/" className="relative text-gray-300 hover:text-white after:content-[''] after:block after:w-0 after:h-[2px] after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full">Home</Link></li>
                    <li><Link href="/projects" className="relative text-gray-300 hover:text-white after:content-[''] after:block after:w-0 after:h-0.5 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full">Projects</Link></li>
                    <li><Link href="/about" className="relative text-gray-300 hover:text-white after:content-[''] after:block after:w-0 after:h-0.5 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full">About</Link></li>
                    <li><Link href="/contact" className="relative text-gray-300 hover:text-white after:content-[''] after:block after:w-0 after:h-0.5 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full">Contact</Link></li>
                </ul>
            </div>
            {open && (
                <div className="flex flex-col items-center space-y-4 py-4 md:hidden">
                    <Link href="/">Home</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>)}
        </nav>
    );
}
