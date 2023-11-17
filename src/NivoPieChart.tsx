// NivoPieChart.tsx

import React from 'react';
import { ResponsivePie } from '@nivo/pie';

interface PieChartData {
  id: string;
  label: string;
  value: number;
}

interface NivoPieChartProps {
  data: PieChartData[];
}

const NivoPieChart: React.FC<NivoPieChartProps> = ({ data }) => {
  return (
    <div style={{ height: '400px' }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      />
    </div>
  );
};

export default NivoPieChart;
