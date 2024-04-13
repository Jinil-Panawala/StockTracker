import React, { Component } from 'react';
import { stockData } from "../resources/stockData";

import ListGroup from 'react-bootstrap/ListGroup';
import Card  from 'react-bootstrap/Card';


class SavedStocksList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quoteData: [],
            mounted: false,
            isMobileView: false,
        }
    }

    tickers = ['SPY', 'QQQ', 'VB', 'IWM', 'IEFA', 'XLK', 'GLD', 'SCHD','AAPL', 'TSLA', 'NVDA', 'MSFT'];

    extractData(data) {
        if (data) {

            this.setState({
                quoteData: data,
                mounted: true,
            })
        }
    }

    updateWindowDimensions = () => {
        this.setState({ isMobileView: window.innerWidth <= 768 });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        let tickerStr = '';

        for (let i = 0; i < this.tickers.length; i++) {
            tickerStr += (this.tickers[i] +   (i === this.tickers.length - 1 ? '' : ','))
        }
        // console.log(tickerStr)
        stockData.bulkCompanyPrices(tickerStr, this.extractData.bind(this));

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.symbol !== this.props.symbol) {

            let tickerStr = '';

            for (let i = 0; i < this.tickers.length; i++) {
                tickerStr += (this.tickers[i] +   (i === this.tickers.length - 1 ? '' : ','))
            }
            // console.log(tickerStr)
            stockData.bulkCompanyPrices(tickerStr, this.extractData.bind(this));

        }
    }


    render() {

        const isMobileView = window.innerWidth <= 768;
        const maxHeight = isMobileView ? '250px' : '1000px';


        return (
            this.state.mounted &&
            <Card data-bs-theme='dark' style={{border: 'none', padding: '0px'}}>
                <Card.Body>
                    <h5 className="card-title text-white text-center">Saved Stocks List</h5>

                    <ListGroup as="ol" numbered data-bs-theme='dark' bg='dark'  style={{ maxHeight: maxHeight, overflowY: 'auto'}}>

                        {
                            this.state.quoteData.map((stock) => {
                                return (

                                    <ListGroup.Item
                                        action
                                        onClick={() => this.props.setStockTicker(stock['symbol'])}
                                        value={stock['symbol']}
                                        key={'stockList: ' + stock['symbol']}
                                        as="li"
                                        className="d-flex justify-content-between align-items-start "
                                    >
                                        <div className="px-3 me-auto d-flex flex-column" >
                                            <div className="fw-bold">{stock['symbol']}</div>
                                            <div>{stock['name']}</div>
                                        </div>
                                        <div className="d-flex flex-column align-items-end " >
                                            <div className="fw-bold ">{stock['price'].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                            <div className={'align-content-right ' +  (stock['changesPercentage'] >= 0 ? 'text-success' : 'text-danger')}>{'(' +  (stock['changesPercentage'] >= 0 ? '+' : '') + stock['changesPercentage'].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%)'}</div>
                                        </div>

                                    
                                    </ListGroup.Item>

                                )
                            })
                        }
                        
                        
                        
                        
                    </ListGroup>

                </Card.Body>
            </Card>
        )
    }
}

export default SavedStocksList;