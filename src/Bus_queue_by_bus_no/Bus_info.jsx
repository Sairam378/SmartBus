import React from 'react';
import { Card,Dropdown, Space, Typography, } from 'antd';
import { DownOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './Bus_info.css'


const Bus_info = () => {
  return(


    
    <div>
    <h1>Origin to Destination</h1>
          
    <div className='inner-cards'>

    <Card style={{width:"60rem", height:"17rem  "}} type="inner" title="Bus_no" extra={<p>#charge</p>}>
      {/* Inner Card content */}
      <div className='bus_queue_box'>
        <div className='origin'>
          <div className='img_div'>
            <img src="https://www.bing.com/th?id=OIP.bNqGFugwPGn_KWDZjJLZywHaHa&w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2" alt="" />
          </div>
          <div className='origin_text'>
            from origin
          </div>
        </div>
        <div className='arrow_icon'>
          <ArrowDownOutlined />
        </div>
        
        <div className='origin'>
          <div className='img_div'>
            <img src="https://www.bing.com/th?id=OIP.bNqGFugwPGn_KWDZjJLZywHaHa&w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2" alt="" />
          </div>
          <div className='button_text'>
            <div  className='origin_text'>to destination</div>
            <div><button>track bus</button></div>
          </div>
        </div>
        <div className='time'>
          from source arrives by          time
        </div>
      </div>
    </Card>
    <Card style={{width:"60rem", height:"17rem  "}} type="inner" title="Bus_no" extra={<p>#charge</p>}>
      {/* Inner Card content */}
      <div className='bus_queue_box'>
        <div className='origin'>
          <div className='img_div'>
            <img src="https://www.bing.com/th?id=OIP.bNqGFugwPGn_KWDZjJLZywHaHa&w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2" alt="" />
          </div>
          <div className='origin_text'>
            from origin
          </div>
        </div>
        <div className='arrow_icon'>
          <ArrowDownOutlined />
        </div>
        
        <div className='origin'>
          <div className='img_div'>
            <img src="https://www.bing.com/th?id=OIP.bNqGFugwPGn_KWDZjJLZywHaHa&w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2" alt="" />
          </div>
          <div className='button_text'>
            <div  className='origin_text'>to destination</div>
            <div><button>track bus</button></div>
          </div>
        </div>
        <div className='time'>
          from source arrives by          time
        </div>
      </div>
    </Card>
    
        </div>
      </div>
)
}

export default Bus_info;