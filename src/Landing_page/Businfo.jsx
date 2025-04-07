import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TextField from "@mui/material/TextField";
import * as XLSX from "xlsx";
import sheets from "../Bus_data/Copy of Vizag_Bus_Routes_Complete(1).xlsx"; 
import "./Businfo.css";
import { useNavigate } from "react-router-dom";

const Businfo = () => {
    const nav = useNavigate()
    const [busNumbers, setBusNumbers] = useState([]);
    const [fromStops, setFromStops] = useState([]);
    const [toStops, setToStops] = useState([]);
    const [viaRoutes, setViaRoutes] = useState([]);
    const [busNo, setBusNo] = useState("");
    const [busResults, setBusResults] = useState(null);

    useEffect(() => {
        fetch(sheets)
            .then((response) => response.blob())
            .then((blob) => {
                const file = new File([blob], "Copy of Vizag_Bus_Routes_Complete(1).xlsx");
                processFile(file);
            })
            .catch((error) => console.error("Error loading file", error));
    }, []);

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

    const searchByBusNo = () => {
        const index = busNumbers.indexOf(busNo);
        if (index !== -1) {
            console.log("Index found:", index);
            console.log("Bus No:", busNumbers[index]);
            console.log("From:", fromStops[index]);
            console.log("To:", toStops[index]);
            console.log("Via:", viaRoutes[index]);
            
            setBusResults({
                busNo: busNumbers[index],
                from: fromStops[index],
                to: toStops[index],
                via: viaRoutes[index],
            });
            nav('/search1');
        } else {
            console.warn("Bus not found!");
            setBusResults(null);
        }
    };
    localStorage.setItem('BusResults',JSON.stringify(busResults));
    

    return (
        <div className="smart-businout-1">
            <Card title="Enter bus No." variant="borderless" style={{ display: "block", width: 1000 }}>
                <TextField 
                    id="filled-basic" 
                    label="Bus Number" 
                    variant="filled" 
                    value={busNo} 
                    onChange={(e) => setBusNo(e.target.value)}
                />
                <Button onClick={searchByBusNo} type="primary" icon={<SearchOutlined />}>
                    Search
                </Button>

                {/* {busResults !== null && (
                    <div>
                        <h2>Bus Details</h2>
                        <p><strong>Bus No:</strong> {busResults.busNo}</p>
                        <p><strong>From:</strong> {busResults.from}</p>
                        <p><strong>To:</strong> {busResults.to}</p>
                        <p><strong>Via:</strong> {busResults.via.join(", ")}</p>
                    </div>
                )} */}
            </Card>
        </div>
    );
};

export default Businfo;
