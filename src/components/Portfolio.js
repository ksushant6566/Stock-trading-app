import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/context';

const Portfolio = () => {

    const { portfolio } = useContext(Context)

    useEffect(() => {
        console.log(portfolio)
    }, [portfolio])

    return (
        <div className="portfolio-container">
            <div className="portfolio-header">
                <h1 className="portfolio-username">Sushant</h1>
                <h2 className="portfolio-net-change">+23.8%</h2>
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
                            <div className="table-row">
                                <div className="table-data">{item.name}</div>
                                <div className="table-data">{item.boughtPrice}</div>
                                <div className="table-data">{item.currentPrice}</div>
                                <div className="table-data">{ (item.boughtPrice - item.currentPrice)/item.boughtPrice }</div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Portfolio;