import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'log_service.dart';

class AuthService {
  static const String baseUrl = "http://192.168.56.2:5000"; 

  static Future<Map<String, dynamic>> login(String email, String matKhau) async {
    final response = await http.post(
      Uri.parse("$baseUrl/api/auth/login"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"email": email, "matKhau": matKhau}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      await _saveToken(data["token"]);
      LogService.info("JWT Saved: ${data["token"]}"); 
      return {"success": true, "token": data["token"]};  
    } else {
      final errorData = jsonDecode(response.body);
      LogService.error("Login failed: ${errorData["error"]}");
      return {"success": false, "error": errorData["error"] ?? "Login failed"};
    }
  }

  static Future<Map<String, dynamic>> signUp(
      String tenNguoiDung, String email, String matKhau) async {
    final response = await http.post(
      Uri.parse("$baseUrl/api/auth/signup"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "tenNguoiDung": tenNguoiDung,
        "email": email,
        "matKhau": matKhau,
      }),
    );

    if (response.statusCode == 201) {
      final data = jsonDecode(response.body);

      
      if (data["token"] != null) {
        await _saveToken(data["token"]);
        LogService.info("JWT Saved: ${data["token"]}");
      }

      return {"success": true, "data": data};
    } else {
      final errorData = jsonDecode(response.body);
      LogService.error("Signup failed: ${errorData["error"]}");
      return {"success": false, "error": errorData["error"] ?? "Signup failed"};
    }
  }

  static Future<void> _saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString("jwt_token", token);
  }

  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString("jwt_token");
  }
}
