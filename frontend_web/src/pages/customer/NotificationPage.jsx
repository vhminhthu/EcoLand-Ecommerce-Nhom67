import CustomerLayout from '../../layouts/customer/CustomerLayout';
import MainLayout from '../../layouts/customer/MainLayout';
import { useState } from 'react';
import { IoIosTrash } from 'react-icons/io';

function NotificationPage() {
    const [notifications, setNotifications] = useState([
        { id: 1, user: 'Tim', action: 'invited you to join the EventLinc organization', time: '2:34 PM', type: 'invite' },
        { id: 2, user: 'Objective C', action: 'will be closed in 3 days. Go there to finish your remaining tasks', time: '4:00 PM', type: 'challenge' },
        { id: 3, user: 'John', action: 'commented on the Healthcare challenge that you are participating', time: '9:41 AM', type: 'comment' },
        { id: 4, user: 'Python', action: 'will be closed in 3 days. Go there to finish your remaining tasks', time: '2:15 AM', type: 'challenge' },
        { id: 5, user: 'Max', action: 'invited you to join the Microsoft organization', time: '8:24 AM', type: 'invite' },
        { id: 6, user: 'Javascript MD', action: 'will be closed in 3 days. Go there to finish your remaining tasks', time: '1:00 PM', type: 'challenge' },
        { id: 7, user: 'React', action: 'updated its documentation. Check out the latest changes', time: '11:30 AM', type: 'update' },
        { id: 8, user: 'Vue.js', action: 'released a new version. See what’s new', time: '6:45 AM', type: 'update' }
    ]);

    const removeNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
        <MainLayout>
            <CustomerLayout>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Notifications</h2>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                            <div key={notification.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                                <div>
                                    <span className="font-semibold">{notification.user}</span> {notification.action}
                                    <div className="text-gray-500 text-sm">{notification.time}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => removeNotification(notification.id)} className="text-green-700">
                                        <IoIosTrash size={20} />
                                    </button>
                                    <button className="text-blue-600 text-sm">Chi tiết</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CustomerLayout>
        </MainLayout>
    );
}

export default NotificationPage;