

import React from "react";

import "../css/style.css";

function Contact() {

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-12 text-center" >
                    <h1 className="mt-4" style={{ color: 'red', fontStyle: 'bold' }}>Contact information</h1>
                    <hr style={{
                        backgroundColor: 'red', height: '15px'
                    }}></hr>
                    <h1 className="mt-4" style={{ color: 'green', fontStyle: 'bold' }}>Email: tkemaladzenino71@gmail.com</h1>
                    <br />
                    <br />

                    <h1>Phone: 598 09 77 85</h1>
                </div>


            </div>
        </div>
    )

};

export default Contact;
