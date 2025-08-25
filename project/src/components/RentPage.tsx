import React, { useState, useEffect } from 'react';
import { Plus, Search, DollarSign, Calendar, Eye, Edit, AlertCircle } from 'lucide-react';
import { RentDetail } from '../types';
import { rentAPI } from '../services/api';
import RentForm from './RentForm';
import RentDetails from './RentDetails';

const RentPage: React.FC = () => {
  const [rentDetails, setRentDetails] = useState<RentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRent, setSelectedRent] = useState<RentDetail | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadRentDetails();
  }, []);

  const loadRentDetails = async () => {
    setLoading(true);
    try {
      const data = await rentAPI.getAll();
      setRentDetails(data);
    } catch (error) {
      console.error('Failed to load rent details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRent = async (rentData: Omit<RentDetail, 'id'>) => {
    try {
      await rentAPI.create(rentData);
      await loadRentDetails();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add rent detail:', error);
    }
  };

  const handleEditRent = async (rentData: Omit<RentDetail, 'id'>) => {
    if (selectedRent) {
      try {
        await rentAPI.update(selectedRent.id, rentData);
        await loadRentDetails();
        setShowForm(false);
        setSelectedRent(null);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update rent detail:', error);
      }
    }
  };

  const handleViewDetails = async (rent: RentDetail) => {
    const fullRent = await rentAPI.getById(rent.id);
    if (fullRent) {
      setSelectedRent(fullRent);
      setShowDetails(true);
    }
  };

  const handleEditClick = (rent: RentDetail) => {
    setSelectedRent(rent);
    setIsEditing(true);
    setShowForm(true);
  };

  const filteredRentDetails = rentDetails.filter(rent =>
    rent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rent.dueDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rent.month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRent = rentDetails.reduce((sum, rent) => sum + rent.amount + (rent.amount|| 0), 0);
  const paidRent = rentDetails.filter(rent => rent.status === 'paid').reduce((sum, rent) => sum + rent.amount + (rent.amount || 0), 0);
  const pendingCount = rentDetails.filter(rent => rent.status === 'pending').length;
  const overdueCount = rentDetails.filter(rent => rent.status === 'overdue').length;

  if (showForm) {
    return (
      <RentForm
        rent={isEditing ? selectedRent : null}
        onSubmit={isEditing ? handleEditRent : handleAddRent}
        onCancel={() => {
          setShowForm(false);
          setSelectedRent(null);
          setIsEditing(false);
        }}
      />
    );
  }

  if (showDetails && selectedRent) {
    return (
      <RentDetails
        rent={selectedRent}
        onBack={() => {
          setShowDetails(false);
          setSelectedRent(null);
        }}
        onEdit={() => {
          setShowDetails(false);
          handleEditClick(selectedRent);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Rent Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage rent payments from guests
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Rent Record
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Rent
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    ₹{totalRent.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Collected
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    ₹{paidRent.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {pendingCount}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Overdue
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {overdueCount}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by guest name, room, or month..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden">
            {filteredRentDetails.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No rent records found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guest
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Paid Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRentDetails.map((rent) => (
                      <tr key={rent.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {rent.name}
                            </div>
                            <div className="text-sm text-gray-500">ID : {rent.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {rent.month} {rent.duedate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ₹{(rent.amount + (rent.additionalCharges || 0)).toLocaleString()}
                          </div>
                          {rent.additionalCharges && (
                            <div className="text-xs text-gray-500">
                              Base: ₹{rent.monthlyRent.toLocaleString()} + Additional: ₹{rent.additionalCharges.toLocaleString()}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(rent.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            rent.status === 'paid' ? 'bg-green-100 text-green-800' :
                            rent.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {rent.status.charAt(0).toUpperCase() + rent.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewDetails(rent)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEditClick(rent)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Edit rent"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentPage;