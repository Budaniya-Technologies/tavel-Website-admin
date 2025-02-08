import BarGraph from "./BarGraph";
import Chart from "./Chart";
import Graph from "./PaiChart";
import StatsGrid from "./StatsGrid";

const Dashboard = () => {
  return (
    <>
      {/* Dashboard Heading */}
      <h1 className="font-bold text-gray-800 text-center mt-12 mb-8" style={{display: 'flex',justifyContent: 'center', marginBottom: '2.5rem', marginTop: '100px', color: 'blue'}}>
        Dashboard
      </h1>

      {/* Dashboard Layout */}
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start py-10">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Stats Grid */}
            <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
              <StatsGrid />
            </div>

            {/* Chart */}
            <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
              <Chart />
            </div>

            {/* Bar Graph */}
            <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
              <BarGraph />
            </div>

            {/* Pie Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Graph />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
