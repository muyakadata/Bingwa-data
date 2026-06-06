const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const AT_USERNAME = 'Muyakadata';
const AT_API_KEY = 'WEKA_API_KEY_YAKO_HAPA';

const BUNDLES = { 20: '250MB', 60: '1GB', 110: '2GB', 200: '4GB' };

app.post('/validation', (req, res) => res.json({ ResultCode: 0, ResultDesc: "Accepted" }));

app.post('/confirmation', async (req, res) => {
  const { TransAmount, MSISDN } = req.body;
  const amount = parseInt(TransAmount);
  const phone = `+${MSISDN}`;
  res.json({ ResultCode: 0, ResultDesc: "Success" });

  if (!BUNDLES[amount]) return;
  
  try {
    await axios.post('https://api.africastalking.com/version1/airtime/send',
      `username=${AT_USERNAME}&recipients=[{"phoneNumber":"${phone}","amount":"${amount}"}]`,
      { headers: { 'apiKey': AT_API_KEY, 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  } catch (e) { console.log('AT Error', e.response?.data); }
});

app.listen(process.env.PORT || 3000);
