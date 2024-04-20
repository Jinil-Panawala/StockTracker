import React, { Component } from "react";
import StockCard from "./StockCard";
import { stockData } from "../resources/stockData";
import { userData } from "../resources/savedUserData";
import Graph from "./Graph";
import StockDetails from "./StockDetails";

class SearchResults extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quoteData: {},
            companyData: {},
            // symbol: this.props.ticker,
            currentUserSavedStocks: [],
            symbolIsSaved: false,
        }
    }



    extractQuoteData(quoteData) {
        // console.log(quoteData[0])
        if (quoteData) {
            this.setState({
                quoteData: quoteData[0],
                symbol: this.props.ticker,

            })
        }

    }

    extractCompanyData(companyData) {
        if (companyData) {

            // console.log(companyData[0])
            this.setState({
                companyData: {symbol: companyData[0]['symbol'], lastDiv: companyData[0]['lastDiv'], currency: companyData[0]['currency'], beta: companyData[0]['beta']}

            })
        }
    }

    extractUserData(data) {
        if (data && Array.isArray(data) && data.length !== 0) {


            this.setState({
                currentUserSavedStocks: data[0]['savedStocks'], // Currently only have 1 user in db. 
                symbolIsSaved: data[0]['savedStocks'].includes(this.props.ticker),
            })
        }

        if (data && !Array.isArray(data) && data.hasOwnProperty('savedStocks')) {


            this.setState({
                currentUserSavedStocks: data['savedStocks'], // Currently only have 1 user in db. 
                symbolIsSaved: data['savedStocks'].includes(this.props.ticker),
            })
        }

        
    }

    // When Add to Watchlist / Remove from Watchlist button in StockCard is clicked. Updates the db. 
    updateDbOnAddRemove() {

        if (this.state.symbolIsSaved) { // Remove from Watchlist

            const newArray = this.state.currentUserSavedStocks.filter(ticker => ticker !== this.props.ticker)
            const newSavedStocks = {
                savedStocks: newArray,
            }

            // console.log(newSavedStocks);

            userData.updateSavedStocks(newSavedStocks, this.extractUserData.bind(this));
            // setTimeout(() => {
            //     userData.getUserData(this.extractUserData.bind(this));
            // }, 250);

            // this.setState({
            //     symbolIsSaved: false,
            //     currentUserSavedStocks: newArray,
            // })

            if (this.props.deleteSavedStocks) {
                this.props.deleteSavedStocks()
            }

        }

        if (!this.state.symbolIsSaved) { // Add to Watchlist

            const newArray = this.state.currentUserSavedStocks;
            // console.log(this.state.symbol, this.state.currentUserSavedStocks)
            newArray.push(this.props.ticker);
            const newSavedStocks = {
                savedStocks: newArray,
            }

            // console.log(newSavedStocks)

            userData.updateSavedStocks(newSavedStocks, this.extractUserData.bind(this));
            // setTimeout(() => {
            //     userData.getUserData(this.extractUserData.bind(this));
            // }, 250);
            

            // this.setState({
            //     symbolIsSaved: true,
            //     currentUserSavedStocks: newArray,
            // })

            // if (this.props.updateSavedStocks) {
            //     this.props.updateSavedStocks(newArray)
            // }

        }

        


    }



    componentDidMount() {
        // console.log('mounted');
        stockData.fullQuote(this.props.ticker, this.extractQuoteData.bind(this));
        stockData.companyProfile(this.props.ticker, this.extractCompanyData.bind(this));
        userData.getUserData(this.extractUserData.bind(this));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.ticker !== this.props.ticker) {
            // console.log('updated', this.props.ticker);
            // console.log('updated');

            stockData.fullQuote(this.props.ticker, this.extractQuoteData.bind(this));
            stockData.companyProfile(this.props.ticker, this.extractCompanyData.bind(this));
            userData.getUserData(this.extractUserData.bind(this));
            
        }
    }

    render() {

        const dataAvailable = Object.keys(this.state.quoteData).length > 0 && Object.keys(this.state.companyData).length > 0 && this.state.quoteData['symbol'] === this.state.companyData['symbol'] ;

        return (
            <>
                {/* {console.log(this.state.companyData)} */}
                
                {dataAvailable && (
                    <>

                        <StockCard details={{symbol: this.state.quoteData["symbol"], companyName: this.state.quoteData['name'], price: this.state.quoteData["price"], change: this.state.quoteData["change"], changePercent: this.state.quoteData["changesPercentage"], 
                        currency: this.state.companyData["currency"], exchange: this.state.quoteData['exchange']}}
                        AddRemoveButtonClick={this.updateDbOnAddRemove.bind(this)} symbolIsSaved={this.state.symbolIsSaved}
                        />
                        
                        
                    </>

                )}


                        <Graph symbol={this.state.quoteData['symbol']} timestamp={this.state.quoteData['timestamp']}/>


                    {dataAvailable && (
                        <>
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