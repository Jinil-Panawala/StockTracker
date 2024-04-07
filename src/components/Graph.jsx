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
            graphData: [],
            filter: '1D',
            mounted: false,
        }
    }

    filters = ['1D', '1W', '1M', '1Y', '5Y'];

    createDate = (date, days, weeks, months, years) => {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days + 7 * weeks);
        newDate.setMonth(newDate.getMonth() + months);
        newDate.setFullYear(newDate.getFullYear() + years);

        return newDate;
    }

    createDateObject = (dateString) => {
        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-');
        const [hour, minute, second] = timePart.split(':');

        // Create a new Date object
        const dateObject = new Date(year, month - 1, day, hour, minute, second);
        return dateObject;

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

    extractGraphData(graphData) {
        if (graphData) {
            // graphData.slice().reverse();
            this.setState({
                graphData: graphData.slice().reverse(),
                mounted: true,

            })
        }

        // console.log(this.reversedGraphData)

    }

    


    componentDidMount() {

        stockData.daily5min("AAPL", this.extractGraphData.bind(this));
        

    }


    render() {
        return (



            <Card className="bg-dark">
                
                {/* <div className="row  ms-auto  py-3 px-3"> */}
                <ButtonGroup className="row  ms-auto  py-3 px-3 ">


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


                    



                    
                {/* </div> */}



                <ResponsiveContainer maxHeight={'1000px'}  >


                        <br></br>

                        {console.log(this.state.filter)}
                    
                        
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
            </Card>




        )
    }

}

export default Graph;