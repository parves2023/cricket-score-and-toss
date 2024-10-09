import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the props type
interface CricketBarChartProps {
  detailedOverHistory: { over: number; runs: number; wickets: number; }[];
}

export default class CricketBarChart extends PureComponent<CricketBarChartProps> {
  render() {
    // Access the detailedOverHistory from props
    const { detailedOverHistory } = this.props;

    // Calculate cumulative runs
    const dataWithCumulative = detailedOverHistory.map((entry, index) => ({
      ...entry,
      cumulativeRuns: detailedOverHistory.slice(0, index + 1).reduce((acc, item) => acc + item.runs, 0),
    }));
    console.log(detailedOverHistory);
    

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={dataWithCumulative}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="over" label={{ value: 'Overs', position: 'insideBottomLeft', offset: -10, dx: 100 }} />
          <YAxis label={{ value: 'Runs', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />

          <Bar dataKey="cumulativeRuns" fill="#82ca9d" name="Cumulative Runs" />
          <Bar dataKey="runs" stackId="a" fill="#413ea0" name="Runs" />
          <Bar dataKey="wickets" stackId="a" fill="#ff0000" name="Wickets" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
