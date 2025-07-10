import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
import { Button } from './../../components/ui/button';
import { Card, CardContent } from './../../components/ui/card';
import { Badge } from './../../components/ui/badge';
import {
    Sprout,
    Star,
    Users,
    Shield,
    Truck,
    ChevronRight,
    Phone,
    MapPin,
    Award,
    Leaf,
    TrendingUp,
    Heart
} from 'lucide-react';

const Home = () => {
    const features = [
        {
            icon: Shield,
            title: 'Quality Assured',
            description: 'Only genuine products from trusted brands',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            icon: Users,
            title: '1000+ Farmers Served',
            description: 'Trusted by farmers across the region',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20'
        },
        {
            icon: Truck,
            title: 'Fast Delivery',
            description: 'Quick delivery to your doorstep',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20'
        },
        {
            icon: Star,
            title: '4.8 Star Rating',
            description: 'Highly rated by our customers',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
        }
    ];

    const categories = [
        {
            name: 'Insecticides',
            count: 15,
            image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
            color: 'from-red-500 to-red-600',
            icon: Shield
        },
        {
            name: 'Herbicides',
            count: 12,
            image: 'https://images.pexels.com/photos/1382394/pexels-photo-1382394.jpeg?auto=compress&cs=tinysrgb&w=400',
            color: 'from-blue-500 to-blue-600',
            icon: Leaf
        },
        {
            name: 'Fungicides',
            count: 10,
            image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
            color: 'from-green-500 to-green-600',
            icon: Sprout
        },
        {
            name: 'Seeds',
            count: 8,
            image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400',
            color: 'from-yellow-500 to-yellow-600',
            icon: Sprout
        },
        {
            name: 'Fertilizers',
            count: 6,
            image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
            color: 'from-purple-500 to-purple-600',
            icon: TrendingUp
        }
    ];

    const testimonials = [
        {
            name: 'Ramesh Patil',
            location: 'Kannad',
            rating: 5,
            comment: 'Excellent quality products and very helpful staff. Been buying from them for 3 years.',
            avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100',
            product: 'Cotton Seeds'
        },
        {
            name: 'Sunita Sharma',
            location: 'Aurangabad',
            rating: 5,
            comment: 'Best agriculture store in the area. Always have what I need for my farm.',
            avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
            product: 'Fertilizers'
        },
        {
            name: 'Vikram Singh',
            location: 'Paithan',
            rating: 5,
            comment: 'Great service and competitive prices. Highly recommend to all farmers.',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            product: 'Herbicides'
        }
    ];

    const stats = [
        { number: '1000+', label: 'Happy Farmers', icon: Users },
        { number: '8+', label: 'Years Experience', icon: Award },
        { number: '50+', label: 'Product Varieties', icon: Sprout },
        { number: '4.8', label: 'Customer Rating', icon: Star }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 dark:from-green-950 dark:via-green-900 dark:to-emerald-900 py-20 lg:py-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-green-600 rounded-full"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 bg-green-500 rounded-full"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400 rounded-full"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800 border-green-200">
                                        🌱 Trusted Since Establishment
                                    </Badge>
                                </motion.div>

                                <motion.h1
                                    className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >

                                    Your Agriculture
                                    <span className="text-green-600 block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        Solutions Partner
                                    </span>
                                </motion.h1>

                                <motion.p
                                    className="text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Quality farming supplies, expert advice, and reliable service for farmers across Maharashtra. Your success is our mission.
                                </motion.p>
                            </div>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link to="/products">
                                    <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                                        Shop Products
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call Us Now
                                </Button>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-green-200 dark:border-gray-700"
                                    >
                                        <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="Agriculture Store"
                                    className="w-full h-96 lg:h-[600px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 text-white">
                                    <h3 className="text-3xl font-bold mb-2">Quality Products</h3>
                                    <p className="text-white/90 text-lg">Trusted by 1000+ farmers</p>
                                </div>
                            </div>

                            {/* Floating Cards */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 }}
                                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-green-200 dark:border-gray-700"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="font-bold text-xl text-gray-900 dark:text-white">4.8</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">127 Google Reviews</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 }}
                                className="absolute -bottom-6 -left-6 bg-green-600 text-white p-6 rounded-2xl shadow-xl"
                            >
                                <div className="flex items-center space-x-3">
                                    <Heart className="h-6 w-6" />
                                    <div>
                                        <p className="font-bold text-lg">1000+</p>
                                        <p className="text-sm text-green-100">Happy Farmers</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Product Categories</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Comprehensive range of agriculture products to meet all your farming needs
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="cursor-pointer group"
                            >
                                <Link to="/products">
                                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                                        <div className="aspect-square relative">
                                            <img
                                                src={category.image}
                                                alt={category.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center text-white">
                                                    <category.icon className="h-12 w-12 mx-auto mb-3" />
                                                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                                                    <Badge className="bg-white/20 text-white border-white/30">
                                                        {category.count} Products
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Why Choose Us?</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            We're committed to providing the best products and service to help your farm thrive
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center group"
                            >
                                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
                                    <CardContent className="space-y-6 p-0">
                                        <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className={`h-8 w-8 ${feature.color}`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">What Our Customers Say</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Don't just take our word for it - hear from the farmers who trust us
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                                    <CardContent className="space-y-6 p-0">
                                        <div className="flex items-center space-x-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">"{testimonial.comment}"</p>
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
                                            />
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    {testimonial.location}
                                                </p>
                                                <Badge variant="outline" className="text-xs mt-1 border-green-200 text-green-700">
                                                    {testimonial.product}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            Ready to Boost Your Farm's Productivity?
                        </h2>
                        <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto">
                            Get expert advice and quality products to take your farming to the next level
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/products">
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100 shadow-lg">
                                    Browse Products
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10 shadow-lg">
                                    Contact Us
                                    <Phone className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;