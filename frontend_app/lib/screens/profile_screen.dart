import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        children: [
          // Phần header xanh trên cùng
          Container(
            padding:
                const EdgeInsets.only(top: 40, left: 16, right: 16, bottom: 20),
            decoration: const BoxDecoration(
              color: Color(0xFF1B8057),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    SizedBox(width: 24), // Để cân bằng với icon bên phải
                    Spacer(),
                    Icon(Icons.settings, color: Colors.white),
                    SizedBox(width: 16),
                    Icon(Icons.shopping_cart, color: Colors.white),
                  ],
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    CircleAvatar(
                      radius: 25,
                      backgroundColor: Colors.white,
                      child: Icon(Icons.person, size: 30, color: Colors.grey),
                    ),
                    const SizedBox(width: 15),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text("Tên người dùng",
                            style: TextStyle(
                                fontSize: 18,
                                color: Colors.white,
                                fontWeight: FontWeight.bold)),
                        SizedBox(height: 8),
                        Text("Người theo 1k   |   Đang theo 10",
                            style:
                                TextStyle(fontSize: 14, color: Colors.white70)),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Phần đơn mua
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    Text("Đơn mua",
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold)),
                    Text("Xem lịch sử mua hàng >",
                        style: TextStyle(fontSize: 14, color: Colors.grey)),
                  ],
                ),
                const SizedBox(height: 10),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildOrderStatus(
                        Icons.description_outlined, "Chờ xác nhận"),
                    _buildOrderStatus(
                        Icons.card_giftcard_outlined, "Giao hàng"),
                    _buildOrderStatus(
                        Icons.local_shipping_outlined, "Vận chuyển"),
                    _buildOrderStatus(Icons.check_circle_outline, "Hoàn thành"),
                  ],
                ),
                const SizedBox(height: 10),
                const Divider(color: Color(0xFF1B8057)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  static Widget _buildOrderStatus(IconData icon, String label) {
    return Column(
      children: [
        Icon(icon, size: 32, color: Colors.black54),
        const SizedBox(height: 5),
        Text(label, style: const TextStyle(fontSize: 14)),
      ],
    );
  }
}
