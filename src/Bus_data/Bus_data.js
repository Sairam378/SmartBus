import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import sheets from "./Copy of Vizag_Bus_Routes_Complete(1).xlsx"; // Import file

function BusData() {
  const [busNumbers, setBusNumbers] = useState([]);
  const [fromStops, setFromStops] = useState([]);
  const [toStops, setToStops] = useState([]);
  const [viaRoutes, setViaRoutes] = useState([]);
  const [busNo, setBusNo] = useState("");
  const [busResults, setBusResults] = useState([]);
  const [stop1, setStop1] = useState("");
  const [stop2, setStop2] = useState("");
  const [exceldata,setexceldata]=useState([]);
  const [matchingBuses, setMatchingBuses] = useState([]);
  const [index_array, setmatchingindex] = useState([]); 

    const processFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(worksheet);
               
                // Store columns separately
                const busNos = parsedData.map(row => row["Route No"]);
                setexceldata(busNos);
                const fromStopsArray = parsedData.map(row => row["From"]);
                const toStopsArray = parsedData.map(row => row["To"]);
                const viaStops = parsedData.map(row => row["Via"] ? row["Via"].split(",").map(stop => stop.trim()) : []);

                setBusNumbers(busNos);
                // console.log(busNos);
                
                setFromStops(fromStopsArray);
                setToStops(toStopsArray);
                setViaRoutes(viaStops);

                // console.log("Bus Numbers:", busNos);
                // console.log("From Stops:", fromStopsArray);
                // console.log("To Stops:", toStopsArray);
                // console.log("Via Routes:", viaStops);
                // busVia(parsedData);

                localStorage.setItem("busNumbers", JSON.stringify(busNos));
                localStorage.setItem("fromStops", JSON.stringify(fromStopsArray));
                localStorage.setItem("toStops", JSON.stringify(toStopsArray));
                localStorage.setItem("viaRoutes", JSON.stringify(viaStops));
            } catch (error) {
                console.error("Error processing file", error);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    // Load file on component mount
    useEffect(() => {
        fetch(sheets)
            .then((response) => response.blob()) // Convert to blob
            .then((blob) => {
                const file = new File([blob], "Copy of Vizag_Bus_Routes_Complete(1).xlsx");
                processFile(file);
            })
            .catch((error) => console.error("Error loading file", error));
    }, []);

     // Search bus by number
     const searchByBusNo = () => {
        const index = busNumbers.indexOf(busNo);
        if (index !== -1) {
            setBusResults({
                busNo: busNumbers[index],
                from: fromStops[index],
                to: toStops[index],
                via: viaRoutes[index],
            });
        } else {
            setBusResults(null);
        }
    };

    // Search buses between two stops
    const searchByStops = () => {
        // console.log("Searching for buses between:", stop1, stop2);
    
        if (!stop1 || !stop2) {
            alert("Please enter both stops!");
            return;
        }
    
        // console.log("viaRoutes Sample:", viaRoutes.slice(0, 5)); // Check format
    
        // Filter buses that pass through both stops
        const buses = busNumbers.map((num, index) => ({
            busNo: num,
            from: fromStops[index],
            to: toStops[index],
            via: viaRoutes[index] || [], // Ensure it's an array
        })).filter(bus => 
            bus.via.includes(stop1.trim()) && bus.via.includes(stop2.trim())
        );
    
        console.log("Matching Buses:", buses);
    
        if (buses.length === 0) {
            console.warn("No buses found between these stops. Check stop names or format!");
        }
    
        setMatchingBuses(buses);
        localStorage.setItem("matchingBuses", JSON.stringify(buses));
    };

    // Bus Via
    const busVia = (a) => {
        a.forEach((bus) => {
            if (bus.Via) {
                bus.Via = bus.Via.split(",").map((stop) => stop.trim());
            }
        });

        const buses = a.filter(
            (bus) => bus.Via.includes(stop1.trim()) && bus.Stops.includes(stop2.trim())
        );

        setMatchingBuses(buses);
        // console.log("Matching Buses",setMatchingBuses(buses));
        
        localStorage.setItem("matchingBuses", JSON.stringify(buses));
    };

    return (
        <> 
        <div>
        <h1>Bus Data</h1>
        <input type="text" value={busNo} onChange={(e) => setBusNo(e.target.value)} placeholder="Enter Bus No" />
        <button onClick={searchByBusNo}>Search by Bus No</button>
        {busResults && (
            <div>
                <h2>Bus Details</h2>
                <p>Bus No: {busResults.busNo}</p>
                <p>From: {busResults.from}</p>
                <p>To: {busResults.to}</p>
                {/* <p>Via: {busResults.via.join(", ")}</p> */}
            </div>
        )}

        <input type="text" value={stop1} onChange={(e) => setStop1(e.target.value)} placeholder="Enter Stop 1" />
        <input type="text" value={stop2} onChange={(e) => setStop2(e.target.value)} placeholder="Enter Stop 2" />
        <button onClick={searchByStops}>Search by Stops</button>
        {matchingBuses.length > 0 ? (
  <ul>
    {matchingBuses.map((bus, index) => (
      <li key={index}>
        <strong>Bus No:</strong> {bus.busNo} <br />
        <strong>From:</strong> {bus.from} <br />
        <strong>To:</strong> {bus.to} <br />
        <strong>Via:</strong> {bus.via.join(", ")}
      </li>
    ))}
  </ul>
) : (
  <p>No buses found</p>
)}
    </div>
        </>
    );
}

export default BusData;

