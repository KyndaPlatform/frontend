import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Grid3x3, 
  Wallet, 
  Sparkles, 
  Heart, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  UserPlus,
  ChevronDown,
  MoreHorizontal,
  X
} from 'lucide-react';

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      type: 'reminder',
      title: 'Training session reminder',
      message: "Don't forget to join your upcoming tra...",
      time: '2:30 PM',
      icon: 'calendar',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      unread: true
    },
    {
      id: 2,
      type: 'announcement',
      title: 'New integration announcemen...',
      message: 'Our admin have update new course for le...',
      time: '3:00 PM',
      icon: 'info',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      unread: false
    },
    {
      id: 3,
      type: 'approval',
      title: 'Parent Approval',
      message: 'Your course enrollment request have bee...',
      time: '12:50 PM',
      icon: 'check',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      unread: false
    }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img
                  src="../images/Vector (1).png"
                  alt="Kynda Logo"
                  className="w-10 h-10 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                />
            <span className="text-xl font-bold text-gray-800">KYNDA</span>
          </div>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex items-center gap-8">
          <a 
            href="#" 
            className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-gray-600 font-medium hover:text-gray-800 transition-colors"
          >
            <BookOpen size={18} />
            <span>My Learning</span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-gray-600 font-medium hover:text-gray-800 transition-colors"
          >
            <Grid3x3 size={18} />
            <span>My Sections</span>
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 text-gray-600 font-medium hover:text-gray-800 transition-colors"
          >
            <Wallet size={18} />
            <span>Wallet</span>
          </a>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-4">
          {/* Kynda Assistant Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <Sparkles size={18} />
            <span className="font-medium">Kynda Assistant</span>
          </button>

          {/* Favorites Icon */}
          <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <Heart size={22} />
          </button>

          {/* Notification Icon with Badge */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notification</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors"
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-10 h-10 ${notification.iconBg} rounded-full flex items-center justify-center`}>
                          {notification.icon === 'calendar' && (
                            <div className={`${notification.iconColor}`}>
                              <Bell size={18} />
                            </div>
                          )}
                          {notification.icon === 'info' && (
                            <div className={`${notification.iconColor}`}>
                              <BookOpen size={18} />
                            </div>
                          )}
                          {notification.icon === 'check' && (
                            <div className={`${notification.iconColor}`}>
                              <User size={18} />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-gray-800 text-sm">
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-gray-200">
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Show All Notification
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-1 pr-2 transition-colors"
            >
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                alt="Profile" 
                className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
              />
              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                <a 
                  href="#" 
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <User size={18} className="text-gray-600" />
                  <span className="text-gray-700 font-medium">Profile</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <Settings size={18} className="text-gray-600" />
                  <span className="text-gray-700 font-medium">Settings</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <Heart size={18} className="text-gray-600" />
                  <span className="text-gray-700 font-medium">Favorites</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <Bell size={18} className="text-gray-600" />
                  <span className="text-gray-700 font-medium">Notification</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <UserPlus size={18} className="text-gray-600" />
                  <span className="text-gray-700 font-medium">Invite a friend</span>
                </a>
                <div className="border-t border-gray-200 my-2"></div>
                <a 
                  href="#" 
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} className="text-red-600" />
                  <span className="text-red-600 font-medium">Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;