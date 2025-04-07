import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import './Bus_info.css';

const Bus_info = () => {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem('busResults'));
      if (Array.isArray(storedData)) {
        setBusData(storedData);
      } else if (storedData) {
        setBusData([storedData]);
      }
    } catch (error) {
      console.error('Error parsing bus results:', error);
    }
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Origin to Destination</h1>
      <div className='inner-cards'>
        {busData.map((bus, index) => (
          <Card
            key={index}
            style={{ width: '60rem', height: '17rem', marginBottom: '2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            type="inner"
            title={`Bus No: ${bus.busNo}`}
            extra={<p>#charge</p>}
          >
            <div className='bus_queue_box'>
              <div className='origin'>
                <div className='img_div'>
                  <img src="https://www.bing.com/th?id=OIP.bNqGFugwPGn_KWDZjJLZywHaHa&w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2" alt="bus-icon" />
                </div>
                <div className='origin_text'>From: {bus.from}</div>
              </div>

              <div className='arrow_icon'>
                <ArrowDownOutlined />
              </div>

              <div className='origin'>
                <div className='img_div'>
                  <img src="https://www.bing.com/th?id=OIP.bNqGFugwPGn_KWDZjJLZywHaHa&w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2" alt="bus-icon" />
                </div>
                <div className='button_text'>
                  <div className='origin_text'>To: {bus.to}</div>
                  <div><button className='track-btn'>Track Bus</button></div>
                </div>
              </div>

              <div className='time'>From source arrives by: <strong>{bus.time || 'N/A'}</strong></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bus_info;
