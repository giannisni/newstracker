import React from 'react';

interface LegendTableProps {
  items: { color: string; label: string }[];
}

const LegendTable: React.FC<LegendTableProps> = ({ items }) => {
  return (
    <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>
              <div
                style={{
                  backgroundColor: item.color,
                  width: '20px',
                  height: '20px',
                  marginRight: '10px',
                }}
              ></div>
            </td>
            <td>{item.label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LegendTable;
