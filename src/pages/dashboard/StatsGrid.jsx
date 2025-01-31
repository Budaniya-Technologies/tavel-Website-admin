import { Grid, Paper, Typography } from '@mui/material';

const stats = [
  { title: 'Total Users', value: '12,345', bgColor: '#1D4ED8', textColor: '#ffffff' },
  { title: 'Revenue', value: '$56,789', bgColor: '#10B981', textColor: '#ffffff' },
  { title: 'Orders', value: '4,567', bgColor: '#F59E0B', textColor: '#ffffff' },
  { title: 'Support Tickets', value: '1,234', bgColor: '#EF4444', textColor: '#ffffff' },
];

const StatsGrid = () => {
  return (
    <div className="flex justify-center items-center w-full mt-8">
      <Paper
        elevation={8} 
        className="text-center rounded-lg shadow-lg w-full max-w-5xl p-8"
        style={{
          backgroundColor: '#f9f9f9', 
        }}
      >
        <Grid container spacing={6}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={6} 
                className="rounded-lg"
                style={{
                  backgroundColor: stat.bgColor,
                  color: stat.textColor,
                  padding: '50px', 
                  margin: '10px', 
                }}
              >
                <Typography variant="h5" className="font-bold text-xl">
                  {stat.title}
                </Typography>
                <Typography variant="h3" className="mt-4 font-extrabold text-3xl">
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default StatsGrid;
