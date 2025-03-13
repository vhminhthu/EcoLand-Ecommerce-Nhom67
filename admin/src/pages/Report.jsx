import { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

const reports = [
  { id: 1, name: "Mintu", type: "Khiếu nại", status: "Đang chờ", content: "Nội dung báo cáo của Mintu." },
  { id: 2, name: "Tiên", type: "Lừa đảo", status: "Đang chờ", content: "Nội dung báo cáo của Tiên." },
  { id: 3, name: "Nguyễn Văn A", type: "Lừa đảo", status: "Đang chờ", content: "Nội dung báo cáo của Nguyễn Văn A." },
  { id: 4, name: "Bình", type: "Khiếu nại", status: "Đang chờ", content: "Nội dung báo cáo của Bình." },
  { id: 5, name: "Hà", type: "Lừa đảo", status: "Đang chờ", content: "Nội dung báo cáo của Hà." },
  { id: 6, name: "Nam", type: "Lừa đảo", status: "Đang chờ", content: "Nội dung báo cáo của Nam." }
];

export default function ReportManagement() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 3;

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  return (
    <Navigation>
      <Header title="Report Management" />
      <div className="!pt-16 !p-4">
        <div className="!p-6">
          <h1 className="text-2xl font-bold !mb-4">Quản lý báo cáo</h1>
          <div className="overflow-hidden border rounded-lg">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="!p-3 text-left">Tên người dùng</th>
                  <th className="!p-3 text-left">Loại báo cáo</th>
                  <th className="!p-3 text-left">Trạng thái</th>
                  <th className="!p-3 text-left">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report) => (
                  <tr key={report.id} className="border-b">
                    <td className="!p-3">{report.name}</td>
                    <td className="!p-3">{report.type}</td>
                    <td className="!p-3">
                      <span className="bg-gray-200 text-gray-800 !px-3 !py-1 rounded-lg">
                        {report.status}
                      </span>
                    </td>
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
                {selectedReport.content}
              </p>
              <div className="!mt-3 flex gap-2">
                <button className="bg-green-700 text-white !px-4 !py-2 rounded-lg">Phản hồi</button>
                <button className="bg-red-700 text-white !px-4 !py-2 rounded-lg">Từ chối</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Navigation>
  );
}
