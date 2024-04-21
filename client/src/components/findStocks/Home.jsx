import React, { Component } from 'react';
import Hero from './Hero';
import SearchBar from './SearchBar';
import SearchResults from '../searchResults/SearchResults';


class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            searchedTicker: '',

        }
    }

    setSearchedTicker(ticker) {
        this.setState({
            searchedTicker: ticker,
        })
    }

    

    render() {

        return (
            <div className='bg-dark' >

                <div className="container col-xxl-10 px-4 py-5" >
                     {/* {console.log(this.state.searchedTicker)} */}
                    <Hero />
                    <SearchBar search={this.setSearchedTicker.bind(this)}/>
                    {
                        this.state.searchedTicker !== '' &&
                        <SearchResults ticker={this.state.searchedTicker}/>
                    }
                
                </div>
                
            </div>
        )
    }


}

export default Home; 