import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "192.168.56.1:5000";

  static Future<List<dynamic>> getDanhMuc() async {
    try {
      final response =
          await http.get(Uri.parse("http://$baseUrl/api/danhmuc/lay"));

      if (response.statusCode == 200) {
        var jsonData = jsonDecode(response.body);
        if (jsonData is List) {
          return jsonData;
        } else {
          throw Exception("Dữ liệu trả về không đúng định dạng!");
        }
      } else {
        throw Exception("Lỗi khi tải danh mục: ${response.statusCode}");
      }
    } catch (e) {
      throw Exception("Không thể kết nối đến server: $e");
    }
  }

  static Future<List<dynamic>> getProductsByCategory(String categoryId) async {
    try {
      final response = await http.get(
          Uri.parse("http://$baseUrl/api/sanpham/get/category/$categoryId"));

      if (response.statusCode == 200) {
        var jsonData = jsonDecode(response.body);

        // Kiểm tra nếu jsonData là một Map và có key 'data'
        if (jsonData is Map && jsonData.containsKey('data')) {
          return jsonData['data'] as List<dynamic>;
        } else {
          throw Exception("Dữ liệu trả về không đúng định dạng!");
        }
      } else {
        throw Exception("Lỗi khi tải sản phẩm: ${response.statusCode}");
      }
    } catch (e) {
      throw Exception("Không thể kết nối đến server: $e");
    }
  }
}
