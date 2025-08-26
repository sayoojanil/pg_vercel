import React, { useState } from 'react';
import { ArrowLeft, Save, Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewFormProps {
  review?: Review | null;
  onSubmit: (review: Omit<Review, 'id'>) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ review, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Review, 'id'>>({
    name: review?.name || '',
    rating: review?.rating || 5,
    comment: review?.comment || '',
    createdAt: review?.createdAt || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Guest name is required';
    if (!formData.comment.trim()) newErrors.comment = 'Comment is required';
    if (!formData.createdAt) newErrors.createdAt = 'Date is required';
    if (formData.rating < 1 || formData.rating > 5) newErrors.rating = 'Rating must be between 1 and 5';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const renderStars = (rating: number, onRatingChange: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => onRatingChange(index + 1)}
        className={`h-8 w-8 transition-colors ${
          index < rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
        }`}
      >
        <Star className="h-full w-full fill-current" />
      </button>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            {review ? 'Edit Review' : 'Add New Review'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {review ? 'Update guest review' : 'Add a new guest review'}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guest Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Guest Name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.name ? 'border-red-300' : ''
                  }`}
                  placeholder="Enter guest's name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Review Date */}
            <div>
              <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                Review Date *
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="createdAt"
                  id="createdAt"
                  value={formData.createdAt.split('T')[0]}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.createdAt ? 'border-red-300' : ''
                  }`}
                />
                {errors.createdAt && (
                  <p className="mt-1 text-sm text-red-600">{errors.createdAt}</p>
                )}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating *
              </label>
              <div className="mt-1">
                <div className="flex items-center space-x-1">
                  {renderStars(formData.rating, (rating) => 
                    setFormData(prev => ({ ...prev, rating }))
                  )}
                  <span className="ml-2 text-sm text-gray-600">
                    ({formData.rating}/5)
                  </span>
                </div>
                {errors.rating && (
                  <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                )}
              </div>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
              Comment *
            </label>
            <div className="mt-1">
              <textarea
                name="comment"
                id="comment"
                rows={4}
                value={formData.comment}
                onChange={handleInputChange}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.comment ? 'border-red-300' : ''
                }`}
                placeholder="Enter the guest's review comment..."
              />
              {errors.comment && (
                <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Saving...' : (review ? 'Update Review' : 'Add Review')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
