import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class StockCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            companyName: '',
            price: 0,
            change: 0,
            changePercent: 0,
            currency: '',
            exchange: '',
        }
    }

    extractData() {

        // console.log(this.props);
        
        

        this.setState({
            symbol: this.props.details.symbol,
            companyName: this.props.details.companyName,
            price: (this.props.details.price),
            change: (this.props.details.change),
            changePercent: (this.props.details.changePercent),
            currency: this.props.details.currency,
            exchange: this.props.details.exchange,
        })
    }
    

    componentDidMount() {
        this.extractData();

    }

    componentDidUpdate(prevProps) {
        if (prevProps.details.symbol !== this.props.details.symbol) {
            console.log(this.props);
            this.extractData();
        }
    }


    render() {
        

        return (

            <Card className="mb-5" data-bs-theme="dark">
                <Card.Body>
                    <div className="row justify-content-center justify-content-lg-between  px-5">
                        <div className="col-auto">
                            <h1 className="py-2">{this.state.symbol + " "} <span className='fs-6 px-3'>{this.state.companyName}</span></h1>
                           
                        </div>
                       
                        <div className="col-auto align-self-center">
                            <h5 className="mx-4 pt-2 ">{this.state.exchange + '   ·   ' + this.state.currency}</h5>
                        </div>
                        <div className="col-auto align-self-center">
                            <Button variant="primary" className="rounded-pill px-4">Add/Remove to Watchlist</Button>
                        </div>
                    </div>
                    <div className="row justify-content-center justify-content-md-between  px-5 mt-4">
                        <div className={"col-auto "}>
                            <h3>{((this.state.price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</h3>
                        </div>
                        <div className={"col-auto " + (this.state.change >= 0 ? 'text-success' : 'text-danger')}>
                            <h3>{(this.state.change >= 0 ? '+' : '') + (this.state.change).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                        </div>
                        <div className={"col-auto " + (this.state.changePercent >= 0 ? 'text-success' : 'text-danger')}>
                            <h3 className="pb-2 ">{'(' + (this.state.changePercent >= 0 ? '+' : '') + (this.state.changePercent).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%' + ')'}</h3>
                        </div>
                    </div>
                </Card.Body>
        </Card>


        );

    }
}

export default StockCard;

