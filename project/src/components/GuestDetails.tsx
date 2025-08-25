import React from 'react';
import { ArrowLeft, Edit, User, Mail, Phone, Calendar, MapPin, DollarSign, Shield, FileText, Users, Utensils } from 'lucide-react';
import { Guest } from '../types';

interface GuestDetailsProps {
  guest: Guest;
  onBack: () => void;
  onEdit: () => void;
}

const GuestDetails: React.FC<GuestDetailsProps> = ({ guest, onBack, onEdit }) => {
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
              Guest Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Complete information of {guest.name}
            </p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Guest
        </button>
      </div>

     <div className="bg-white shadow rounded-lg overflow-hidden">
  <div className="px-6 py-8 bg-gradient-to-r from-blue-700 to-blue-400">
    <div className="flex items-center space-x-6">
      <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
        <User className="h-10 w-10 text-gray-600" />
      </div>
      <div className="text-white">
        <h3 className="text-2xl font-bold">{guest.name}</h3>
        <p className="text-blue-100">ID {guest.id}</p>
        <div className="mt-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              guest.stayStatus === 'currently-staying' || guest.stayStatus === 'joining-soon'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {guest.stayStatus === 'currently-staying' ? 'Currently Staying' : 
             guest.stayStatus === 'joining-soon' ? 'Joining Soon' : 'Already Left'}
          </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{guest.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900">{guest.contact}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-900">
                        {new Date(guest.dob).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900">{guest.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Guardian Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Guardian Name</p>
                      <p className="text-gray-900">{guest.guardianName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Guardian Contact</p>
                      <p className="text-gray-900">{guest.guardianContact}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Emergency Contact Name</p>
                      <p className="text-gray-900">{guest.emergencyContactName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Emergency Contact Relation</p>
                      <p className="text-gray-900">{guest.emergencyContactRelation}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Emergency Contact Number</p>
                      <p className="text-gray-900">{guest.emergencyContactNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Accommodation Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Join Date</p>
                      <p className="text-gray-900">
                        {new Date(guest.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Expected Stay From</p>
                      <p className="text-gray-900">
                        {new Date(guest.expectedDateFrom).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Expected Stay To</p>
                      <p className="text-gray-900">
                        {new Date(guest.expectedDateTo).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Amount Paid</p>
                      <p className="text-gray-900">₹{guest.amountPaid.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Payment Cycle</p>
                      <p className="text-gray-900">{guest.paymentCycle}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Occupation/Course</p>
                      <p className="text-gray-900">{guest.occupationCourse}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Utensils className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Food Preference</p>
                      <p className="text-gray-900">{guest.foodPreference}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Document</p>
                      <a
                        href={guest.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Document
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.floor(
                        (new Date().getTime() - new Date(guest.joinDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </p>
                    <p className="text-sm text-gray-500">Days as shyamaprabha member</p>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;