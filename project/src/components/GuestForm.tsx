import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Guest } from '../types';

interface GuestFormProps {
  guest?: Guest | null;
  onSubmit: (guest: Omit<Guest, 'id'>) => void;
  onCancel: () => void;
}

// Update the Guest type to match the new data structure
interface Guest {
  id?: string;
  name: string;
  contact: string;
  email: string;
  location: string;
  dob: string;
  guardianName: string;
  guardianContact: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactNumber: string;
  occupationCourse: string;
  paymentCycle: 'monthly' | 'quarterly' | 'yearly';
  amountPaid: number;
  foodPreference: 'with-food' | 'without-food';
  stayStatus: 'currently-staying' | 'left';
  joinDate: string;
  expectedDateFrom: string;
  expectedDateTo: string;
  fileUrl?: string;
}

const GuestForm: React.FC<GuestFormProps> = ({ guest, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: guest?.name || '',
    contact: guest?.contact || '',
    email: guest?.email || '',
    location: guest?.location || '',
    dob: guest?.dob ? guest.dob.split('T')[0] : '',
    guardianName: guest?.guardianName || '',
    guardianContact: guest?.guardianContact || '',
    emergencyContactName: guest?.emergencyContactName || '',
    emergencyContactRelation: guest?.emergencyContactRelation || '',
    emergencyContactNumber: guest?.emergencyContactNumber || '',
    occupationCourse: guest?.occupationCourse || '',
    paymentCycle: guest?.paymentCycle || 'monthly',
    amountPaid: guest?.amountPaid || 0,
    foodPreference: guest?.foodPreference || 'with-food',
    stayStatus: guest?.stayStatus || 'currently-staying',
    joinDate: guest?.joinDate ? guest.joinDate.split('T')[0] : new Date().toISOString().split('T')[0],
    expectedDateFrom: guest?.expectedDateFrom ? guest.expectedDateFrom.split('T')[0] : new Date().toISOString().split('T')[0],
    expectedDateTo: guest?.expectedDateTo ? guest.expectedDateTo.split('T')[0] : '',
    fileUrl: guest?.fileUrl || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
    if (!formData.guardianContact.trim()) newErrors.guardianContact = 'Guardian contact is required';
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactRelation.trim()) newErrors.emergencyContactRelation = 'Emergency contact relation is required';
    if (!formData.emergencyContactNumber.trim()) newErrors.emergencyContactNumber = 'Emergency contact number is required';
    if (!formData.occupationCourse.trim()) newErrors.occupationCourse = 'Occupation/Course is required';
    if (formData.amountPaid <= 0) newErrors.amountPaid = 'Amount paid must be greater than 0';
    if (!formData.joinDate) newErrors.joinDate = 'Join date is required';
    if (!formData.expectedDateFrom) newErrors.expectedDateFrom = 'Expected start date is required';
    if (!formData.expectedDateTo) newErrors.expectedDateTo = 'Expected end date is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation for contact, guardianContact, and emergencyContactNumber
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (formData.contact && !phoneRegex.test(formData.contact)) {
      newErrors.contact = 'Please enter a valid contact number';
    }
    if (formData.guardianContact && !phoneRegex.test(formData.guardianContact)) {
      newErrors.guardianContact = 'Please enter a valid guardian contact number';
    }
    if (formData.emergencyContactNumber && !phoneRegex.test(formData.emergencyContactNumber)) {
      newErrors.emergencyContactNumber = 'Please enter a valid emergency contact number';
    }

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amountPaid' ? Number(value) : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        fileUrl: URL.createObjectURL(file), // Temporary URL for preview; actual upload logic depends on backend
      }));
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
            {guest ? 'Edit Guest' : 'Add New Guest'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {guest ? 'Update guest information' : 'Add a new guest to your PG'}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
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
                  placeholder="Enter guest's full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                  placeholder="guest@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact Number *
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="contact"
                  id="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.contact ? 'border-red-300' : ''
                  }`}
                  placeholder="+91 9876543210"
                />
                {errors.contact && (
                  <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.location ? 'border-red-300' : ''
                  }`}
                  placeholder="Enter guest's address"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.dob ? 'border-red-300' : ''
                  }`}
                />
                {errors.dob && (
                  <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
                )}
              </div>
            </div>

            {/* Guardian Name */}
            <div>
              <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">
                Guardian Name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="guardianName"
                  id="guardianName"
                  value={formData.guardianName}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.guardianName ? 'border-red-300' : ''
                  }`}
                  placeholder="Enter guardian's name"
                />
                {errors.guardianName && (
                  <p className="mt-1 text-sm text-red-600">{errors.guardianName}</p>
                )}
              </div>
            </div>

            {/* Guardian Contact */}
            <div>
              <label htmlFor="guardianContact" className="block text-sm font-medium text-gray-700">
                Guardian Contact *
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="guardianContact"
                  id="guardianContact"
                  value={formData.guardianContact}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.guardianContact ? 'border-red-300' : ''
                  }`}
                  placeholder="+91 9876543211"
                />
                {errors.guardianContact && (
                  <p className="mt-1 text-sm text-red-600">{errors.guardianContact}</p>
                )}
              </div>
            </div>

            {/* Emergency Contact Name */}
            <div>
              <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700">
                Emergency Contact Name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="emergencyContactName"
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.emergencyContactName ? 'border-red-300' : ''
                  }`}
                  placeholder="Enter emergency contact's name"
                />
                {errors.emergencyContactName && (
                  <p className="mt-1 text-sm text-red-600">{errors.emergencyContactName}</p>
                )}
              </div>
            </div>

            {/* Emergency Contact Relation */}
            <div>
              <label htmlFor="emergencyContactRelation" className="block text-sm font-medium text-gray-700">
                Emergency Contact Relation *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="emergencyContactRelation"
                  id="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.emergencyContactRelation ? 'border-red-300' : ''
                  }`}
                  placeholder="e.g., Mother, Father"
                />
                {errors.emergencyContactRelation && (
                  <p className="mt-1 text-sm text-red-600">{errors.emergencyContactRelation}</p>
                )}
              </div>
            </div>

            {/* Emergency Contact Number */}
            <div>
              <label htmlFor="emergencyContactNumber" className="block text-sm font-medium text-gray-700">
                Emergency Contact Number *
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="emergencyContactNumber"
                  id="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.emergencyContactNumber ? 'border-red-300' : ''
                  }`}
                  placeholder="+91 9876543211"
                />
                {errors.emergencyContactNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.emergencyContactNumber}</p>
                )}
              </div>
            </div>

            {/* Occupation/Course */}
            <div>
              <label htmlFor="occupationCourse" className="block text-sm font-medium text-gray-700">
                Occupation/Course *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="occupationCourse"
                  id="occupationCourse"
                  value={formData.occupationCourse}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.occupationCourse ? 'border-red-300' : ''
                  }`}
                  placeholder="e.g., Software Engineer, B.Tech"
                />
                {errors.occupationCourse && (
                  <p className="mt-1 text-sm text-red-600">{errors.occupationCourse}</p>
                )}
              </div>
            </div>

            {/* Payment Cycle */}
            <div>
              <label htmlFor="paymentCycle" className="block text-sm font-medium text-gray-700">
                Payment Cycle *
              </label>
              <div className="mt-1">
                <select
                  name="paymentCycle"
                  id="paymentCycle"
                  value={formData.paymentCycle}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="monthly">Monthly</option>
                  <option value="daily">daily </option>
                </select>
              </div>
            </div>

            {/* Amount Paid */}
            <div>
              <label htmlFor="amountPaid" className="block text-sm font-medium text-gray-700">
                Amount Paid (₹) *
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="amountPaid"
                  id="amountPaid"
                  min="0"
                  step="100"
                  value={formData.amountPaid}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.amountPaid ? 'border-red-300' : ''
                  }`}
                  placeholder="5500"
                />
                {errors.amountPaid && (
                  <p className="mt-1 text-sm text-red-600">{errors.amountPaid}</p>
                )}
              </div>
            </div>

            {/* Food Preference */}
            <div>
              <label htmlFor="foodPreference" className="block text-sm font-medium text-gray-700">
                Food Preference *
              </label>
              <div className="mt-1">
                <select
                  name="foodPreference"
                  id="foodPreference"
                  value={formData.foodPreference}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="with-food">With Food</option>
                  <option value="without-food">Without Food</option>
                </select>
              </div>
            </div>

            {/* Stay Status */}
            <div>
              <label htmlFor="stayStatus" className="block text-sm font-medium text-gray-700">
                Stay Status *
              </label>
              <div className="mt-1">
                <select
                  name="stayStatus"
                  id="stayStatus"
                  value={formData.stayStatus}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="currently-staying">Currently Staying</option>
                  <option value="left">Left</option>
                </select>
              </div>
            </div>

            {/* Join Date */}
            <div>
              <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">
                Join Date *
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="joinDate"
                  id="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.joinDate ? 'border-red-300' : ''
                  }`}
                />
                {errors.joinDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.joinDate}</p>
                )}
              </div>
            </div>

            {/* Expected Date From */}
            <div>
              <label htmlFor="expectedDateFrom" className="block text-sm font-medium text-gray-700">
                Expected Stay Start Date *
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="expectedDateFrom"
                  id="expectedDateFrom"
                  value={formData.expectedDateFrom}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.expectedDateFrom ? 'border-red-300' : ''
                  }`}
                />
                {errors.expectedDateFrom && (
                  <p className="mt-1 text-sm text-red-600">{errors.expectedDateFrom}</p>
                )}
              </div>
            </div>

            {/* Expected Date To */}
            <div>
              <label htmlFor="expectedDateTo" className="block text-sm font-medium text-gray-700">
                Expected Stay End Date *
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="expectedDateTo"
                  id="expectedDateTo"
                  value={formData.expectedDateTo}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.expectedDateTo ? 'border-red-300' : ''
                  }`}
                />
                {errors.expectedDateTo && (
                  <p className="mt-1 text-sm text-red-600">{errors.expectedDateTo}</p>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700">
                Upload Document
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  name="fileUrl"
                  id="fileUrl"
                  onChange={handleFileChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                {formData.fileUrl && (
                  <p className="mt-1 text-sm text-gray-600">
                    Current file: <a href={formData.fileUrl} target="_blank" rel="noopener noreferrer">View Document</a>
                  </p>
                )}
              </div>
            </div>
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
                {isSubmitting ? 'Saving...' : (guest ? 'Update Guest' : 'Add Guest')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestForm;