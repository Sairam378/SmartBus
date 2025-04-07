import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { SearchOutlined, SwapOutlined } from '@ant-design/icons';
import TextField from '@mui/material/TextField';
import './Businout.css';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import sheets from '../Bus_data/Copy of Vizag_Bus_Routes_Complete(1).xlsx';

const Businout = () => {
    const navigate=useNavigate();
    const [start, setStart] = useState("");
    const [dest, setDest] = useState("");
    const [busNumbers, setBusNumbers] = useState([]);
    const [fromStops, setFromStops] = useState([]);
    const [toStops, setToStops] = useState([]);
    const [viaRoutes, setViaRoutes] = useState([]);
    
    const processFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(worksheet);
                
                const busNos = parsedData.map(row => row["Route No"]);
                const fromStopsArray = parsedData.map(row => row["From"]);
                const toStopsArray = parsedData.map(row => row[" To"]);
                const viaStops = parsedData.map(row => row["Via"] ? row["Via"].split(",").map(stop => stop.trim()) : []);
                
                setBusNumbers(busNos);
                setFromStops(fromStopsArray);
                setToStops(toStopsArray);
                setViaRoutes(viaStops);
            } catch (error) {
                console.error("Error processing file", error);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    useEffect(() => {
        fetch(sheets)
            .then((response) => response.blob())
            .then((blob) => {
                const file = new File([blob], "Vizag_Bus_Routes_Complete.xlsx");
                processFile(file);
            })
            .catch((error) => console.error("Error loading file", error));
    }, []);

    const searchByStops = () => {
        if (!start || !dest) {
            alert("Please enter both stops!");
            return;
        }
        
        const buses = busNumbers.map((num, index) => ({
            busNo: num,
            from: fromStops[index],
            to: toStops[index],
            via: viaRoutes[index] || [],
        })).filter(bus => 
            bus.via.includes(start.trim()) && bus.via.includes(dest.trim())
        );
        localStorage.setItem("Busdetails",JSON.stringify(buses));
        
        console.log("Matching Buses:", buses);
        buses.forEach((bus, index) => {
            console.log(`Bus ${index + 1}:`);
            console.log(`Bus No: ${bus.busNo}`);
            console.log(`From: ${bus.from}`);
            console.log(`To: ${bus.to}`);
            console.log(`Via: ${bus.via.join(", ")}`);
        });
        navigate('/search2')
    };

    const swapLocations = () => {
        setStart(dest);
        setDest(start);
    };

    return (
        <div className='smart-businout'>
            <Card title="Enter Bus Stops" variant="borderless" style={{ display: 'block', width: 1000 }}>
                <TextField id="start-location" value={start} label="Choose start location" variant="filled" onChange={(e) => setStart(e.target.value)} />
                <div className='favicon' onClick={swapLocations}>
                    <SwapOutlined />
                </div>
                <TextField id="destination" value={dest} label="Choose destination" variant="filled" onChange={(e) => setDest(e.target.value)} />
                <Button onClick={searchByStops} type="primary" icon={<SearchOutlined />}>Search</Button>
            </Card>
        </div>
    );
};

export default Businout;
