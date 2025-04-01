import React from 'react';
import { Card,Dropdown, Space, Typography } from 'antd';
import { DownOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './Bus_entry.css'

const items = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
  {
    key: '3',
    label: 'Item 3',
  },
];
const Bus_entry = () => {
  return(

    
    <div>
    <h1>Origin to Destination</h1>
          <Dropdown
          menu={{
            items,
            selectable: true,
            defaultSelectedKeys: ['3'],
          }}
          >
          <Typography.Link>
            <Space>
              Select Bus Number
              <DownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
    <div className='inner-card'>

    <Card style={{width:"60rem", height:"17rem  "}} type="inner" title="Bus_no" extra={<p>#charge</p>}>
      {/* Inner Card content */}
      <div className='bus_queue_box1'>
        <div className='origin1'>
          <div className='img_div1'>
            <img src="https://www.bing.com/th?id=OIP.bNqGFugwPGn_KWDZjJLZywHaHa&w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2" alt="" />
          </div>
          <div className='origin_text1'>
            from origin
          </div>
        </div>
        <div className='arrow_icon1'>
          <ArrowDownOutlined />
        </div>
        
        <div className='origin1'>
          <div className='img_div1'>
            <img src="https://www.bing.com/th?id=OIP.bNqGFugwPGn_KWDZjJLZywHaHa&w=195&h=211&c=8&rs=1&qlt=90&o=6&cb=15&dpr=1.3&pid=3.1&rm=2" alt="" />
          </div>
          <div className='button_text1'>
            <div  className='origin_text1'>to destination</div>
            <div><button>track bus</button></div>
          </div>
        </div>
        <div className='time1'>
          from source arrives by          time
        </div>
      </div>
    </Card>
    
        </div>
      </div>
)
}

export default Bus_entry;