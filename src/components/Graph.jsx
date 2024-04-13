import React, { Component } from "react";
import { stockData } from "../resources/stockData";
import { ResponsiveContainer } from "recharts";
import Card  from "react-bootstrap/Card";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ReactApexChart from "react-apexcharts";


class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    getDateSevenDaysBefore(dateString) {
        const date = new Date(dateString);
        date.setDate(date.getDate() - 7);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    getDateOneMonthBefore(dateString) {
        const date = new Date(dateString);
        date.setMonth(date.getMonth() - 1);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    getDateOneYearBefore(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        const prevYear = year - 1;
    
        // Format the previous date as YYYY-MM-DD
        const formattedPrevDate = `${prevYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
        return formattedPrevDate;
    }



   
    prepareChartData = () => {

        return (this.state.graphData).map((item, index) => {
            // console.log(item['close'].toFixed(2));
            // console.log(this.createDateObject(item['date']));
            return {
                x: (item['date']),
                y: item['close'].toFixed(2),
            }
        }); 
    }
        



    extractGraphData(graphData) {
        if (graphData && Array.isArray(graphData) && graphData.length !== 0) {
            // console.log(Array.isArray({}))
            // console.log({'historical' : []}.hasOwnProperty('historical'))
            this.setState({
                graphData: graphData.slice().reverse(),

            })
        }

        else if (graphData && !Array.isArray(graphData) &&  graphData.hasOwnProperty('historical') && graphData['historical'].length !== 0) {

                this.setState({
                    graphData: graphData['historical'].slice().reverse(),
                })

        }


        

    }

    getOneDayData() {
        stockData.daily1min(this.props.symbol, this.convertTimestampToDate(this.props.timestamp), this.extractGraphData.bind(this));
    }

    getOneWeekData() {  
        stockData.weekly5min(this.props.symbol,this.getDateSevenDaysBefore(this.convertTimestampToDate(this.props.timestamp)), this.convertTimestampToDate(this.props.timestamp), this.extractGraphData.bind(this) )
    }   

    getOneMonthData() {
        stockData.monthly15min(this.props.symbol,this.getDateOneMonthBefore(this.convertTimestampToDate(this.props.timestamp)), this.convertTimestampToDate(this.props.timestamp), this.extractGraphData.bind(this) )

    }

    getOneYearData() {
        stockData.yearly(this.props.symbol,this.getDateOneYearBefore(this.convertTimestampToDate(this.props.timestamp)), this.convertTimestampToDate(this.props.timestamp), this.extractGraphData.bind(this) )

    }

    getFiveYearData() {
        stockData.fiveYears(this.props.symbol, this.extractGraphData.bind(this) )

    }


    


    // Always show daily5min graph on mount.
    componentDidMount() {
        this.getOneDayData();
        
    }

    // Always show daily5min graph at first whenever ticker changes.
    componentDidUpdate(prevProps) {
        if (prevProps.symbol !== this.props.symbol) {
            this.getOneDayData();
            this.setState({
                filter: '1D',
            })
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
                                        onChange={() => this.setState({filter: filter})} className="px-5" onClick={() => (filter === '1D' && this.state.filter !== '1D') ? this.getOneDayData() : (filter === '1W' && this.state.filter !== '1W') ? 
                                        this.getOneWeekData() : (filter === '1M' && this.state.filter !== '1M') ? this.getOneMonthData() : (filter === '1Y' && this.state.filter !== '1Y') ? this.getOneYearData() : (filter === '5Y' && this.state.filter !== '5Y') ? this.getFiveYearData() : undefined}>
                                        
                                        {filter}
                                        </ToggleButton>
                                    </div>



                

                                
                                )
                            })}



                    </ButtonGroup>




                    <ResponsiveContainer height={'1000px'}>


                            {/* {console.log(this.state.graphData)} */}
                            {/* {console.log(this.props.timestamp)}
                            {console.log(this.convertTimestampToDate(this.props.timestamp))} */}
                            {/* {console.log(this.state.graphData.length)} */}
                                
                                <ReactApexChart
                                    options={{
                                        chart: {
                                            // id: 'graph',
                                            type: 'area',
                                            toolbar: {
                                                show: true,
                                                tools: {
                                                    download: false,
                                                    selection: false,
                                                    reset: true,
                                                    zoom: true,
                                                    zoomin: true,
                                                    zoomout: true,
                                                    pan: false,
                                                }
                                            },
                                            animations: {
                                                speed: 400,
                                                animateGradually: {
                                                    enabled: false,
                                                }
                                            },
                                            height: '100%',
                                            redrawOnParentResize: false,
                                            redrawOnWindowResize: false,
                                            foreColor: '#D3D3D3',
                                            zoom: {
                                                autoScaleYaxis: true,
                                            },

                                        },
                                        xaxis: {
                                            type: 'category',
                                            axisBorder: {
                                                show: true,
                                                color: '#D3D3D3'
                                            }
                                        },
                                        yaxis: {
                                            axisBorder: {
                                                show: true,
                                                color: '#D3D3D3'
                                            }
                                        },
                                        
                                        dataLabels: {
                                            enabled: false,
                                            
                                        },
                                        
                                        grid: {
                                            show: false,
                                        },
                                        stroke: {
                                            width: 2,
                                        },
                                        


                                        theme: {
                                            mode: 'light'
                                        },
                                        // plotOptions: {
                                        //     area: {
                                        //         fillTo: 'e',
                                                
                                        //     }
                                        // },
                                        fill: {
                                            type: "gradient",
                                            gradient: {
                                                type: 'vertical',
                                                opacityFrom: 1, // Make the top color more opaque
                                                opacityTo: 0.1, // Make the bottom color more transparent
                                                stops: [0, 95, 100], // Adjust stops to control opacity gradient
                                            }
                                          },

                                        
                                    }}
                                    series={[{
                                        name: 'Price',
                                        data: this.prepareChartData(),
                                        type: 'area',
                                    
                                        
                                        
                                    }]}
                                                                    
                                />

                                {/* <AreaChart data={this.prepareChartData()}>
                                <defs>
                                    <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="50%" stopColor="rgb(77, 184, 255)" stopOpacity={0.8}/>
                                        <stop offset="97%" stopColor="rgb(77, 184, 255)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                    <Area type="monotone" dataKey="Price" stroke="#312e81" fillOpacity={1} strokeWidth={0.5} fill="url(#chartColor)"/>
                                    <Tooltip  />
                                    <XAxis dataKey={"date"} />
                                    <YAxis domain={["dataMin", "dataMax"]} dataKey={'Price'}   />
                                </AreaChart> */}

                        

                    </ResponsiveContainer>
                </Card.Body>
                
            </Card>




        )
    }

}

export default Graph;