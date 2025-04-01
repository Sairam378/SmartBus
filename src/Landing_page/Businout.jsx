import React, { useState } from 'react'
import { Card,Button } from 'antd';
import { SearchOutlined,SwapOutlined } from '@ant-design/icons';
import TextField from '@mui/material/TextField';
import './Businout.css'
import { useNavigate } from 'react-router-dom';

const Businout = ()=>{
    const [start,setStart]=useState()
    const [dest,setDest]=useState()

    const Busqueue = ()=>{
        if(start !== dest)
        {
            let temp = start 
            setStart(dest)
            setDest(temp)
            
        }
    }

    const navigator=useNavigate()
    const onsearch =() =>{
        navigator('/search2')
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
                <TextField id="filled-basic" value ={start} label="Choose start location" variant="filled" onChange={(e)=>{setStart(e.target.value)}}/>
                <div className='favicon'onClick={Busqueue}>
                    <SwapOutlined />
                </div>
                <TextField id="filled-basic" value = {dest} label="Choose destination" variant="filled" onChange={(e)=>{setDest(e.target.value)}}/>
                <Button onClick={onsearch} type="primary" icon={<SearchOutlined />}>
                        Search
                </Button>
            </Card>
            
        </div>
    )
}
export default Businout