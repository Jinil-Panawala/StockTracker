
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

class SearchBar extends Component {

    constructor(props) {
        super(props);
    }




    render() {

        return (
            
            // <div className="container col-xxl-10 px-4 py-5">

                <InputGroup className="mb-5 text-white " >

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
                        
                        />

                    </FloatingLabel>

                    <Button variant="outline-secondary" id="search-button" size="lg" >
                    Search
                    </Button>

                </InputGroup>
                
            // </div>

        )
    }
}

export default SearchBar;
