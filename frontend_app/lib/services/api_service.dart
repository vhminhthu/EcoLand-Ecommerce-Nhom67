import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://10.0.2.2:5000/api/danhmuc/lay";

  static Future<List<dynamic>> getDanhMuc() async {
    try {
      final response = await http.get(Uri.parse(baseUrl));

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
}

