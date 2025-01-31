import React from 'react';
import { Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const BarGraph = () => {
  return (
    <div className="flex justify-center items-center w-full p-10">
      <div className="w-full max-w-7xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg rounded-lg">
        
        <Paper 
          elevation={6} 
          className="p-10 rounded-lg shadow-md w-full"
          style={{ margin: '30px auto', maxWidth: '1600px' }} 
        >
          <Typography 
            variant="h5" 
            className="font-bold mb-8 text-center"
            style={{ fontSize: '2rem', fontWeight: 'bold', padding: '10px' }}
          >
            Monthly Sales Data
          </Typography>
          
          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </div>
    </div>
  );
};

export default BarGraph;
