import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from './button';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '919423723375';
    const message = 'Hello Kedar Krushi Seva Kendra, I am interested in your products.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Button
          onClick={handleWhatsAppClick}
          size="lg"
          className="rounded-full w-16 h-16 bg-green-500 hover:bg-green-600 shadow-2xl border-4 border-white dark:border-gray-800 transition-all duration-300"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </Button>
      </motion.div>

      {/* Pulse Animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500 opacity-30"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        Chat with us on WhatsApp
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </motion.div>
    </motion.div>
  );
};

export default WhatsAppFloat;