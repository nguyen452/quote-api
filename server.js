const express = require('express');
const app = express();
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
})

app.get('/api/quotes', (req, res) => {
    let author = req.query.person;
    if(author) {
        const quoteByAuthor = quotes.filter((quote) => {
            return quote.person === author;
        })
        if(quoteByAuthor.length !== 0) {
            res.send({quotes: quoteByAuthor})
        } else {
            return res.status(404).send();
        }
    } else {
        res.send({quotes: quotes})
    }

});


app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes)
    res.send({quote: randomQuote})
});
