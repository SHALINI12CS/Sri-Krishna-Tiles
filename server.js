const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send_message', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'g.shalini12cs@gmail.com', // Replace with your email
      pass: 'bihw gepf uvsy wyua' // Replace with your email password
    }
  });

  const mailOptions = {
    from: 'g.shalini12cs@gmail.com', // Replace with your email
    to: 'g.shalini12cs@gmail.com', // Replace with recipient email
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email: ' + error);
    }
    res.send('Message sent successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
