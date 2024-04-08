import React, { Component } from "react";
import StockCard from "./StockCard";
import { stockData } from "../resources/stockData";
import Graph from "./Graph";
import StockDetails from "./StockDetails";

class SearchResults extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quoteData: {},
            companyData: {},
            
        }
    }



    extractQuoteData(quoteData) {
        // console.log(quoteData[0])
        if (quoteData) {
            this.setState({
                quoteData: quoteData[0],


            })
        }

    }

    extractCompanyData(companyData) {
        if (companyData) {
            this.setState({
                companyData: companyData[0],

            })
        }
    }

    componentDidMount() {

        stockData.fullQuote(this.props.ticker, this.extractQuoteData.bind(this));
        stockData.companyProfile(this.props.ticker, this.extractCompanyData.bind(this));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ticker !== this.props.ticker) {
            stockData.fullQuote(this.props.ticker, this.extractQuoteData.bind(this));
            stockData.companyProfile(this.props.ticker, this.extractCompanyData.bind(this));
        }
    }

    render() {

        const dataAvailable = Object.keys(this.state.quoteData).length > 0 && Object.keys(this.state.companyData).length > 0;

        return (
            <>
                
                {dataAvailable && (
                    <>
                        {/* {console.log(this.state.quoteData)} */}
                        {console.log(this.state.companyData)}
                        <StockCard details={{symbol: this.state.quoteData["symbol"], companyName: this.state.companyData['companyName'], price: this.state.quoteData["price"], change: this.state.quoteData["change"], changePercent: this.state.quoteData["changesPercentage"], 
                        currency: this.state.companyData["currency"], exchange: this.state.companyData['exchangeShortName']}}
                        />

                        <Graph symbol={this.state.quoteData['symbol']} timestamp={this.state.quoteData['timestamp']}/>

                        <StockDetails details={{symbol: this.state.quoteData['symbol'], open: this.state.quoteData["open"], close: this.state.quoteData["price"], high: this.state.quoteData['dayHigh'], low: this.state.quoteData['dayLow'],
                        eps: this.state.quoteData['eps'], volume: this.state.quoteData['volume'], pe: this.state.quoteData['pe'], marketCap: this.state.quoteData['marketCap'], yearHigh: this.state.quoteData['yearHigh'],
                        yearLow: this.state.quoteData['yearLow'], lastDividend: this.state.companyData['lastDiv'], beta: this.state.companyData['beta']}}
                        />
                    
                    </>


                )}
                

                
            </>
        )
    }


}

export default SearchResults;