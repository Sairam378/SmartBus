import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import './Bus_entry.css';

const Bus_entry = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const busdetails = JSON.parse(localStorage.getItem('Busdetails')) || [];
    setBuses(busdetails);
    busdetails.forEach((bus, index) => {
      console.log(`Bus ${index + 1} -> Bus No: ${bus.busNo}, From: ${bus.from}, To: ${bus.to}`);
    });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Origin to Destination</h1>
      <div className='inner-card'>
        {buses.map((bus, index) => (
          <Card
            key={index}
            style={{ width: "55rem", marginBottom: "1.5rem", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
            type="inner"
            title={`Bus No: ${bus.busNo}`}
            extra={<p style={{ fontWeight: 600 }}>#Charge</p>}
          >
            <div className='bus_queue_box1'>
              <div className='origin1'>
                <div className='img_div1'>
                  <img className='bus-icon' src="https://www.bing.com/th?id=OIP.bNqGFugwPGn_KWDZjJLZywHaHa&w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2" alt="bus-icon" />
                </div>
                <div className='origin_text1'>From: {bus.from}</div>
              </div>
              <div className='arrow_icon1'>
                <ArrowDownOutlined />
              </div>
              <div className='origin1'>
                <div className='img_div1'>
                  <img className='bus-icon' src="https://www.bing.com/th?id=OIP.bNqGFugwPGn_KWDZjJLZywHaHa&w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2" alt="bus-icon" />
                </div>
                <div className='button_text1'>
                  <div className='origin_text1'>To: {bus.to}</div>
                  <div><button className='track-btn'>Track Bus</button></div>
                </div>
              </div>
              <div className='time1'>From source arrives by: <strong>{bus.time || "N/A"}</strong></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bus_entry;