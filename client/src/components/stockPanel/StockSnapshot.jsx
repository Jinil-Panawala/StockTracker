import React, { Component } from "react";
import Table from 'react-bootstrap/Table'

class StockSnapshot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticker: 'test',
            price: 0,
            priceChange: 0,
            percentChange: 0,
        }

        

    }




    extractData(data) {
        // console.log(data)
        if (data) {

            this.setState({
                ticker: data['symbol'],
                price: data['price'],
                priceChange: data['change'],
                percentChange: data['changesPercentage'],
    
            })
        }
        
    }

    componentDidMount() {
        this.extractData(this.props.data)
    }



    render() {
        return (
            <div className="">

                <div className="text-center" >
                    {this.state.ticker}
                </div>
            
                <Table size="sm"  borderless responsive className="table-sm" variant="dark">
                    <tbody>
                        <tr>
                            <th className="text-center text-primary">
                                {this.state.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </th>
                            <td className={"text-center " + (this.state.priceChange < 0 ? 'text-danger' : 'text-success')} style={{fontSize: '12px', verticalAlign: 'middle',}}>
                                {(this.state.priceChange >= 0 ? '+' : '') + this.state.priceChange.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + '(' + (this.state.percentChange >= 0 ? '+' : '') + this.state.percentChange.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '%)'}
                            </td>
                        </tr>

                    </tbody>



                </Table>
            
            </div>


                




    



        )
    }

}

export default StockSnapshot;