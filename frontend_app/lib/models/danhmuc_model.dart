class DanhMuc {
  final String id;
  final String tenDM;

  DanhMuc({required this.id, required this.tenDM});

  // Chuyển từ JSON sang object
  factory DanhMuc.fromJson(Map<String, dynamic> json) {
    return DanhMuc(
      id: json['_id'] ?? '',
      tenDM: json['tenDM'] ?? '',
    );
  }
}
