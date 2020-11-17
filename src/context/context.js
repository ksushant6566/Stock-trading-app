import React, { useState } from 'react';
import axios from 'axios';


const Context = React.createContext();

const Provider = ({ children }) => {

    const [stocksList, setStocksList] = useState([]);
    
    const [portfolio, setPortfolio] = useState([]);

    // useEffect(() => {
    //     getStocksList
    // })

    const addToPortfolio = (stock) => {
        const boughtStock = {
            name : stock.name,
            boughtPrice : stock.price,
            currentPrice : stock.price
        }
        const updatedPortfolio = portfolio.slice();
        updatedPortfolio.push(boughtStock)

        setPortfolio(updatedPortfolio)
        console.log(portfolio);
    }
    

    const removeFromPortfolio = (stock) => {
        const updatedPortfolio = portfolio.filter(item => item.name != stock.name)
        setPortfolio(updatedPortfolio)
    }
    
    const getStocksList = ()=> {

        setStocksList([
            {
                name : "amazon",
                price : 1234
            },
            {
                name : "apple",
                price : 1324
            },
            {
                name : "microsoft",
                price : 1234
            },
            {
                name : "tcs",
                price : 1324
            },
            {
                name : "reliance",
                price : 1234
            },
            {
                name : "netflix",
                price : 1324
            },
            {
                name : "sco",
                price : 1234
            },
            {
                name : "google",
                price : 1324
            },
            {
                name : "haldiram",
                price : 1234
            },
            {
                name : "Eu",
                price : 1324
            },
            {
                name : "Jabong",
                price : 1234
            },
            {
                name : "xiomi",
                price : 1324
            },
            {
                name : "growmore",
                price : 1234
            },
            {
                name : "laponez",
                price : 1324
            },
            {
                name : "burger king",
                price : 1234
            },
            {
                name : "adobe",
                price : 1324
            },
            {
                name : "goldman sachs",
                price : 1234
            },
            {
                name : "bloomberg",
                price : 1324
            },
            {
                name : "ZS",
                price : 1234
            },
            {
                name : "Interviewbit",
                price : 1324
            },
            {
                name : "uber",
                price : 1234
            },
            {
                name : "zomato",
                price : 1324
            },
            {
                name : "ola",
                price : 1234
            },
            {
                name : "tower research",
                price : 1324
            },
            
        ])

        console.log(stocksList);


        // const options = {
        //     method: 'GET',
        //     url: 'https://twelve-data1.p.rapidapi.com/price',
        //     params: {symbol: 'AMZN', outputsize: '30', format: 'json'},
        //     headers: {
        //       'x-rapidapi-key': '3afdcd09bfmsh4b12c2eb925d608p1faf6bjsn8e511fd6ea96',
        //       'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
        //     }
        //   };
          
        //   axios.request(options).then(function (response) {
        //       console.log(response.data);
        //   }).catch(function (error) {
        //       console.error(error);
        //   })
    }


    return (
        <Context.Provider value={{
            getStocksList, stocksList, addToPortfolio, portfolio, setPortfolio, removeFromPortfolio
        }}> {children} </Context.Provider>
    )
}

export {Context, Provider};