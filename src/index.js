const express = require('express');
require('./config/dotenv')();
require('./config/sequelize');

const app = express();
const port = process.env.PORT || 3333;
const cors = require('cors');
const routes = require('./routes/routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});
  
module.exports = app;