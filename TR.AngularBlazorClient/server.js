const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/tr.angular-blazor-client/browser')));

// Serve Blazor WebAssembly assets
app.use(express.static(path.join(__dirname, 'src/assets')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/tr.angular-blazor-client/browser/index.html'));
});

const port = process.env.PORT || 4205;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
