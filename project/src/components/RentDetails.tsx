import React from 'react';
import { ArrowLeft, Edit, DollarSign, Calendar, User, CreditCard, FileText, AlertCircle } from 'lucide-react';

interface RentDetail {
  id:string;
  name: string;
  amount: number;
  status: string;
  date: string;
  duedate: string;
  paymentMethod: string;
  notes: string;
  notesHistory: { date: string; note: string }[];
}

interface RentDetailsProps {
  rent: RentDetail;
  onBack: () => void;
  onEdit: () => void;
}

const RentDetails: React.FC<RentDetailsProps> = ({ rent, onBack, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'overdue': return 'bg-red-500';
      case 'Awaiting_payment': return 'bg-red-600'; 

      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return '✓';
      case 'pending': return '⏳';
      case 'overdue': return '⚠️';
      case 'Awaiting_payment': return '⚠️';
      default: return '?';
    }
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
               Rent Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {new Date(rent.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {rent.name}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Guest Id : {rent.id}
            </p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Record
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className={`px-6 py-8 bg-gradient-to-r ${getStatusColor(rent.status)} to-opacity-80`}>
          <div className="flex items-center space-x-6">
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
              <DollarSign className="h-10 w-10 text-gray-600" />
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-bold">₹{rent.amount.toLocaleString()}</h3>
              <p className="text-white opacity-90">{new Date(rent.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                  {getStatusIcon(rent.status)} {rent.status.charAt(0).toUpperCase() + rent.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Guest Name</p>
                      <p className="text-gray-900 font-medium">{rent.name}</p>
                      
                      <div>
                        {/* <div className="space-y-4">

                        <div className="flex items-center space-x-3">
                    <Pen className="h-5 w-5 text-gray-400" />
                        
                          <p className="text-sm text-gray-500">Guest Id</p>
                      <p className="text-gray-900 font-medium">{rent.id}</p> */}
                      </div>
                    </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(rent.duedate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {rent.status === 'paid' && rent.date && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-sm text-gray-500">Paid Date</p>
                        <p className="text-gray-900 font-medium">
                          {new Date(rent.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="text-gray-900 font-medium">{rent.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Amount</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-blue-600">₹{rent.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Payment Status</h4>
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getStatusColor(rent.status)} text-white text-2xl font-bold mb-3`}>
                    {getStatusIcon(rent.status)}
                  </div>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    {rent.status}
                  </p>
                  {rent.status === 'overdue' && (
                    <div className="mt-2 flex items-center justify-center text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Payment is overdue</span>
                    </div>
                  )}
                </div>
              </div>

              {rent.status === 'paid' && rent.date && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-800 mb-2">Payment Completed</h4>
                  <p className="text-sm text-green-700">
                    Payment was completed on{' '}
                    {new Date(rent.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {new Date(rent.date) < new Date(rent.duedate) ? 'Paid on time' : 'Paid late'}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Notes</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Current Note</p>
                      <p className="text-gray-900">{rent.notes || 'No notes available'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {rent.notesHistory && rent.notesHistory.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Notes History</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {rent.notesHistory.map((history, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">
                            {new Date(history.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-gray-900">{history.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    //   </div>
    // </div>
  );
};

export default RentDetails;