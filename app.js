require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const auth_routes = require('./routes/auth_routes');
const station_routes = require('./routes/station_routes');
const session_routes = require('./routes/session_routes');
const portable_charger_routes = require('./routes/portable_charger_routes');
const app = express();

// middleware
app.use(bodyParser.json());

// routes
app.use('/auth', auth_routes);
// Charging Station Routes
app.use('/api', station_routes);
//portabe Chargers route
app.use('/api/chargers', portable_charger_routes);

// Charging Session Routes
app.use('/api', session_routes);
// home route
app.get('/', (req, res) => {
    res.send('Welcome to ChargeHub Backend API');
});


// Only start the server if this file is run directly
if (require.main === module) {
    const PORT =  3000; 
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}


module.exports = app;
