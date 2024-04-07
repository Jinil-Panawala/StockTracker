import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class StockCard extends Component {

    constructor(props) {
        super(props);
    }

    // number = (440.123).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Calculate the formatted number within render()
    
    
    render() {
        

        return (

            <Card className="mb-5" data-bs-theme="dark">
                <Card.Body>
                    <div className="row justify-content-center justify-content-md-between  px-5">
                        <div className="col-auto">
                            <h1 className="py-2">AAPL</h1>
                        </div>
                        <div className="col-auto align-self-center">
                            <h5 className="mx-4 pt-2 ">USD</h5>
                        </div>
                        <div className="col-auto align-self-center">
                            <Button variant="primary" className="rounded-pill px-4">Add/Remove to Watchlist</Button>
                        </div>
                    </div>
                    <div className="row justify-content-center justify-content-md-between  px-5 mt-4">
                        <div className="col-auto">
                            <h3>{(1232.123).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                        </div>
                        <div className="col-auto">
                            <h3>+95.05</h3>
                        </div>
                        <div className="col-auto">
                            <h3 className="pb-2 ">(+95.05%)</h3>
                        </div>
                    </div>
                </Card.Body>
        </Card>


        );

    }
}

export default StockCard;

