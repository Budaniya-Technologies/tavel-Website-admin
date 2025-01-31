import { Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
  { name: 'Apr', uv: 2780, pv: 3908 },
  { name: 'May', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
  { name: 'Jul', uv: 3490, pv: 4300 },
];

const Chart = () => (
  <div className="flex justify-center items-center w-full p-4">
    <div className="w-full max-w-4xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg rounded-lg">
      
      <Paper elevation={6} className="p-6 rounded-lg shadow-md mt-10">
        <h1 className="text-white text-4xl font-semibold mb-6 text-center p-10" style={{marginTop: '25px'}}>Monthly Statistics</h1>
        
        <ResponsiveContainer width="100%" height={550} style={{marginTop: '15px'}}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="name" tick={{ fill: '#555' }} />
            <YAxis tick={{ fill: '#555' }} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ color: '#555' }} />
            <Line type="monotone" dataKey="uv" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="pv" stroke="#22c55e" strokeWidth={3} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  </div>
);

export default Chart;
