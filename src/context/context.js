import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Context = React.createContext();

const Provider = ({ children }) => {

    const [stocksList, setStocksList] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [portfolioNetChange, setPortfolioNetChange] = useState(0);
    const [stockSymbols, setStockSymbols] = useState([
        'AAPL','ISRG','CME', 'ADP', 'INTU', 'BKNG',
        'FISV', 'MDLZ', 'GILD', 'QCOM', 'SBUX', 'CHTR', 'TXN',
        'AVGO', 'AMGN', 'COST', 'PYPL', 
        'NFLX', 'ADBE', 'NVDA',
        'PEP' , 'CMCSA', 'INTC', 'FB', 'MSFT', 'AMZN'
    ])

    const addToPortfolio = (stock) => {
        const boughtStock = {
            name : stock.name,
            boughtPrice : stock.price,
            currentPrice : stock.price
        }
        const updatedPortfolio = portfolio.slice();
        updatedPortfolio.push(boughtStock)

        setPortfolio(updatedPortfolio)
        // console.log(portfolio);
    }
    

    const removeFromPortfolio = (stock) => {
        const updatedPortfolio = portfolio.filter(item => item.name !== stock.name)
        setPortfolio(updatedPortfolio)
    }
    
    const getList = async () => {
        const newstocksList = [];

        await Promise.all(
            stockSymbols.map(symbol => {
                return new Promise((resolve, reject) => {
                    resolve(axios(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/?&token=pk_9c4d6fe742e54aae900f381f4400be7c`))
                })
            })
            )
            .then(res => {
                res.map(item => {
                    newstocksList.push({
                        name: item.data.companyName,
                        price: item.data.latestPrice,
                        change: item.data.changePercent,
                        imageUrl: `https://storage.googleapis.com/iex/api/logos/${item.data.symbol}.png`
                    })
                })
            })
        
        return newstocksList;
    }

    const getStocksList = async ()=> {
            
            const list = await getList()
            setStocksList(list);
            console.log("fired !")
    }

    useEffect(() => {
        setInterval(() => {
            getStocksList();
        }, 5 * 60 * 1000)
    }, [])

    useEffect(() => {
        const updatedPortfolio = [];
        let totalCurrentPrice = 0;
        let totalBoughtPrice = 0;

        portfolio.map(stock => {
            let idx = 0;

            for(let i=0; i <stocksList.length; i++) {
                if(stocksList[i].name === stock.name) {
                    idx = i;
                    break;
                }
            }

            updatedPortfolio.push({
                ...stock,
                currentPrice: stocksList[idx].price
            })

            totalBoughtPrice += updatedPortfolio[updatedPortfolio.length-1].boughtPrice ;
            totalCurrentPrice += updatedPortfolio[updatedPortfolio.length-1].currentPrice ; 

        })

        setPortfolioNetChange( ((totalCurrentPrice-totalBoughtPrice)/totalBoughtPrice).toFixed(4) );
        setPortfolio(updatedPortfolio)
    }, [stocksList])

    return (
        <Context.Provider value={{
            getStocksList, stocksList, addToPortfolio, portfolio, setPortfolio, removeFromPortfolio,
             portfolioNetChange ,stockSymbols,
        }}> {children} </Context.Provider>
    )
}

export {Context, Provider};
