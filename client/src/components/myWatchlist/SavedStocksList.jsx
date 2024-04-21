import React, { Component } from 'react';
import { stockData } from "../../resources/stockData";
import { userData } from '../../resources/savedUserData'; 
import ListGroup from 'react-bootstrap/ListGroup';
import Card  from 'react-bootstrap/Card';


class SavedStocksList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quoteData: [],
            mounted: false,
            isMobileView: false,
            currentUserSavedStocks: [],
        }
    }


    extractQuoteData(data) {
        if (data) {

            this.setState({
                quoteData: data,
                mounted: true,
            })
        }
    }

    extractUserData(data) {

        let tickerStr = '';

        if (data && Array.isArray(data) && data.length !== 0) {


            this.setState({
                currentUserSavedStocks: data[0]['savedStocks'], // Currently only have 1 user in db. 
            })

            for (let i = 0; i < data[0]['savedStocks'].length; i++) {
                tickerStr += (data[0]['savedStocks'][i] +  (i === data[0]['savedStocks'].length - 1 ? '' : ','))
            }
            // console.log(tickerStr)


            stockData.bulkCompanyPrices(tickerStr, this.extractQuoteData.bind(this));
            

        }

        if (data && !Array.isArray(data) && data.hasOwnProperty('savedStocks')) {


            this.setState({
                currentUserSavedStocks: data['savedStocks'], // Currently only have 1 user in db. 
            })

            for (let i = 0; i < data['savedStocks'].length; i++) {
                tickerStr += (data['savedStocks'][i] +  (i === data['savedStocks'].length - 1 ? '' : ','))
            }
            // console.log(tickerStr)


            stockData.bulkCompanyPrices(tickerStr, this.extractQuoteData.bind(this));
        
        }
    }
    

    updateWindowDimensions = () => {
        this.setState({ isMobileView: window.innerWidth <= 768 });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

       
        userData.getUserData(this.extractUserData.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.selectedStockTicker !== this.props.selectedStockTicker) {

            userData.getUserData(this.extractUserData.bind(this));            
        }
    }


    // Methods to handle dragging
    
    handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index.toString());
    };

    handleDrop = (e, targetIndex) => {
        const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const items = [...this.state.quoteData];
        const [draggedItem] = items.splice(draggedIndex, 1);
        items.splice(targetIndex, 0, draggedItem);
        this.setState({ quoteData: items });

        // Create newly ordered array which is to be stored in the db.
        const newArray = [];
        for (let i = 0; i < items.length; i++) {
            newArray.push(items[i]['symbol'])
        }

        const newSavedStocks = {
            savedStocks: newArray,
        }

        // Update the db with the newly ordered array object. 
        userData.updateSavedStocks(newSavedStocks, this.extractUserData.bind(this));

        
    };
      


    render() {

        const isMobileView = window.innerWidth <= 768;
        const maxHeight = isMobileView ? '250px' : '1000px';


        return (
            this.state.mounted &&
            <Card data-bs-theme='dark' style={{border: 'none', padding: '0px'}}>
                <Card.Body>
                    <h5 className="card-title text-white text-center">{this.state.quoteData.length > 0 ? "Saved Stocks List" : 'No Stocks in Watchlist at The Moment'}</h5>

                    
                    <ListGroup as="ol" numbered data-bs-theme='dark' bg='dark'  style={{ maxHeight: maxHeight, overflowY: 'auto'}}>

                        {
                            this.state.quoteData.map((stock, index) => {
                                return (

                                    <ListGroup.Item
                                        action
                                        onClick={() => this.props.setStockTicker(stock['symbol'])}
                                        value={stock['symbol']}
                                        key={'stockList: ' + stock['symbol']}
                                        as="li"
                                        draggable
                                        onDragStart={(e) => this.handleDragStart(e, index)}
                                        onDrop={(e) => this.handleDrop(e, index)}
                                        onDragOver={(e) => e.preventDefault()}
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