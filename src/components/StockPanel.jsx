import React, {Component } from "react";
import StockSnapshot from "./StockSnapshot";
import { stockData } from "../resources/stockData";
import  Table  from "react-bootstrap/Table";

class StockPanel extends Component {

    tickers = ['SPY', 'QQQ', 'VB', 'IWM', 'IEFA', 'XLK', 'GLD', 'SCHD','AAPL', 'TSLA', 'NVDA', 'MSFT'];

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isMounted: false,
        }


    }

    extractData(data) {
        // console.log(data)
        this.setState({
            data: data,
            isMounted: true,

        })
        
    }

    componentDidMount() {

        let tickerStr = '';

        for (let i = 0; i < this.tickers.length; i++) {
            tickerStr += (this.tickers[i] +   (i === this.tickers.length - 1 ? '' : ','))
        }
        // console.log(tickerStr)
        stockData.bulkCompanyPrices(tickerStr, this.extractData.bind(this));

    }





    render() {


        return (


            <Table responsive bordered variant='dark' style={{borderCollapse: 'separate', borderSpacing: '0 0px', width: '2250px'}} data-bs-theme="dark">

                <tbody >

                    <tr>

                        {this.state.isMounted ?
                            this.tickers.map((ticker, index) => {

                                return (
                                    <td key={ticker}> <StockSnapshot data={this.state.data[index]}/> </td>
                                )
                            })
                        : null}

                
                    
                    </tr>


                </tbody>



            </Table>

        )


    }





}

export default StockPanel;