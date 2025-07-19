// 4.18.2

import express from 'express'

const app = express()



app.get('/auth/register', (req, res) => {
    console.log(req.body)
})



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})  