import React from 'react'
import Navbar from '../Landing_page/Navbar'
import Businfo from '../Landing_page/Businfo'
import Businout from '../Landing_page/Businout'


const Herosection = ()=>{
    return(
        <div>
            <Navbar/>
            <Businfo/> 
            <Businout/>
            {/* <Bus_queue_header/>
            <Bus_info/> */}
        </div>
    )
}
export default Herosection