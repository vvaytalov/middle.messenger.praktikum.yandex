const express = require('express');
const history = require('connect-history-api-fallback')
const path = require('path');
const app = express();
const PORT = 3000;
const port = process.env.PORT || PORT;

const distPath = path.join(__dirname, '../', 'dist');

app.use(history());
app.use(express.static(distPath));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
}); 