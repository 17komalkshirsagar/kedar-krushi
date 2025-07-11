import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './../../components/ui/card';
import { Badge } from './../../components/ui/badge';
import { Input } from './../../components/ui/input';
import { Label } from './../../components/ui/label';
import { Textarea } from './../../components/ui/textarea';
import { Separator } from './../../components/ui/separator';
import { FaWhatsapp } from "react-icons/fa";

import {
  Star,
  Share2,
  ArrowLeft,
  Check,
  User,

  Heart,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {

  const [selectedImage, setSelectedImage] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    message: ''
  });

  // Mock product data - in real app, fetch based on ID
  const product = {
    id: '1',
    name: 'Hybrid Cotton Seeds BT-1',
    category: 'Seeds',
    brand: 'Bayer',
    price: 850,
    originalPrice: 950,
    rating: 4.7,
    reviews: 28,
    description: 'High-yield disease-resistant cotton seeds with excellent fiber quality. These premium hybrid seeds are specifically designed for Indian growing conditions and provide exceptional resistance to bollworm and other common pests.',
    images: [
      'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    isNew: true,
    discount: 11,
    sku: 'BT-001',
    features: [
      'High germination rate (95%+)',
      'Disease resistant variety',
      'Suitable for various soil types',
      'High fiber quality',
      'Recommended for commercial cultivation'
    ],
    specifications: {
      'Seed Type': 'Hybrid BT Cotton',
      'Packet Size': '450g',
      'Germination': '95%+',
      'Maturity': '160-170 days',
      'Yield Potential': '25-30 quintals/hectare'
    }
  };

  const reviews = [
    {
      id: 1,
      name: 'Ramesh Patil',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent seeds! Got great yield this season. Highly recommended for cotton farming.',
      verified: true
    },
    {
      id: 2,
      name: 'Suresh Kumar',
      rating: 4,
      date: '1 month ago',
      comment: 'Good quality seeds. Germination rate was as promised. Will buy again.',
      verified: true
    },
    {
      id: 3,
      name: 'Priya Sharma',
      rating: 5,
      date: '6 weeks ago',
      comment: 'Very satisfied with the product. Plants are healthy and disease-free.',
      verified: false
    }
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inquiryForm.name || !inquiryForm.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    const message = `Hello, I'm interested in ${product.name}.

Name: ${inquiryForm.name}
Phone: ${inquiryForm.phone}
Message: ${inquiryForm.message || 'Please provide more details about pricing and availability.'}`;

    const url = `https://wa.me/919423723375?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    toast.success('Inquiry sent! We will contact you soon.');
    setInquiryForm({ name: '', phone: '', message: '' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/products" className="text-muted-foreground hover:text-foreground">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/products">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 aspect-square bg-muted rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-green-600' : 'border-transparent'
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.isNew && <Badge className="bg-green-500">New</Badge>}
                {product.discount && <Badge variant="destructive">{product.discount}% OFF</Badge>}
              </div>

              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.brand}</p>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                      }`}
                  />
                ))}
                <span className="font-medium ml-2">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              {product.discount && (
                <p className="text-green-600 font-medium">
                  You save ₹{product.originalPrice! - product.price} ({product.discount}% off)
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">In Stock</span>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="font-semibold">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">

                <Button size="lg" className="flex-1 bg-green-600 text-white hover:bg-green-700">
                  <FaWhatsapp className="h-5 w-5 mr-2" />
                  Inquire via WhatsApp
                </Button>                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Quality Assured</p>
                <p className="text-xs text-muted-foreground">Genuine Product</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Fast Delivery</p>
                <p className="text-xs text-muted-foreground">2-3 Days</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">7 Day Policy</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Product Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder="Additional details or questions..."
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700">
                    Send Inquiry
                  </Button>


                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Customer Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={review.id}>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{review.name}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                    {index < reviews.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
                <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                  View All Reviews
                </Button>

              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;