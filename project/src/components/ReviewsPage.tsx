import React, { useState, useEffect } from 'react';
import { Plus, Search, Star, Eye, Edit, CheckCircle, Trash2 } from 'lucide-react';
import { Review } from '../types';
import { reviewAPI } from '../services/api';
import ReviewForm from './ReviewForm';
import ReviewDetails from './ReviewDetails';

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await reviewAPI.getAll();
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (reviewData: Omit<Review, 'id'>) => {
    try {
      await reviewAPI.create(reviewData);
      await loadReviews();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  const handleEditReview = async (reviewData: Omit<Review, 'id'>) => {
    if (selectedReview) {
      try {
        await reviewAPI.update(selectedReview.id, reviewData);
        await loadReviews();
        setShowForm(false);
        setSelectedReview(null);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update review:', error);
      }
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewAPI.delete(id);
      setReviews(reviews.filter(r => r.id !== id));
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  const handleViewDetails = async (review: Review) => {
    const fullReview = await reviewAPI.getById(review.id);
    if (fullReview) {
      setSelectedReview(fullReview);
      setShowDetails(true);
    }
  };

  const handleEditClick = (review: Review) => {
    setSelectedReview(review);
    setIsEditing(true);
    setShowForm(true);
  };

  const filteredReviews = reviews.filter(review =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  if (showForm) {
    return (
      <ReviewForm
        review={isEditing ? selectedReview : null}
        onSubmit={isEditing ? handleEditReview : handleAddReview}
        onCancel={() => {
          setShowForm(false);
          setSelectedReview(null);
          setIsEditing(false);
        }}
      />
    );
  }

  if (showDetails && selectedReview) {
    return (
      <ReviewDetails
        review={selectedReview}
        onBack={() => {
          setShowDetails(false);
          setSelectedReview(null);
        }}
        onEdit={() => {
          setShowDetails(false);
          handleEditClick(selectedReview);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Reviews Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage guest reviews and feedback
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Review
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5 flex items-center">
            <Star className="h-8 w-8 text-yellow-500" />
            <div className="ml-5">
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-semibold text-gray-900">{averageRating}</p>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5 flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-2xl font-semibold text-gray-900">{reviews.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-hidden">
            {filteredReviews.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No reviews found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleViewDetails(review)}
                              className="p-2 text-gray-400 hover:text-gray-600"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEditClick(review)}
                              className="p-2 text-gray-400 hover:text-gray-600"
                              title="Edit review"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="p-2 text-red-400 hover:text-red-600"
                              title="Delete review"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-2 flex items-center space-x-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-sm text-gray-600">({review.rating}/5)</span>
                        </div>

                        <p className="mt-3 text-gray-700 line-clamp-3">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
