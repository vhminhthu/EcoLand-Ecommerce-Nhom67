import Navigation from "../components/Navigation";
import Header from "../components/Header"

const Dashboard = () => {
  return (
    <Navigation>
      <Header title="Report Management" />
          <div className="!pt-16 !p-4">
              <h1 className="text-2xl font-bold">DASHBOARD</h1>
                <div className="grid grid-cols-3 gap-4 !mt-4">
                  <div className="bg-white !p-5 rounded-lg shadow">
                    <h3 className="text-gray-600">Transaction</h3>
                  </div>
                  <div className="bg-white !p-5 rounded-lg shadow">
                    <h3 className="text-gray-600">Overview</h3>
                    <p>3100 new users</p>
                    <p>2931 products in total</p>
                    <p>1432 new products this week</p>
                  </div>
                  <div className="bg-white !p-5 rounded-lg shadow">
                    <h3 className="text-gray-600">Top Selling Items</h3>
                    <ul>
                      <li>Cabbage - LanLanTan</li>
                      <li>Cabbage - LanLanTan</li>
                      <li>Cabbage - LanLanTan</li>
                    </ul>
                  </div>
                </div>
          </div>
    </Navigation>
  );
};

export default Dashboard;
