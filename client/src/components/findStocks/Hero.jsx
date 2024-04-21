
import stockHero from '../../images/stock-hero-img.png';

export default function Hero() {



    return (

            <div className="row flex-lg-row-reverse align-items-center g-5 py-5 mb-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src={stockHero} className="d-block mx-lg-auto img-fluid" alt="Stock Hero" width="700" height="500" loading="lazy"/>
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold text-white lh-1 mb-5 ">Search For Any US Stocks or Equities</h1>
                    <p className="lead text-white mb-5">Simply search for any US-based stock or equity below to view important information and price history of the stock/equity. Add stocks/equities to your watchlist to
                    keep track of them and streamline your investment decisions. </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start"> </div>
                </div>
            </div>



    )
}