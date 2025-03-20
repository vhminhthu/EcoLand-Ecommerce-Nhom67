import 'package:flutter/material.dart';

class NotificationScreen extends StatelessWidget {
  const NotificationScreen({Key? key}) : super(key: key);

  static const List<Map<String, String>> notifications = [
    {
      'title': 'Đơn hàng đã được xác nhận',
      'subtitle': 'Đơn hàng #12345 của bạn đã được xác nhận thành công.',
      'time': '5 phút trước'
    },
    {
      'title': 'Khuyến mãi đặc biệt!',
      'subtitle': 'Giảm 20% cho tất cả đơn hàng hôm nay.',
      'time': '30 phút trước'
    },
    {
      'title': 'Cập nhật trạng thái đơn hàng',
      'subtitle': 'Đơn hàng #12345 đang trên đường giao đến bạn.',
      'time': '1 giờ trước'
    },
    {
      'title': 'Nhận xét sản phẩm',
      'subtitle': 'Hãy để lại đánh giá cho sản phẩm bạn đã mua.',
      'time': '2 giờ trước'
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Thông báo'),
        backgroundColor: Color(0xFF1B8057),
      ),
      backgroundColor: Colors.white,
      body: ListView.separated(
        itemCount: notifications.length,
        separatorBuilder: (context, index) => Divider(),
        itemBuilder: (context, index) {
          final notification = notifications[index];
          return ListTile(
            leading: Icon(Icons.notifications, color: Color(0xFF1B8057)),
            title: Text(notification['title']!,
                style: TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text(notification['subtitle']!),
            trailing: Text(notification['time']!,
                style: TextStyle(color: Colors.grey)),
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                    content:
                        Text('Bạn đã nhấn vào "${notification['title']}"')),
              );
            },
          );
        },
      ),
    );
  }
}
