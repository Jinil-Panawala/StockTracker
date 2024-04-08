import React, { Component } from "react";
import { stockData } from "../resources/stockData";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import Card  from "react-bootstrap/Card";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';



class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // symbol: '',
            graphData: [],
            timestamp: 0,
            filter: '1D',
        }
    }

    filters = ['1D', '1W', '1M', '1Y', '5Y'];

    convertTimestampToDate = (timestamp) => {
        const timestampMS = timestamp * 1000;
        // Create a new Date object using the timestamp
        const date = new Date(timestampMS);

        // Extract year, month, and day components from the date
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        // Format the date string in 'YYYY-MM-DD' format
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;

    }
   
    prepareChartData = () => {
        return (this.state.graphData).map((item, index) => {
            // console.log(item['close'].toFixed(2));
            // console.log(this.createDateObject(item['date']));
            return {
                Price: item['close'].toFixed(2),
                date: (item['date']),
            }
        }); 
        

    }

    extractGraphData(graphData, date) {
        // console.log(date);
        if (graphData && graphData.length !== 0) {
            // graphData.slice().reverse();
            this.setState({
                graphData: graphData.slice().reverse(),

            })
        }


        

    }

    


    componentDidMount() {

        stockData.daily5min(this.props.symbol, this.convertTimestampToDate(this.props.timestamp), this.extractGraphData.bind(this));
        

    }

    componentDidUpdate(prevProps) {
        if (prevProps.symbol !== this.props.symbol) {
            stockData.daily5min(this.props.symbol, this.convertTimestampToDate(this.props.timestamp), this.extractGraphData.bind(this));
        }
    }


    render() {
        return (


            
            <Card className="bg-dark mb-5">
                
                <Card.Body>

                    <ButtonGroup className="row d-flex ms-auto justify-content-end  py-3 px-3 ">


                            {this.filters.map((filter, index) => {
                                return (
                                    <div className="col-auto " key={filter}>
                                        <ToggleButton  id={`filter-${index}`} type="radio" name="radio" value={filter} checked={this.state.filter === filter}
                                        onChange={() => this.setState({filter: filter})} className="px-5">
                                        
                                        {filter}
                                        </ToggleButton>
                                    </div>



                

                                
                                )
                            })}



                    </ButtonGroup>


                        



                        
             

                    

                    <ResponsiveContainer maxHeight={'1000px'}  >


                            <br></br>

                            {/* {console.log(this.state.graphData)} */}
                            {/* {console.log(this.props.timestamp)}
                            {console.log(this.convertTimestampToDate(this.props.timestamp))} */}
                        
                            
                                <AreaChart data={this.prepareChartData(this.state.graphData)}>

                                <defs>
                                    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="50%" stopColor="rgb(77, 184, 255)" stopOpacity={0.8}/>
                                        <stop offset="97%" stopColor="rgb(77, 184, 255)" stopOpacity={0}/>
                                    </linearGradient>
                                
                                </defs>
                                    


                                    <Area type="monotone" dataKey="Price" stroke="#312e81" fillOpacity={1} strokeWidth={0.5} fill="url(#chartColor)"/>
                                    <Tooltip  />
                                    <XAxis dataKey={"date"} />
                                    <YAxis domain={["dataMin", "dataMax"]} />



                                </AreaChart>
                        

                    </ResponsiveContainer>
                </Card.Body>
                
            </Card>




        )
    }

}

export default Graph;