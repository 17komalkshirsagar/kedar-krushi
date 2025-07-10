import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './../../components/ui/card';
import { Button } from './../../components/ui/button';
import { Input } from './../../components/ui/input';
import { Label } from './../../components/ui/label';
import { Textarea } from './../../components/ui/textarea';
import { Progress } from './../../components/ui/progress';
import { Badge } from './../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './../../components/ui/avatar';
import { Separator } from './../../components/ui/separator';
import {
  Star,
  ExternalLink,
  User,
  Calendar,
  ThumbsUp,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

const Reviews = () => {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 0,
    message: ''
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const overallRating = {
    average: 4.8,
    total: 127,
    distribution: [
      { stars: 5, count: 99, percentage: 78 },
      { stars: 4, count: 19, percentage: 15 },
      { stars: 3, count: 6, percentage: 5 },
      { stars: 2, count: 2, percentage: 1 },
      { stars: 1, count: 1, percentage: 1 }
    ]
  };

  const reviews = [
    {
      id: 1,
      name: 'Ramesh Patil',
      // avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent service and quality products! I have been buying from Kedar Krushi Seva Kendra for the past 3 years. They always have genuine products and provide great advice for farming. The cotton seeds I bought last season gave me excellent yield.',
      verified: true,
      helpful: 12,
      product: 'Hybrid Cotton Seeds BT-1'
    },
    {
      id: 2,
      name: 'Sunita Sharma',
      // avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '3 weeks ago',
      comment: 'Best agriculture store in the area! Staff is very knowledgeable and helpful. They guide you properly about which products to use and when. Prices are also reasonable compared to other stores.',
      verified: true,
      helpful: 8,
      product: 'NPK Fertilizer'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      // avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4,
      date: '1 month ago',
      comment: 'Good experience overall. Products are genuine and delivery is prompt. Only suggestion would be to expand the store timings on Sundays as many farmers visit on weekends.',
      verified: false,
      helpful: 5,
      product: 'Roundup Herbicide'
    },
    {
      id: 4,
      name: 'Priya Devi',
      // avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '1 month ago',
      comment: 'Very satisfied with their service. The owner personally explains about the products and their usage. Got excellent results with the fungicide they recommended. Will definitely recommend to other farmers.',
      verified: true,
      helpful: 15,
      product: 'Tilt Fungicide'
    },
    {
      id: 5,
      name: 'Suresh Kumar',
      // avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4,
      date: '6 weeks ago',
      comment: 'Reliable store with good quality products. Have been their customer for 2 years now. Sometimes they run out of stock of popular items, but they inform in advance and arrange quickly.',
      verified: true,
      helpful: 7,
      product: 'Insecticide'
    },
    {
      id: 6,
      name: 'Anjali Patil',
      // avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      date: '2 months ago',
      comment: 'Excellent customer service! They called me personally to follow up on the results after I bought seeds from them. This level of care is rare to find. Highly recommended!',
      verified: true,
      helpful: 9,
      product: 'Tomato Hybrid Seeds'
    }
  ];

  const handleRatingClick = (rating: number) => {
    setReviewForm({ ...reviewForm, rating });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reviewForm.name || !reviewForm.rating || !reviewForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, this would submit to your backend
    toast.success('Review submitted successfully! Thank you for your feedback.');
    setReviewForm({ name: '', email: '', rating: 0, message: '' });
  };

  const handleViewOnGoogle = () => {
    window.open('https://www.google.com/search?q=Kedar+Krushi+Seva+Kendra+reviews', '_blank');
  };

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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Customer Reviews</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Read what our customers say about their experience with us
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Overall Rating */}
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>Overall Rating</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">{overallRating.average}</div>
                  <div className="flex justify-center my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(overallRating.average)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {overallRating.total} reviews</p>
                </div>

                <Separator className="bg-gray-200" />

                {/* Rating Distribution */}
                <div className="space-y-3">
                  {overallRating.distribution.map((rating) => (
                    <div key={rating.stars} className="flex items-center space-x-3">
                      <span className="text-sm w-8 text-gray-700 dark:text-gray-300">{rating.stars} ★</span>
                      <Progress value={rating.percentage} className="flex-1" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{rating.count}</span>
                    </div>
                  ))}
                </div>

                <Separator className="bg-gray-200 dark:bg-gray-700" />

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={handleViewOnGoogle}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Google
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Leave a Review
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Review Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Satisfaction Rate</span>
                  </div>
                  <span className="font-bold text-green-600">93%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Repeat Customers</span>
                  </div>
                  <span className="font-bold text-blue-600">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Recommend to Others</span>
                  </div>
                  <span className="font-bold text-purple-600">91%</span>
                </div>
              </CardContent>
            </Card>

            {/* Submit Review Form */}
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Write a Review</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <Label htmlFor="reviewName" className="text-gray-700 dark:text-gray-300">Name *</Label>
                    <Input
                      id="reviewName"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reviewEmail" className="text-gray-700 dark:text-gray-300">Email (Optional)</Label>
                    <Input
                      id="reviewEmail"
                      type="email"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Rating *</Label>
                    <div className="flex space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingClick(rating)}
                          onMouseEnter={() => setHoveredRating(rating)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors"
                        >
                          <Star
                            className={`h-6 w-6 transition-colors ${rating <= (hoveredRating || reviewForm.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reviewMessage" className="text-gray-700 dark:text-gray-300">Review Message *</Label>
                    <Textarea
                      id="reviewMessage"
                      value={reviewForm.message}
                      onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                      placeholder="Share your experience with us..."
                      rows={4}
                      className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage alt={review.name} />
                        <AvatarFallback className="bg-green-100 text-green-700">
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{review.name}</h3>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300'
                                      }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        {review.product && (
                          <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                            {review.product}
                          </Badge>
                        )}

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {review.comment}
                        </p>

                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Load More */}
            <div className="text-center pt-6">
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                Load More Reviews
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;