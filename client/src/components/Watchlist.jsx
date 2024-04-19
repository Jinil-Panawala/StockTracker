import React, { Component } from 'react';
import SavedStocksList from './SavedStocksList';
import SearchResults from './SearchResults';

class Watchlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStockTicker: '',
        }
    }


    setStockTicker(ticker) {
        this.setState({selectedStockTicker: ticker});
    }



    render() {

        return (
            <div className='bg-dark'>
                {console.log(this.state.selectedStockTicker)}
                <div className="container col-xxl-15 px-4 py-5 text-white">
                    <div className="row">
                        <div className="col-md-4">
                            <SavedStocksList setStockTicker={this.setStockTicker.bind(this)}/>
                        </div>
                        <div className="col-md-8">
                            {
                                this.state.selectedStockTicker !== '' &&
                                <SearchResults ticker={this.state.selectedStockTicker} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Watchlist;