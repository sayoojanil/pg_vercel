import React from 'react';
import { ArrowLeft, Edit, Star, Calendar, CheckCircle, User } from 'lucide-react';
import { Review } from '../types';

interface ReviewDetailsProps {
  review: Review;
  onBack: () => void;
  onEdit: () => void;
}

const ReviewDetails: React.FC<ReviewDetailsProps> = ({ review, onBack, onEdit }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-6 w-6 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
              Review Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Review from {review.name}
            </p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Review
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-blue-400">
          <div className="flex items-center space-x-6">
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-gray-600" />
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-bold">{review.name}</h3>
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(review.rating)}
                </div>
                <span className="text-lg font-semibold">({review.rating}/5)</span>
                
                  <div className="flex items-center space-x-1 bg-green-500 rounded-full px-3 py-1">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h4>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-800 leading-relaxed text-lg">
                  "{review.comment}"
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Review Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Added on</p>
                      <p className="text-gray-900">{review.createdAt}</p>

                        
                      
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Review id</p>
                      <p className="text-gray-900">{review.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Rating Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Rating</span>
                    <span className="font-semibold text-blue-600">{review.rating}/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                   
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick Stats</h4>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600 mb-1">
                    {review.rating}
                  </p>
                  <p className="text-sm text-gray-600">Stars Given</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;