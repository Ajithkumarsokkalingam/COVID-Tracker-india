import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Users, Heart, Skull } from 'lucide-react';
import { stateData, dailyTrends } from '../data/covidData';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value.toLocaleString()}</p>
      </div>
      <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')}`} />
    </div>
  </div>
);

const Dashboard = () => {
  const totalStats = Object.values(stateData).reduce(
    (acc: any, state: any) => ({
      active: acc.active + state.active,
      recovered: acc.recovered + state.recovered,
      deaths: acc.deaths + state.deaths,
      vaccinated: acc.vaccinated + state.vaccinated,
    }),
    { active: 0, recovered: 0, deaths: 0, vaccinated: 0 }
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">COVID-19 Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Cases"
          value={totalStats.active}
          icon={Activity}
          color="border-blue-500"
        />
        <StatCard
          title="Recovered"
          value={totalStats.recovered}
          icon={Heart}
          color="border-green-500"
        />
        <StatCard
          title="Deaths"
          value={totalStats.deaths}
          icon={Skull}
          color="border-red-500"
        />
        <StatCard
          title="Vaccinated"
          value={totalStats.vaccinated}
          icon={Users}
          color="border-purple-500"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Daily Trends</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dailyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cases" fill="#3B82F6" name="New Cases" />
            <Bar dataKey="recovered" fill="#10B981" name="Recovered" />
            <Bar dataKey="deaths" fill="#EF4444" name="Deaths" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">State-wise Statistics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Cases
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recovered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deaths
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vaccinated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(stateData).map(([state, data]: [string, any]) => (
                <tr key={state}>
                  <td className="px-6 py-4 whitespace-nowrap">{state}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.active.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.recovered.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.deaths.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.vaccinated.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;