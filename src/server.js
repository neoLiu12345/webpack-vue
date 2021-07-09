//  node express

const express = require('express')
const app = express()
const port = 3001

app.get('/user', (req, res) => {
    res.json({name: 'neo'})
})


// app.listen(port, () => console.log(`Example app listening on port port!`))
app.listen(port)