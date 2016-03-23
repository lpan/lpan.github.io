import Express from 'express';

const serverPort = 8080;
const app = new Express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

// start app
app.listen(serverPort, err => {
  if (!err) {
    console.log(`Server running on port ${serverPort}`);
  }
});
