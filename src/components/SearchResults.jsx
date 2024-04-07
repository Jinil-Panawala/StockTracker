import React, { Component } from "react";
import StockCard from "./StockCard";
import { stockData } from "../resources/stockData";
import Graph from "./Graph";

class SearchResults extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quoteData: {},
            companyData: {},
            
        }
    }



    extractQuoteData(quoteData) {
        if (quoteData) {
            this.setState({
                quoteData: quoteData,


            })
        }

    }

    extractCompanyData(companyData) {
        if (companyData) {
            this.setState({
                companyData: companyData,

            })
        }
    }

    componentDidMount() {

        // stockData.fullQuote("AAPL", this.extractQuoteData.bind(this));
        // stockData.companyProfile("AAPL", this.extractCompanyData.bind(this));

    }

    render() {

        return (
            <>
                <StockCard />
                <Graph />
            </>
        )
    }


}

export default SearchResults;