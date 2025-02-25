import 'package:flutter/material.dart';
import '../services/api_service.dart'; // Import ApiService

class CategoryScreen extends StatefulWidget {
  const CategoryScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _CategoryScreenState createState() => _CategoryScreenState();
}

class _CategoryScreenState extends State<CategoryScreen> {
  List<dynamic> danhMucList = [];

  @override
  void initState() {
    super.initState();
    fetchDanhMuc();
  }

  Future<void> fetchDanhMuc() async {
    try {
      danhMucList = await ApiService.getDanhMuc();
      setState(() {});
    } catch (e) {
      // ignore: avoid_print
      print("Lỗi: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Danh Mục")),
      body: danhMucList.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: danhMucList.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(danhMucList[index]['tenDM'] ?? 'Không có tên'),
                );
              },
            ),
    );
  }
}
