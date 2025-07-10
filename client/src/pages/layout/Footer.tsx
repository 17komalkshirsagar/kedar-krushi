import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './../../components/ui/button';
import { Input } from './../../components/ui/input';
import { Separator } from './../../components/ui/separator';
import {
  Sprout,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: 'https://wa.me/919423723375?text=Hello%20Kedar%20Krushi%20Seva%20Kendra,%20I%20am%20interested%20in%20your%20products.',
      color: 'text-green-500 hover:text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40'
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      href: 'https://facebook.com/your-page',
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: 'https://instagram.com/your-page',
      color: 'text-pink-600 hover:text-pink-700',
      bgColor: 'bg-pink-50 hover:bg-pink-100 dark:bg-pink-900/20 dark:hover:bg-pink-900/40'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      href: 'https://twitter.com/your-page',
      color: 'text-blue-400 hover:text-blue-500',
      bgColor: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      href: 'https://linkedin.com/company/your-page',
      color: 'text-blue-700 hover:text-blue-800',
      bgColor: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40'
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      href: 'https://youtube.com/channel/your-channel',
      color: 'text-red-600 hover:text-red-700',
      bgColor: 'bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40'
    }
  ];


  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' }
  ];

  const productCategories = [
    'Insecticides',
    'Herbicides',
    'Fungicides',
    'Seeds',
    'Fertilizers'
  ];

  return (
    <footer className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 border-t border-green-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Kedar Krushi</h3>
                <p className="text-sm text-green-600 font-medium">Seva Kendra</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your trusted partner for all agriculture needs. Quality products, expert advice, and reliable service since our establishment.
            </p>

            {/* Google Reviews Summary */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-green-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">4.8</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Based on 127 Google reviews</p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="text-xs border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View on Google
                </Button>
                <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                  Leave a Review
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">40 Gaon Road, Kannad</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Chhatrapati Sambhajinagar</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Maharashtra 431103</p>
                </div>
              </div>

              <a
                href="tel:+919423723375"
                className="flex items-center space-x-3 text-sm hover:text-green-600 transition-colors group"
              >
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Phone className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600">+91 9423723375</span>
              </a>

              <a
                href="mailto:kedarkrushiseva@gmail.com"
                className="flex items-center space-x-3 text-sm hover:text-green-600 transition-colors group"
              >
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <Mail className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600">kedarkrushiseva@gmail.com</span>
              </a>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Product Categories</h4>
              <ul className="space-y-2">
                {productCategories.map((category) => (
                  <li key={category}>
                    <Link
                      to="/products"
                      className="text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors text-sm"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Subscribe to get updates on new products and farming tips.
            </p>

            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white dark:bg-gray-800 border-green-200 dark:border-gray-600"
              />
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Subscribe
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl transition-all duration-200 ${social.color} ${social.bgColor}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>

            </div>

            {/* Google Maps Direction Button */}
            <Button
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
              onClick={() => window.open('https://maps.google.com?q=40+Gaon+Road,+Kannad,+Chhatrapati+Sambhajinagar,+Maharashtra+431103', '_blank')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </motion.div>
        </div>

        <Separator className="my-8 bg-green-200 dark:bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Kedar Krushi Seva Kendra. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;