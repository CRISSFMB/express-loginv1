
// index solo usamos para arrancar el servidor 

import server from "./server"

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000')
})  