import 'package:flutter/material.dart';
import 'package:frontend_app/screens/category_screen.dart';
import 'package:frontend_app/screens/home_screen.dart';
import 'package:frontend_app/screens/notification_screen.dart';
import 'package:frontend_app/screens/profile_screen.dart';

class NavigationMenu extends StatefulWidget {
  const NavigationMenu({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _NavigationMenuState createState() => _NavigationMenuState();
}

class _NavigationMenuState extends State<NavigationMenu> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const CategoryScreen(),
    const NotificationScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex], // Hiển thị màn hình tương ứng
      bottomNavigationBar: Container(
        padding: EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: Colors.green, // Màu nền thanh Navbar
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(15), 
            topRight: Radius.circular(15),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _selectedIndex,
          onTap: (index) {
            setState(() {
              _selectedIndex = index;
            });
          },
          backgroundColor: Colors.transparent, // Xóa nền mặc định
          elevation: 0,
          selectedItemColor: Colors.black, // Màu khi chọn
          unselectedItemColor: Colors.white, // Màu chưa chọn
          type: BottomNavigationBarType.fixed,
          items: [
            _buildNavItem(Icons.home, "Trang chủ", 0),
            _buildNavItem(Icons.grid_view, "Danh mục", 1),
            _buildNavItem(Icons.notifications, "Thông báo", 2),
            _buildNavItem(Icons.person, "Tài khoản", 3),
          ],
        ),
      ),
    );
  }

  /// Widget tạo item trong BottomNavigationBar
  BottomNavigationBarItem _buildNavItem(IconData icon, String label, int index) {
    return BottomNavigationBarItem(
      icon: Container(
        padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
        decoration: BoxDecoration(
          color: _selectedIndex == index ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          children: [
            Icon(icon, size: 24, color: _selectedIndex == index ? Colors.black : Colors.white),
            Text(label, style: TextStyle(fontSize: 12)),
          ],
        ),
      ),
      label: "",
    );
  }
}
