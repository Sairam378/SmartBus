import React from "react";
import './About.css'

const About = () =>{
    return(
        <div>
            <div className="smart_quote1">
                <div className="smart_quote_img">
                    <img src="https://chalo.com/assets/images/app-banner.png" alt="" />
                </div>

                <div className="smart_quote_text">
                    <p className="text_1">Never wait at the bus stop ever again </p>
                    <h1 className="text_2">Smart Bus</h1>
                    <p className="text_3">Say hello to the world’s most advanced Passenger Information System (PIS) and mobile ticketing platform.
                    Smart Bus is a free web application that allows you to live track your bus and tells you at what time your bus will reach your stop.
                     Now you never have to wait at a bus stop ever again.</p>
                </div>
            </div>
            <div>
                <p className="text_1"> smarter travel</p>
                <h1 className="text_2">Smart Bus App Features</h1>
            </div>
            <div className="smart_quote2">
                <div className="smart_quote_text">
                    <h1>Track your bus live</h1>
                    <p className="text_3">See the exact location of your bus, know its live arrival time, and leave for the bus stop just a few minutes before your bus arrives. You never have to wait at the bus stop again, and never miss your bus again either.</p>
                </div>
                <div className="smart_quote_img1">
                    <img src="https://chalo.com/assets/images/app-track-bus.png" alt="" />
                </div>
            </div>
            <div className="footer">
                <div className="footer_text">
                   <h2>Contact Us</h2>
                    <p>F-611 Tower 2, Seawoods Grand Central,
                        Navi Mumbai 400706 India
                        Corporate Identification Number (CIN): U72900MH2014PTC254181

                        100 Peck Seah street, #08-14 PS100,
                        Singapore 079333
                        Unique Entity Number (UEN): 201438158H

                        Email: contact@chalo.com
                    </p>
                </div>
                    
                <div className="footer_text">
                    <h2>Social Connect</h2>
                </div>

                <div className="footer_text">
                    <h2>Terms and Conditions</h2>
                    <p>Copyright © Chalo Mobility Private Limited. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default About