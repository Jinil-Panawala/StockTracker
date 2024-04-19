
import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',

        }
    }

    handleEnterPress = (event) => {
        if (event.key === 'Enter' && this.state.searchText !== '') {
            // console.log('enter click');
            
            this.props.search(this.state.searchText.toUpperCase())
        }
    }

    handleSearchButtonPress = () => {
        if (this.state.searchText !== '') {
            this.props.search(this.state.searchText.toUpperCase());
        }
    }


    render() {

        return (
            
            // <div className="container col-xxl-10 px-4 py-5">

                <InputGroup className="mb-5 text-white " >
                    {/* {console.log(this.state.searchText)} */}
                    <FloatingLabel
                        controlId="searchBar"
                        label="Search Stocks or Equities"
                        className=""
                        data-bs-theme="dark"
                        
                    >

                        <Form.Control
                        placeholder="Search Stocks or Equities"
                        aria-label="Search Stocks or Equities"
                        aria-describedby="search-stocks-or-equities"
                        data-bs-theme="dark"
                        onChange={(event) => this.setState({searchText: event.target.value})}
                        onKeyDown={this.handleEnterPress}
                        />

                    </FloatingLabel>

                    <Button variant="outline-secondary" id="search-button" size="lg"
                    onClick={() => this.handleSearchButtonPress()} >
                    Search
                    </Button>

                </InputGroup>
                
            // </div>

        )
    }
}

export default SearchBar;
