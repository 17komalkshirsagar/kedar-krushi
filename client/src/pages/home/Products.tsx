import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from './../../components/ui/card';
import { Button } from './../../components/ui/button';
import { Badge } from './../../components/ui/badge';
import { Input } from './../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './../../components/ui/select';
import { Checkbox } from './../../components/ui/checkbox';
import { Label } from './../../components/ui/label';
import { Separator } from './../../components/ui/separator';
import {
  Search,
  Filter,
  Star,
  MessageCircle,
  Grid,
  List,
  SlidersHorizontal
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './../../components/ui/sheet';
import { FaWhatsapp } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const products: Product[] = [
    {
      id: '1',
      name: 'Hybrid Cotton Seeds BT-1',
      category: 'Seeds',
      brand: 'Bayer',
      price: 850,
      originalPrice: 950,
      rating: 4.7,
      reviews: 28,
      description: 'High-yield disease-resistant cotton seeds with excellent fiber quality',
      image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      isNew: true,
      discount: 11
    },
    {
      id: '2',
      name: 'Roundup Herbicide',
      category: 'Herbicides',
      brand: 'Bayer',
      price: 1200,
      rating: 4.5,
      reviews: 45,
      description: 'Effective broad-spectrum herbicide for weed control',
      image: 'https://images.pexels.com/photos/4022095/pexels-photo-4022095.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      isBestSeller: true
    },
    {
      id: '3',
      name: 'Confidor Insecticide',
      category: 'Insecticides',
      brand: 'Bayer',
      price: 890,
      rating: 4.6,
      reviews: 62,
      description: 'Systemic insecticide for sucking pest control',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: false
    },
    {
      id: '4',
      name: 'Tilt Fungicide',
      category: 'Fungicides',
      brand: 'Syngenta',
      price: 750,
      rating: 4.4,
      reviews: 33,
      description: 'Broad spectrum fungicide for disease management',
      image: 'https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true
    },
    {
      id: '5',
      name: 'NPK Fertilizer 20:20:20',
      category: 'Fertilizers',
      brand: 'UPL',
      price: 680,
      originalPrice: 720,
      rating: 4.3,
      reviews: 89,
      description: 'Complete balanced fertilizer for all crops',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      discount: 6
    },
    {
      id: '6',
      name: 'Tomato Hybrid Seeds',
      category: 'Seeds',
      brand: 'Tata Rallis',
      price: 1150,
      rating: 4.8,
      reviews: 156,
      description: 'High yielding hybrid tomato seeds with disease resistance',
      image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      isBestSeller: true
    },
    {
      id: '7',
      name: 'Gramoxone Herbicide',
      category: 'Herbicides',
      brand: 'Syngenta',
      price: 950,
      rating: 4.2,
      reviews: 24,
      description: 'Fast-acting contact herbicide',
      image: 'https://images.pexels.com/photos/1382394/pexels-photo-1382394.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true
    },
    {
      id: '8',
      name: 'Thiamethoxam Insecticide',
      category: 'Insecticides',
      brand: 'Dhanuka',
      price: 820,
      rating: 4.5,
      reviews: 41,
      description: 'Neonicotinoid insecticide for soil and foliar application',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      inStock: true,
      isNew: true
    }
  ];

  const categories = ['Insecticides', 'Herbicides', 'Fungicides', 'Seeds', 'Fertilizers'];
  const brands = ['Bayer', 'Syngenta', 'UPL', 'Tata Rallis', 'Dhanuka'];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesBrand = selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand);

      const matchesStock = stockFilter === 'all' ||
        (stockFilter === 'inStock' && product.inStock) ||
        (stockFilter === 'outOfStock' && !product.inStock);

      return matchesSearch && matchesCategory && matchesBrand && matchesStock;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategories, selectedBrands, stockFilter, sortBy]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleWhatsAppInquiry = (product: Product) => {
    const message = `Hello, I'm interested in ${product.name}. Can you provide more details about pricing and availability?`;
    const url = `https://wa.me/919423723375?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                className="border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <Label htmlFor={category} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-200 dark:bg-gray-700" />

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Brands</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-3">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                className="border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <Label htmlFor={brand} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-200 dark:bg-gray-700" />

      {/* Stock Filter */}
      <div>
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Availability</h3>
        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="border-gray-300 dark:border-gray-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="inStock">In Stock</SelectItem>
            <SelectItem value="outOfStock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 space-y-2">
            {product.isNew && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white">New</Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Best Seller</Badge>
            )}
            {product.discount && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white">{product.discount}% OFF</Badge>
            )}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg bg-white text-gray-900">Out of Stock</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6 space-y-4">
          <div>
            <Badge variant="outline" className="text-xs border-green-200 text-green-700 mb-2">
              {product.category}
            </Badge>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</p>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium ml-1 text-gray-900 dark:text-white">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link to={`/products/${product.id}`} className="flex-1">
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" size="sm">
                View Details
              </Button>
            </Link>
            <Button
              onClick={() => handleWhatsAppInquiry(product)}
              className="flex-1 bg-green-600 hover:bg-green-700"
              size="sm"
              disabled={!product.inStock}
            >
              <FaWhatsapp className="h-5 w-5 mr-2" />
              Inquire
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Our Products</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover our comprehensive range of quality agriculture products from trusted brands
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24 bg-white dark:bg-gray-800 border-0 shadow-lg">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
              </div>
              <FilterSection />
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-green-600 hover:bg-green-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-green-600 hover:bg-green-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
              }`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setStockFilter('all');
                  }}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;