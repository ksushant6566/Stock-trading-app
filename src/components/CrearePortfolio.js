import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/context';


const CreatePortfolio = () => {
    const [searchValue, setSearchValue] = useState('');
    
    const { getStocksList,
            stocksList , 
            addToPortfolio, 
            portfolio, 
            removeFromPortfolio, 
        } = useContext(Context);

    

    useEffect(() => {
        getStocksList();
        
        // axios('https://finnhub.io/api/v1/quote?symbol=AAPL&token=bupb4jf48v6sjkjj00ig')
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err))

    }, [])

    // useEffect(() => {
    //     portfolio.map(item => {
    //         let i = 0;
    //         for(i; i < stocksList.length; i++) {
    //             if(stocksList[i].name === item.name ) 
    //                 break;
    //         }

    //         const boughtStock = document.getElementsByClassName('stock')[i];
    //         boughtStock.classList.add("boughtStock")
    
    //         boughtStock.childNodes[2].style.display = 'none';
    //         boughtStock.childNodes[3].style.display = 'block';

    //         console.log("fired")
    //     })
    // })

    const handleBuy = (stock) => {
        if(portfolio.length < 10) {
            addToPortfolio(stock);
            
            const idx = stocksList.indexOf(stock)
    
            const boughtStock = document.getElementsByClassName('stock')[idx];
            boughtStock.classList.add("boughtStock")
    
            boughtStock.childNodes[2].style.display = 'none';
            boughtStock.childNodes[3].style.display = 'block';
        }

    }

    const handleRemove = (stock) => {
        removeFromPortfolio(stock);
        
        const idx = stocksList.indexOf(stock)

        const boughtStock = document.getElementsByClassName('stock')[idx];
        boughtStock.classList.remove("boughtStock")

        boughtStock.childNodes[2].style.display = 'flex';
        boughtStock.childNodes[3].style.display = 'none';
        
        // console.log(portfolio);
    }

    let count = 0;

    return (
        <div className="container">

            <header className="position-fixed">
                You can select upto 10 stocks from the list to create a portfolio
            </header>

            <div className="stocks-container">
                {
                    stocksList.map(item => {
                        return (
                            <div key={count++} className="stock">
                                <div className="logo">
                                    <img src={item.imageUrl} ></img>
                                </div>
                                <div className="name-price-change-container">
                                    <h3>{item.name}</h3>
                                    <p>sector</p>
                                    <div className="price-change-container">
                                        <span className="price">${item.price}</span> |
                                        <span className="change">{item.change}%</span>
                                    </div>
                                </div>
                                
                                <div className="buy-sell-btn-container">
                                    <div className="circle-btn buy" onClick = {() => handleBuy(item)} >BUY</div>
                                    <div className="circle-btn sell">SELL</div>
                                </div>

                                <div className="removeStock" onClick= {() => handleRemove(item)} >X</div>
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )


}

export default CreatePortfolio;