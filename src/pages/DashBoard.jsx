import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, ChevronDown, Search, Bell, Settings, Menu } from 'lucide-react';

const DashBoard = () => {
  const [timeRange, setTimeRange] = useState('Last 7 days');

  const salesData = [
    { name: 'Mon', value: 4200 },
    { name: 'Tue', value: 3800 },
    { name: 'Wed', value: 5100 },
    { name: 'Thu', value: 4600 },
    { name: 'Fri', value: 6200 },
    { name: 'Sat', value: 5800 },
    { name: 'Sun', value: 4900 }
  ];

  const revenueData = [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 19000 },
    { name: 'Mar', value: 15000 },
    { name: 'Apr', value: 25000 },
    { name: 'May', value: 22000 },
    { name: 'Jun', value: 30000 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#3b82f6' },
    { name: 'Clothing', value: 25, color: '#8b5cf6' },
    { name: 'Food', value: 20, color: '#ec4899' },
    { name: 'Books', value: 12, color: '#10b981' },
    { name: 'Other', value: 8, color: '#f59e0b' }
  ];

  const recentOrders = [
    { id: '#3452', customer: 'John Doe', amount: '$234.00', status: 'Completed', date: '2 min ago' },
    { id: '#3451', customer: 'Jane Smith', amount: '$156.00', status: 'Pending', date: '5 min ago' },
    { id: '#3450', customer: 'Bob Johnson', amount: '$389.00', status: 'Completed', date: '12 min ago' },
    { id: '#3449', customer: 'Alice Brown', amount: '$445.00', status: 'Shipped', date: '23 min ago' },
    { id: '#3448', customer: 'Charlie Wilson', amount: '$199.00', status: 'Completed', date: '1 hour ago' }
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      isPositive: true,
      icon: DollarSign,
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: '2,350',
      change: '+15.3%',
      isPositive: true,
      icon: Users,
      bgColor: 'bg-purple-500'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '-4.3%',
      isPositive: false,
      icon: ShoppingCart,
      bgColor: 'bg-pink-500'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+8.1%',
      isPositive: true,
      icon: Activity,
      bgColor: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-4 py-2 w-80">
              <Search className="w-5 h-5 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
            
            <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-slate-700">John Doe</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Date Range Selector */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Analytics Overview</h2>
            <p className="text-slate-600 mt-1">Track your business performance</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <span className="text-sm font-medium text-slate-700">{timeRange}</span>
            <ChevronDown className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Weekly Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Trend */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((cat, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-slate-600">{cat.name}</span>
                  </div>
                  <span className="font-semibold text-slate-800">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600">Order ID</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600">Customer</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600">Amount</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-2 text-sm font-medium text-slate-700">{order.id}</td>
                      <td className="py-3 px-2 text-sm text-slate-600">{order.customer}</td>
                      <td className="py-3 px-2 text-sm font-semibold text-slate-800">{order.amount}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm text-slate-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;