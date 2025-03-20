import 'package:flutter/material.dart';
import 'product_list_screen.dart'; // Import màn hình danh sách sản phẩm
import '../services/api_service.dart';

class CategoryScreen extends StatefulWidget {
  const CategoryScreen({super.key});

  @override
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
      print("Lỗi: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          "Danh Mục",
          style: TextStyle(
            color: Color(0xFF1B8057),
            fontWeight: FontWeight.bold,
            fontSize: 22,
            letterSpacing: 0.5,
          ),
        ),
        centerTitle: false,
        iconTheme: const IconThemeData(color: Color(0xFF1B8057)),
      ),
      body: danhMucList.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(10.0),
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 8,
                  mainAxisSpacing: 8,
                  childAspectRatio: 1.0,
                ),
                itemCount: danhMucList.length,
                itemBuilder: (context, index) {
                  final danhMuc = danhMucList[index];
                  return CategoryCard(
                    tenDanhMuc: danhMuc['tenDM'] ?? 'Không có tên',
                    anhDM:
                        danhMuc['anhDM'] ?? 'https://via.placeholder.com/150',
                    onTap: () {
                      // Chuyển sang màn hình danh sách sản phẩm
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ProductListScreen(
                            categoryId: danhMuc['_id']?.toString() ?? '',
                            categoryName: danhMuc['tenDM'] ?? 'Danh mục',
                          ),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
    );
  }
}

// Widget hiển thị từng danh mục với sự kiện onTap
class CategoryCard extends StatelessWidget {
  final String tenDanhMuc;
  final String anhDM;
  final VoidCallback onTap;

  const CategoryCard({
    super.key,
    required this.tenDanhMuc,
    required this.anhDM,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap, // Khi nhấn vào sẽ chuyển màn hình
      child: Card(
        color: const Color(0xFF1B8057),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.all(2.0),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.network(
                  anhDM,
                  height: 65,
                  width: 65,
                  fit: BoxFit.contain,
                  errorBuilder: (context, error, stackTrace) => const Icon(
                      Icons.broken_image,
                      size: 50,
                      color: Colors.white),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              child: Text(
                tenDanhMuc,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
