const express = require('express');
const mongodb = require('./data/database');
const e = require('express');
const app = express();
const BodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, z-key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if (err) {
      console.error("❌ Failed to connect to database:", err);
  } else {
      console.log("✅ Database initialized successfully");
      
      // Start Server
      app.listen(PORT, () => {
          console.log(`🚀 Server is running on http://localhost:${PORT}`);
      });
  }
});