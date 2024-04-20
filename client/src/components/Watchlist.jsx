import React, { Component } from 'react';
import { userData } from '../resources/savedUserData';
import SavedStocksList from './SavedStocksList';
import SearchResults from './SearchResults';

class Watchlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStockTicker: '',
            currentUserSavedStocks: [],
            dummy: false,
        }
    }


    setStockTicker(ticker) {
        this.setState({selectedStockTicker: ticker});
    }



    deleteStockFromWatchlist() {
        this.setState({
            // Simply sets selectedStockTicker state to empty string, since it is passed as a prop to SavedStocksList. 
            // This will then cause componentDidUpdate to run in SavedStocksList and rerender the component (this time not including the deleted stock in the list)
            selectedStockTicker: '', 
        })
    }

    





    render() {

        return (
            <div className='bg-dark'>
                <div className="container col-xxl-15 px-4 py-5 text-white">
                    <div className="row">
                        <div className="col-md-4">
                            <SavedStocksList setStockTicker={this.setStockTicker.bind(this)} selectedStockTicker={this.state.selectedStockTicker}/>
                        </div>
                        <div className="col-md-8">
                            {
                                this.state.selectedStockTicker !== '' &&
                                <SearchResults ticker={this.state.selectedStockTicker} deleteSavedStocks={this.deleteStockFromWatchlist.bind(this)} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Watchlist;