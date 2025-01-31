import BarGraph from "./BarGraph";
import Chart from "./Chart";
import Graph from "./PaiChart";
import StatsGrid from "./StatsGrid";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-25">
      <h1 className="text-4xl font-bold text-gray-800 text-center" style={{marginTop: '120px'}}>
       Dashboard
      </h1>
      
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <StatsGrid />
          </div>
          
          {/* Chart */}
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <Chart />
          </div>

          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <BarGraph />
          </div>
          
          {/* Graph */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <Graph />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
