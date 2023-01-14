import http from 'http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<h1>Hello<h1>');
  res.end();
});

server.listen(3000, () => console.log(`Server running on port ${3000}`));
