import axios from 'axios';
import express from 'express';

const fetchMarkets = async () => {
    const siteUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d';

    try {
        const { data } = await axios({
            method: 'GET',
            url: siteUrl,
            headers: {
                'accept': 'application/json'
            },
        });

        /**Sort using the 24 hour percentage value*/
        data.sort((a, b) => {
            return parseFloat(b. price_change_percentage_24h_in_currency) - parseFloat(a. price_change_percentage_24h_in_currency)
        })

        const sortedData = data.map((el) => {
            return {
                name: el.name,
                symbol: el.symbol,
                rank: el.market_cap_rank,
                price: el.current_price,
                percent_change_24h: el. price_change_percentage_24h_in_currency,
                percent_change_1h: el. price_change_percentage_1h_in_currency
            }
        })

        return sortedData;

    } catch (error) {
        console.log(error)
    }
}

const app = express();

app.get('/', async (req, res) => {
    try {
        const data = await fetchMarkets();

        return res.status(200).json({ result: data });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

app.listen(7000, () => {
    console.log("Server running on http://localhost:7000")
})