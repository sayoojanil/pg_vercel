import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Star,User, TrendingUp, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CheckIn {
  name: string;
  time: string;
  joinDate?: string;
  contact?: string;
}

interface Stat {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const Dashboard: React.FC = () => {
  const [recentCheckIns, setRecentCheckIns] = useState<CheckIn[]>([
    { name: 'Loading...', time: '' },
  ]);
  const navigate = useNavigate();

  // Fetch recent check-ins from API
  useEffect(() => {
    const fetchRecentCheckIns = async () => {
      try {
        const response = await fetch('https://api-hammadii-6.onrender.com/getDetailsof/guests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recent check-ins');
        }
        const data = await response.json();
        // Sort in ascending order by time (newest first) and limit to 5
        const sortedData = data
          .sort((a: CheckIn, b: CheckIn) =>
            new Date(b.time).getTime() - new Date(a.time).getTime()

          )
          .slice(0, 5);
        setRecentCheckIns(sortedData);
      } catch (error) {
        console.error('Error fetching recent check-ins:', error);
        setRecentCheckIns([
          { name: 'Error loading data', time: '' },
        ]);
      }
    };

    fetchRecentCheckIns();
  }, []);

  const stats: Stat[] = [
      // Stats data remains unchanged
  ];

  const quickActions = [
    { name: 'Add New Guest', action: () => navigate('/guests'), icon: Users, color: 'bg-blue-500' },
    { name: 'Record Payment', action: () => navigate('/rent'), icon: DollarSign, color: 'bg-green-500' },
    { name: 'View Reviews', action: () => navigate('/reviews'), icon: Star, color: 'bg-yellow-500' },
     { name: 'View Profile', action: () => navigate('/profile'), icon: User, color: 'bg-blue-500' },

  ];

  const recentActivity = [
    { action: 'Always lock your room when leaving.', time: '2 hours ago', type: 'safety' },
    { action: 'Do not share your room keys with strangers.', time: '4 hours ago', type: 'safety' },
    { action: 'Switch off electrical appliances before leaving.', time: '6 hours ago', type: 'safety' },
    { action: 'Report any suspicious activity to the admin.', time: '1 day ago', type: 'safety' },
    { action: 'Keep emergency contact numbers handy.', time: '1 day ago', type: 'safety' }
  ];

  const pendingTasks = [
    { task: 'Review 3 pending rent payments', priority: 'high' },
    { task: 'Respond to 2 new review comments', priority: 'medium' },
    { task: 'Update room availability status', priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening at your PG today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} p-3 rounded-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.name}
                  onClick={action.action}
                  className="w-full flex items-center p-3 rounded-md hover:bg-gray-50 transition-colors group"
                >
                  <div className={`${action.color} p-2 rounded-md group-hover:scale-105 transition-transform`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {action.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Check-Ins */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Our few guests</h3>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentCheckIns.map((checkIn, index) => (
                  <li key={index} className="py-4">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800">{checkIn.name}</p>
                        <p className="text-sm text-gray-500">Check In   : {checkIn.joinDate}</p>
                         <p className="text-sm text-gray-500">Phone : {checkIn.contact}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Do check</h3>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="py-4">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`h-2 w-2 rounded-full ${
                          activity.type === 'guest' ? 'bg-blue-400' :
                          activity.type === 'payment' ? 'bg-green-400' :
                          activity.type === 'review' ? 'bg-yellow-400' : 'bg-red-400'
                        }`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Pending Tasks</h3>
          </div>
          <div className="p-6 space-y-4">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center space-x-3">
                <AlertCircle className={`h-5 w-5 ${
                  task.priority === 'high' ? 'text-red-500' :
                  task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800">{task.task}</p>
                  <p className={`text-xs ${
                    task.priority === 'high' ? 'text-red-600' :
                    task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {task.priority.toUpperCase()} PRIORITY
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;