import React from 'react'
import { Card,Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

import './Businfo.css'
const Businfo = ()=>{
    const navigator=useNavigate()
    const onsearch = () =>{
        navigator('/search1')
    }
    return(
        <div className='smart-businout'>
            <Card
                title="Enter bus No."
                variant="borderless"
                style={{
                    display:'block',
                width: 1000,
                }}
                >
                <TextField id="filled-basic" label="Bus Number" variant="filled" />
                <Button onClick={onsearch} type="primary" icon={<SearchOutlined />}>
                        Search
                </Button>
            </Card>
        </div>
    )
}
export default Businfo