import express from 'express';
const app = express()
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello E-Commerce Server')
})

app.use('/api/v1',router)

app.use(globalErrorHandler)
app.use(notFound)


export default app;