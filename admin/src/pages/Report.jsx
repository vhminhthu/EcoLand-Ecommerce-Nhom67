import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

export default function ReportManagement() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 3;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`/api/baocao/all`);
        setReports(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleFeedbackSubmit = async () => {
    if (!selectedReport) return;
    try {
      await axios.patch(`/api/baocao/update/${selectedReport._id}`, {
        phanHoi: feedback,
        trangThai: "Đã phản hồi",
      });
      
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === selectedReport._id ? { ...report, phanHoi: feedback, trangThai: "Đã phản hồi" } : report
        )
      );
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Lỗi cập nhật báo cáo:", err);
    }
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  return (
    <Navigation>
      <Header title="Quản lý báo cáo" />
      <div className="!pt-16 !p-4">
        <div className="!p-6">
          <h1 className="text-2xl font-bold !mb-4">Quản lý báo cáo</h1>

          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              <div className="overflow-hidden border rounded-lg">
                <table className="w-full border-collapse bg-white">
                  <thead className="bg-green-800 text-white">
                    <tr>
                      <th className="!p-3 text-left">Tên người dùng</th>
                      <th className="!p-3 text-left">Loại báo cáo</th>
                      <th className="!p-3 text-left">Trạng thái</th>
                      <th className="!p-3 text-left">Ngày tạo</th>
                      <th className="!p-3 text-left">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReports.map((report) => (
                      <tr key={report._id} className="border-b">
                        <td className="!p-3">{report.idNguoiDung?.tenNguoiDung || "Không rõ"}</td>
                        <td className="!p-3">{report.loaiBaoCao}</td>
                        <td className="!p-3">
                          <span className="bg-gray-200 text-gray-800 !px-3 !py-1 rounded-lg">
                            {report.trangThai}
                          </span>
                        </td>
                        <td className="!p-3">{report.createdAt}</td>
                        <td className="!p-3">
                          <button
                            className="text-green-700 underline"
                            onClick={() => setSelectedReport(report)}
                          >
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="!mt-4 flex justify-center gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-gray-300 !px-3 !py-1 rounded-lg disabled:opacity-50"
                >
                  Trước
                </button>
                <span>Trang {currentPage}</span>
                <button
                  onClick={() => setCurrentPage((prev) => (indexOfLastReport < reports.length ? prev + 1 : prev))}
                  disabled={indexOfLastReport >= reports.length}
                  className="bg-gray-300 !px-3 !py-1 rounded-lg disabled:opacity-50"
                >
                  Sau
                </button>
              </div>

              {selectedReport && (
                <div className="!mt-4 !p-4 border rounded-lg bg-gray-100">
                  <h2 className="text-lg font-bold text-green-800">Nội dung</h2>
                  <p className="bg-white !p-3 rounded-lg !mt-2 text-gray-700">
                    {selectedReport.noiDung}
                  </p>
                  <div className="!mt-3 flex gap-2">
                    <button
                      className="bg-green-700 text-white !px-4 !py-2 rounded-lg"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Phản hồi
                    </button>
                  </div>
                </div>
              )}

              {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center shadow-2xl">
                  <div className="bg-white !p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold">Nhập phản hồi</h2>
                    <textarea
                      className="w-full !px-10 !py-8 border rounded-lg !mt-2"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                    <div className="!mt-4 flex gap-2">
                      <button
                        className="bg-green-700 text-white !px-4 !py-2 rounded-lg"
                        onClick={handleFeedbackSubmit}
                      >
                        Lưu
                      </button>
                      <button
                        className="bg-gray-400 text-white !px-4 !py-2 rounded-lg"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Navigation>
  );
}
