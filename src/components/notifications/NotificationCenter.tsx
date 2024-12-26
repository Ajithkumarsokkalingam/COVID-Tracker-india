import React, { useState } from 'react';
import { Bell, Settings, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: Date;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Vaccination Slots',
      message: 'New vaccination slots available at Mumbai Central Hospital',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '2',
      title: 'Travel Advisory',
      message: 'Increased cases reported in Maharashtra. Travel with caution.',
      type: 'warning',
      timestamp: new Date()
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    cases: true,
    vaccination: true,
    travel: true
  });

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-500';
      case 'success': return 'bg-green-50 border-green-500';
      default: return 'bg-blue-50 border-blue-500';
    }
  };

  const updateSettings = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success(`${key} notifications ${notificationSettings[key] ? 'disabled' : 'enabled'}`);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-full hover:bg-indigo-700 transition-colors"
      >
        <Bell size={20} />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <Settings
                size={18}
                className="cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => toast('Settings clicked')}
              />
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No new notifications
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 ${getNotificationColor(notification.type)} hover:bg-gray-50`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <h4 className="font-medium mb-2">Notification Settings</h4>
            <div className="space-y-2">
              {Object.entries(notificationSettings).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key}</span>
                  <button
                    onClick={() => updateSettings(key as keyof typeof notificationSettings)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      enabled ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                        enabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;