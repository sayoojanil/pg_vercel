import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { RentDetail } from '../types';
import { rentAPI } from '../services/api';

interface RentFormProps {
  rent?: RentDetail | null;
  onSubmit: (rent: Omit<RentDetail, 'id'>) => void;
  onCancel: () => void;
}

const RentForm: React.FC<RentFormProps> = ({ rent, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: rent?.name || '',
    amount: rent?.amount || '',
    status: rent?.status || 'pending' as const,
    date: rent?.date || 0,
    dueDate: rent?.dueDate || new Date().toISOString().split('T')[0],
    paymentMethod: rent?.paymentMethod || '',
    notes: rent?.notes || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Guest name is required';
    if (parseFloat(formData.amount.toString()) <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (formData.status === 'paid' && !formData.date) {
      newErrors.date = 'Paid date is required when status is paid';
    }
    if (!formData.paymentMethod.trim()) newErrors.paymentMethod = 'Payment method is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        amount: parseFloat(formData.amount.toString()) || 0,
        date: formData.status === 'paid' && formData.date ? formData.date : 0,
      };

      if (rent && rent.id) {
        // Update existing record
        await rentAPI.update(rent.id, submitData);
        setSuccessMessage('Rent details updated successfully!');
      } else {
        // Create new record
        await onSubmit(submitData);
        setSuccessMessage('Rent record added successfully!');
      }

      // Close the form after a short delay
      setTimeout(() => {
        onCancel();
      }, 1500);
    } catch (error) {
      console.error('Failed to submit form:', error);
      setSuccessMessage(null); // Clear success message on error
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['amount', 'date'].includes(name) ?
        (name === 'amount' ? parseFloat(value) || 0 : (name === 'date' && value ? new Date(value).getTime() : 0)) : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
            {rent ? 'Edit Rent Record' : 'Add New Rent Record'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {rent ? 'Update rent payment information' : 'Add a new rent payment record'}
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                Payment Method *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="paymentMethod"
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.paymentMethod ? 'border-red-300' : ''
                  }`}
                  placeholder="e.g., Cash, Bank Transfer"
                />
                {errors.paymentMethod && (
                  <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount (₹) *
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  min="0"
                  step="100"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.amount ? 'border-red-300' : ''
                  }`}
                  placeholder="12000"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Due Date *
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.dueDate ? 'border-red-300' : ''
                  }`}
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status *
              </label>
              <div className="mt-1">
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            {formData.status === 'paid' && (
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Paid Date *
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.date ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <div className="mt-1">
                <textarea
                  name="notes"
                  id="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Add any additional notes"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Total Amount</h4>
            <p className="text-2xl font-bold text-blue-600">
              ₹{parseFloat(formData.amount.toString()).toLocaleString()}
            </p>
          </div>

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
                {isSubmitting ? 'Saving...' : (rent ? 'Update Record' : 'Add Record')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentForm;