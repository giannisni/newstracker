import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from './LineChart.tsx';
import Header from './Header.tsx';
import LegendTable from './LegendTable.tsx';
import KeywordSelector from './KeywordSelector';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './App.css';

interface Data {
  x: string;
  y: number;
}

const sortByDate = (a: Data, b: Data) => {
  const dateA = new Date(a.x);
  const dateB = new Date(b.x);
  return dateA.getTime() - dateB.getTime();
};

function App() {
  const [data1, setData1] = useState<Data[]>([]);
  const [data2, setData2] = useState<Data[]>([]);
  const [data3, setData3] = useState<Data[]>([]);
  const [data4, setData4] = useState<Data[]>([]);
  const [data5, setData5] = useState<Data[]>([]);
  const [data6, setData6] = useState<Data[]>([]);
  const [data7, setData7] = useState<Data[]>([]);
  const [data8, setData8] = useState<Data[]>([]);

  const [selectedKeywords1, setSelectedKeywords1] = useState([]);
  const [selectedKeywords2, setSelectedKeywords2] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-06-25'),
    key: 'selection',
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState);
  };

  const baseUrl = "192.168.1.29";
  

  useEffect(() => {
    // Fetch data based on date range and keywords
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://localhost:8080/api/news/counts?keyword=Μητσοτάκης&startDate=${dateRange.startDate.toISOString().substring(0, 10)}&endDate=${dateRange.endDate.toISOString().substring(0, 10)}`);
        const newData1 = Object.entries(response1.data)
          .map(([x, y]) => ({ x, y: Number(y) }))
          .sort(sortByDate);
        setData1(newData1);

        const response2 = await axios.get(`http://localhost:8080/api/news/counts?keyword=Τσίπρας&startDate=${dateRange.startDate.toISOString().substring(0, 10)}&endDate=${dateRange.endDate.toISOString().substring(0, 10)}`);
        const newData2 = Object.entries(response2.data)
          .map(([x, y]) => ({ x, y: Number(y) }))
          .sort(sortByDate);
        setData2(newData2);

        const response3 = await axios.get(`http://localhost:8080/api/news/counts?keyword=Βαρουφάκης&startDate=${dateRange.startDate.toISOString().substring(0, 10)}&endDate=${dateRange.endDate.toISOString().substring(0, 10)}`);
        const newData3 = Object.entries(response3.data)
          .map(([x, y]) => ({ x, y: Number(y) }))
          .sort(sortByDate);
        setData3(newData3);

        const response4 = await axios.get(`http://localhost:8080/api/news/counts?keyword=Κουτσούμπας&startDate=${dateRange.startDate.toISOString().substring(0, 10)}&endDate=${dateRange.endDate.toISOString().substring(0, 10)}`);
        const newData4 = Object.entries(response4.data)
          .map(([x, y]) => ({ x, y: Number(y) }))
          .sort(sortByDate);
        setData4(newData4);

        const response5 = await axios.get(`http://localhost:8080/api/news/counts?keyword=Ανδρουλάκης&startDate=${dateRange.startDate.toISOString().substring(0, 10)}&endDate=${dateRange.endDate.toISOString().substring(0, 10)}`);
        const newData5 = Object.entries(response5.data)
          .map(([x, y]) => ({ x, y: Number(y) }))
          .sort(sortByDate);
        setData5(newData5);

        


        const response6 = await axios.get(`http://localhost:8080/api/news/counts?keyword=τέμπη&startDate=${dateRange.startDate.toISOString().substring(0, 10)}&endDate=${dateRange.endDate.toISOString().substring(0, 10)}`);
        const newData6 = Object.entries(response6.data)
          .map(([x, y]) => ({ x, y: Number(y) }))
          .sort(sortByDate);
        setData6(newData6);

        const response7 = await axios.get(`http://localhost:8080/api/news/counts?keyword=Δήμητρα&startDate=${dateRange.startDate.toISOString().substring(0, 10)}&endDate=${dateRange.endDate.toISOString().substring(0, 10)}`);
        const newData7 = Object.entries(response7.data)
          .map(([x, y]) => ({ x, y: Number(y) }))
          .sort(sortByDate);
        setData7(newData7);

        const response8 = await axios.get(`http://localhost:8080/api/news/counts?keyword=Κωνσταντοπούλου&startDate=${dateRange.startDate.toISOString().substring(0, 10)}&endDate=${dateRange.endDate.toISOString().substring(0, 10)}`);
        const newData8 = Object.entries(response8.data)
          .map(([x, y]) => ({ x, y: Number(y) }))
          .sort(sortByDate);
        setData8(newData8);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dateRange]);

  const [fore, setFore] = useState('');
  const handleKeywordSelection1 = async (keyword, isSelected) => {
    if (isSelected && selectedKeywords1.length < 2) {
      setSelectedKeywords1((prevKeywords) => [...prevKeywords, keyword]);
  
      setFore(selectedKeywords1[0])      // If two keywords are selected, fetch forecast
      if (selectedKeywords1.length === 1) {
        try {
          const response = await axios.get(`http://localhost:8080/api/news/forecast`, {
              params: {
                  keyword1: selectedKeywords1[0],
                  keyword2: keyword,
                  
                  startDate: dateRange.startDate.toISOString().substring(0, 10),
                  endDate: dateRange.endDate.toISOString().substring(0, 10)
              }
          });
  
          console.log(response.data);
  
          // Assuming the forecast endpoint returns a single forecast value
          const forecastValue = response.data;
  
          const endDate = new Date(dateRange.endDate.toISOString());
          endDate.setDate(endDate.getDate() + 1);
          const forecastDate = endDate.toISOString().split('T')[0];
          const forecastData = {x: forecastDate, y: Number(forecastValue)};
  
          console.log(forecastData);

          console.log(selectedKeywords1[0]);

          // Add the forecast data to the corresponding dataset

          
          if (selectedKeywords1[0] === 'Μητσοτάκης') {
            setData1([...data1, forecastData]);
          } else if (selectedKeywords1[0] === 'Τσίπρας') {
            console.log("mala");
            setData2([...data2, forecastData]);
          } else if (selectedKeywords1[0] === 'Βαρουφάκης') {
            console.log("mala");
            setData3([...data3, forecastData]);
          } else if (selectedKeywords1[0] === 'Κουτσουμπας') {
            console.log("mala");
            setData4([...data4, forecastData]);
          } else if (selectedKeywords1[0] === 'Ανδρουλάκης') {
            console.log("mala");
            setData5([...data5, forecastData]);
          } else if (selectedKeywords1[0] === 'Κωνσταντοπούλου') {
            console.log("mala");
            setData6([...data6, forecastData]);
          }
          
          
          console.log(data2);
          console.log(data1);

          // Add additional else if blocks for other keywords
  
        } catch (error) {
          console.error(error);
        }
      }
    } else if (!isSelected) {
      setSelectedKeywords1((prevKeywords) => prevKeywords.filter((k) => k !== keyword));
    } else {
      alert("You can only select up to 2 keywords");
    }
  };
  






  const handleKeywordSelection2 = async (keyword, isSelected) => {
    if (isSelected) {
      setSelectedKeywords2((prevKeywords) => [...prevKeywords, keyword]);
    } else {
      setSelectedKeywords2((prevKeywords) => prevKeywords.filter((k) => k !== keyword));
    }
  };

  const filterChartData = (chartData, selectedKeywords) => {
    if (selectedKeywords.length === 0) {
      return chartData;
    }
    return chartData.filter((dataPoint) => selectedKeywords.includes(dataPoint.label));
  };


  const [correlation, setCorrelation] = useState(null);


  const [forecastedCount, setForecastedCount] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    if (selectedKeywords1.length === 2) {
      try {
        const responseCorrelation = await axios.get(`http://localhost:8080/api/news/correlation`, {
          params: {
            keyword1: selectedKeywords1[0],
            keyword2: selectedKeywords1[1],
            startDate: dateRange.startDate.toISOString().substring(0, 10),
            endDate: dateRange.endDate.toISOString().substring(0, 10)
          }
        });

        const responseForecast = await axios.get(`http://localhost:8080/api/news/forecast`, {
          params: {
            keyword1: selectedKeywords1[0],
            keyword2: selectedKeywords1[1],
            startDate: dateRange.startDate.toISOString().substring(0, 10),
            endDate: dateRange.endDate.toISOString().substring(0, 10)
          }
        });

        setCorrelation(responseCorrelation.data);
        setForecastedCount(Math.round(responseForecast.data)); // Assuming the response is a single number
      } catch (error) {
        console.error(error);
      }
    }
  };

  fetchData();
}, [selectedKeywords1, dateRange.startDate, dateRange.endDate]);

// LegendTable component
const LegendTable = ({ items, className }) => {
  return (
    <table className={className}>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td><div style={{backgroundColor: item.color, width: '20px', height: '20px'}} /></td>
            <td>{item.label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

  return (
    <div>
      <Header text="ΜΗΤΣΟtracker" />
      <KeywordSelector
        selectedKeywords={selectedKeywords1}
        handleKeywordSelection={handleKeywordSelection1}
      />
      <div>
        <button onClick={toggleVisibility}>Select date range</button>
        {isVisible && (
         <div className={isVisible ? "datepicker-container" : ""}>
         {isVisible && (
           <DateRangePicker
             ranges={[dateRange]}
             onChange={(ranges) => setDateRange(ranges.selection)}
           />
         )}
       </div>
       
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="correlation">
            <span>Correlation: {correlation}</span>
          </div>
          
        </div>
        <div className="forecast">
            <span>Next day for {fore}:  {forecastedCount}</span>
        </div>
        
        
      <div className="chart-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <LineChart
        id="chart1"
        data={filterChartData([
        { label: 'Μητσοτάκης', data: data1, color: '#0088cc' },
        { label: 'Τσίπρας', data: data2, color: '#ffb5b5' },
        { label: 'Βαρουφάκης', data: data3, color: '#f96d00' },
        { label: 'Κουτσούμπας', data: data4, color: '#ff0000' },
        { label: 'Ανδρουλάκης', data: data5, color: '#00cc00' },
        { label: 'Κωνσταντοπούλου', data: data8, color: '#c54c82' }
        ], selectedKeywords1)}
    />

    <LegendTable
        className="legend-table"
        items={[
        { color: '#0088cc', label: 'Μητσοτάκης' },
        { color: '#ffb5b5', label: 'Τσίπρας' },
        { color: '#c54c82', label: 'Κωνσταντοπούλου' },
        { color: '#f96d00', label: 'Βαρουφάκης' },
        { color: '#ff0000', label: 'Κουτσούμπας' },
        { color: '#00cc00', label: 'Ανδρουλάκης' },
        ]}
    />
</div>

<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <LineChart
        id="chart2"
        data={filterChartData([
        { label: 'Κωνσταντοπούλου', data: data8, color: '#c54c82' },
        ], selectedKeywords2)}
    />
    <LegendTable className="legend-table"
        items={[
        { color: '#c54c82', label: 'Κωνσταντοπούλου' },
        ]}
    />
</div>

<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <LineChart className="line-chart"
        id="chart3"
        data={filterChartData([
        { label: 'Κουτσούμπας', data: data4, color: '#ff0000' },
        ], selectedKeywords2)}
    />
    <LegendTable  className="legend-table"
        items={[
        { color: '#ff0000', label: 'Κουτσούμπας' },
        ]}
    />
</div>

<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <LineChart
        id="chart4"
        data={filterChartData([
        { label: 'Τέμπη', data: data6, color: '#8A2BE2' },
        ], selectedKeywords2)}
    />
    <LegendTable  className="legend-table"
        items={[
        { color: '#8A2BE2', label: 'Τέμπη' },
        ]}
    />
</div>

        
      </div>
    </div>
  );
}

export default App;
