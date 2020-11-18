import React, { useContext, } from 'react';
import { Context } from '../context/context';

const Portfolio = () => {

    const { portfolio, portfolioNetChange } = useContext(Context)

    // useEffect( () => {
    //     console.log(portfolio);
    // }, [portfolio])

    const handleControlBtnClick = () => {
        const element = document.getElementsByClassName('portfolio')[0];
        if(element.classList.contains('portfolio-change'))
            element.classList.remove('portfolio-change');
        else 
            element.classList.add('portfolio-change');
    }

    let count = 0;

    return (
        <div className="portfolio">
            <div className='portfolio-container'>
                <div className="portfolio-header">
                    <h1 className="portfolio-username">Sushant</h1>
                    <h2 className="portfolio-net-change">{portfolioNetChange}%</h2>
                </div>

                <div className="portfolio-table">
                    <div className="table">
                        <div className="table-row">
                            <div className="table-heading">Name</div>
                            <div className="table-heading">Bought price</div>
                            <div className="table-heading">Current price</div>
                            <div className="table-heading">%change</div>
                        </div>

                        {portfolio.map(item => {
                            return (
                                <div key={count++} className="table-row">
                                    <div className="table-data">{item.name}</div>
                                    <div className="table-data">{item.boughtPrice}</div>
                                    <div className="table-data">{item.currentPrice}</div>
                                    <div className="table-data">{ ((-item.boughtPrice + item.currentPrice)/item.boughtPrice).toFixed(4) }</div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>

            <div onClick={() => handleControlBtnClick()} className="portfolio-control-btn">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
            </div>
        </div>
    )
}

export default Portfolio;