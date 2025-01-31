import { Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Groceries', value: 300 },
  { name: 'Books', value: 200 },
];

const COLORS = ['#4f46e5', '#34d399', '#f87171', '#fbbf24'];

const Graph = () => (
  <div className="flex justify-center items-center w-full p-4">
    <div className="w-full max-w-7xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg rounded-lg">
      
      <Paper 
        elevation={6} 
        className="p-6 rounded-lg shadow-md w-full"
        style={{ margin: '30px auto', maxWidth: '1600px' }} 
      >
        <Typography 
          variant="h5" 
          className="font-bold mb-8 text-center"
          style={{ fontSize: '2rem', fontWeight: 'bold' }}
        >
          Sales Distribution
        </Typography>
        
        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
            <Legend verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  </div>
);

export default Graph;
