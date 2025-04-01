import './App.css';
import Bus_info_herosection from './Bus_queue_by_bus_no/Bus_info_herosection';
import Bus_entry_herosection from './Bus_queue_by_bus_entries/Bus_entry_herosection';
import Herosection from './Herosection/Herosection';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar_herosection from './Navbar_items/Navbar_herosection';
import Bus_data  from '../src/Bus_data/Bus_data';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Bus_data/>}/>
        {/* <Route path='/' element={<Herosection/>}/>
        <Route path='/search1' element={<Bus_info_herosection/>}/>
        <Route path='/search2' element={<Bus_entry_herosection/>}/>
        <Route path='/about' element={<Navbar_herosection/>}/>
        <Route path='/home' element={<Herosection/>}/>  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;