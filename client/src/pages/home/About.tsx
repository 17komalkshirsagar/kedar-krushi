import { motion } from 'framer-motion';
import { Card, CardContent } from './../../components/ui/card';
import { Badge } from './../../components/ui/badge';
import {
  Users,
  MapPin,
  Clock,
  Phone,
  Mail,
  Sprout,
  Target,
  Heart,
  TrendingUp
} from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: '2015',
      title: 'Establishment',
      description: 'Founded Kedar Krushi Seva Kendra with a vision to serve farmers'
    },
    {
      year: '2017',
      title: '500+ Customers',
      description: 'Reached milestone of serving 500+ satisfied farmers'
    },
    {
      year: '2019',
      title: 'Brand Partnerships',
      description: 'Established partnerships with leading agriculture brands'
    },
    {
      year: '2021',
      title: '1000+ Farmers',
      description: 'Expanded to serve over 1000 farmers across the region'
    },
    {
      year: '2023',
      title: 'Digital Presence',
      description: 'Launched online platform for better customer service'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Quality First',
      description: 'We never compromise on product quality and only stock genuine products from trusted brands.'
    },
    {
      icon: Heart,
      title: 'Customer Care',
      description: 'Our customers are our priority. We provide personalized service and expert advice.'
    },
    {
      icon: TrendingUp,
      title: 'Growth Partnership',
      description: 'We partner with farmers for their success and growth in agricultural practices.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'We are committed to supporting the local farming community and rural development.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Farmers Served' },
    { number: '8+', label: 'Years Experience' },
    { number: '50+', label: 'Product Varieties' },
    { number: '4.8', label: 'Customer Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge variant="secondary" className="mb-4">
                About Our Story
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                Empowering Farmers Since
                <span className="text-green-600 block">2015</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                At Kedar Krushi Seva Kendra, we believe in the power of agriculture to transform lives.
                Our journey began with a simple mission: to provide farmers with the best quality products
                and expert guidance to help them achieve agricultural excellence.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-bold text-green-600">{stat.number}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="About Kedar Krushi Seva Kendra"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Serving Farmers</h3>
                  <p className="text-white/90">With dedication and expertise</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are driven by a clear purpose and guided by strong values that shape everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full">
                <CardContent className="space-y-4 p-0">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To empower farmers with high-quality agricultural products, expert knowledge, and reliable service
                    that helps them achieve better yields and sustainable farming practices. We are committed to being
                    the trusted partner that farmers can depend on for all their agricultural needs.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 h-full">
                <CardContent className="space-y-4 p-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Sprout className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To be the leading agricultural solutions provider in Maharashtra, fostering a thriving farming
                    community through innovation, quality products, and exceptional service. We envision a future
                    where every farmer has access to the tools and knowledge they need to succeed.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="p-6 h-full">
                  <CardContent className="space-y-4 p-0">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto">
                      <value.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Milestones that mark our commitment to serving the farming community
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-green-600 h-full hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } flex-col lg:flex-row gap-8`}
                >
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <Card className="p-6">
                      <CardContent className="space-y-3 p-0">
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-bold">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-green-600 rounded-full border-4 border-background shadow-lg" />
                  </div>

                  <div className="w-full lg:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Visit Our Store</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Come visit us for personalized service and expert advice on all your farming needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Card className="p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground text-sm">
                    40 Gaon Road, Kannad<br />
                    Chhatrapati Sambhajinagar<br />
                    Maharashtra 431103
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Card className="p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground text-sm">
                    +91 9423723375
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Card className="p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground text-sm">
                    kedarkrushiseva@gmail.com
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Card className="p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold">Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Mon-Sat: 9:00 AM - 7:00 PM<br />
                    Sunday: 10:00 AM - 5:00 PM
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;