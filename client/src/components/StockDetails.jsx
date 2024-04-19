import React, { Component } from 'react';
import Card  from 'react-bootstrap/Card';


class StockDetails extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            open: 0,
            close: 0,
            high: 0,
            low: 0,
            eps: 0,
            volume: 0,
            pe: 0,
            mktCap: 0,
            yearHigh: 0,
            yearLow: 0,
            lastDividend: 0,
            beta: 0,
        }
    }

    extractData() {
        // console.log(this.props);
        this.setState({
            symbol: this.props.details.symbol,
            open: this.props.details.open,
            close: this.props.details.close,
            high: this.props.details.high,
            low: this.props.details.low,
            eps: this.props.details.eps,
            volume: this.props.details.volume,
            pe: this.props.details.pe,
            mktCap: this.props.details.marketCap,
            yearHigh: this.props.details.yearHigh,
            yearLow: this.props.details.yearLow,
            lastDividend: this.props.details.lastDividend,
            beta: this.props.details.beta,

        })
    }


    componentDidMount() {
        this.extractData();

    }

    componentDidUpdate(prevProps) {
        if (prevProps.details.symbol !== this.props.details.symbol) {
            this.extractData();
        }
    }


    render() {
        return (
            <>
            {/* Mobile view */}
                <Card className='py-3 ms-auto bg-dark text-white d-md-none '>
                    <Card.Body>
                        <div className='d-flex justify-content-center justify-content-md-between px-5'>
                            <div className='col-auto text-wrap' style={{ color: '#D3D3D3', }}>
                                <ul>Open:</ul>
                                <ul>Close:</ul>
                                <ul>High:</ul>
                                <ul>Low:</ul>
                                <ul>52W H:</ul>
                                <ul>52W L:</ul>
                                <ul>EPS:</ul>
                                <ul>P/E:</ul>
                                <ul>Volume:</ul>
                                <ul>Mkt Cap:</ul>
                                <ul>Last Dividend:</ul>
                                <ul>Beta:</ul>
                            </div>
                            <div className='col-auto text-wrap ' >
                                <ul>{(this.state.open).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.close).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.high).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.low).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.yearHigh).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.yearLow).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.eps).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.pe).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.volume / 1000000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' M'}</ul>
                                <ul>{(this.state.mktCap / 1000000000).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' B'}</ul>
                                <ul>{(this.state.lastDividend).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.beta).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                            </div>
                        </div>
                    </Card.Body>
                </Card>


                {/* Desktop view */}
                <Card className='py-3 ms-auto bg-dark text-white d-none d-md-block'>
                    <Card.Body>
                        <div className='d-flex justify-content-center justify-content-md-between px-5'>
                            {/* First Column */}
                            <div className='col-auto text-wrap' style={{ color: '#D3D3D3', }}>
                                <ul>Open:</ul>
                                <ul>High:</ul>
                                <ul>EPS:</ul>
                                <ul>P/E:</ul>
                                <ul>52W H:</ul>
                                <ul>Last Dividend:</ul>
                            </div>

                            {/* Second Column */}
                            <div className='col-auto text-wrap' >
                                <ul>{(this.state.open).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.high).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.eps).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.pe).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.yearHigh).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.lastDividend).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                            </div>

                            <div className='border-end d-none d-md-block px-3'></div>

                            {/* Third Column */}
                            <div className='col-auto text-wrap' style={{ color: '#D3D3D3',}}>
                                <ul>Close:</ul>
                                <ul>Low:</ul>
                                <ul>Volume:</ul>
                                <ul>Mkt Cap:</ul>
                                <ul>52W L:</ul>
                                <ul>Beta:</ul>
                            </div>

                            {/* Fourth Column */}
                            <div className='col-auto pe-4 text-wrap' style={{fontSize: '1rem'}}>
                                <ul>{(this.state.close).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.low).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.volume / 1000000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' M'}</ul>
                                <ul>{(this.state.mktCap / 1000000000).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' B'}</ul>
                                <ul>{(this.state.yearLow).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                                <ul>{(this.state.beta).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ul>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default StockDetails;