import React, { useState } from "react";
import Link from "next/link";
import { auth, provider } from "../firebase/firebase";
import { Search, Menu, X } from "lucide-react";
import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectuser } from "@/Feature/Userslice";
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const user = useSelector(selectuser);
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlelogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success(t('navbar.loginSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(t('navbar.loginFailed'));
    }
  };

  const handlelogout = () => {
    signOut(auth);
  };

  const navLinks = [
    { href: "/internship", label: t('navbar.internships') },
    { href: "/job", label: t('navbar.jobs') },
    { href: "/language", label: t('navbar.languageSettings') },
    { href: "/resume", label: t('navbar.resumeCreation') },
    { href: "/forgotpassword", label: t('navbar.forgotPassword') },
    { href: "/publicspace", label: t('navbar.publicSpace') },
    { href: "/systemInfo", label: t('navbar.systemInfo') },
    { href: "/membership", label: t('navbar.membershipPlan') },
  ];

  return (
    <div className="relative">
      <nav className="bg-white shadow-md">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-xl font-bold text-blue-600">
                <img src={"/logo.png"} alt="Logo" className="h-16" />
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-gray-700 hover:text-blue-600 text-sm whitespace-nowrap cursor-pointer">{link.label}</span>
                </Link>
              ))}
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder={t('navbar.searchPlaceholder')}
                  className="text-gray-600 ml-2 bg-transparent focus:outline-none text-sm w-32 xl:w-48"
                />
              </div>
            </div>

            {/* Auth Buttons + Mobile Menu Toggle */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop auth buttons - hidden on small screens */}
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <Link href={"/profile"}>
                      <img src={user.photo} alt="" className="w-8 h-8 rounded-full cursor-pointer" />
                    </Link>
                    <button
                      className="text-gray-700 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm"
                      onClick={handlelogout}
                    >
                      {t('navbar.logout')}
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handlelogin}
                      className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 flex items-center space-x-2 hover:bg-gray-50 text-sm"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <span className="text-gray-700 whitespace-nowrap">{t('navbar.continueWithGoogle')}</span>
                    </button>
                    <Link href="/adminlogin" className="text-gray-600 hover:text-gray-800 text-sm whitespace-nowrap">
                      {t('navbar.admin')}
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile menu toggle button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="border-t border-gray-100 my-2" />
              {/* Search in mobile */}
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 mx-1">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder={t('navbar.searchPlaceholder')}
                  className="text-gray-600 ml-2 bg-transparent focus:outline-none text-sm w-full"
                />
              </div>
              {/* Auth buttons in mobile */}
              <div className="px-1 pt-2 pb-3">
                {user ? (
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <img src={user.photo} alt="" className="w-8 h-8 rounded-full" />
                    <span className="text-sm font-medium text-gray-700 truncate">{user.email}</span>
                    <button
                      className="ml-auto text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm"
                      onClick={() => { handlelogout(); setMobileMenuOpen(false); }}
                    >
                      {t('navbar.logout')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => { handlelogin(); setMobileMenuOpen(false); }}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 flex items-center justify-center space-x-2 hover:bg-gray-50 text-sm"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <span className="text-gray-700">{t('navbar.continueWithGoogle')}</span>
                    </button>
                    <Link href="/adminlogin" onClick={() => setMobileMenuOpen(false)}>
                      <span className="block text-center text-gray-600 hover:text-gray-800 py-2 text-sm">{t('navbar.admin')}</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
