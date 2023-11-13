
import connectDB from '../DB/connection.js'
import userRouter from './modules/user/user.router.js'
import authRouter from './modules/auth/auth.router.js'
import requestIp  from 'request-ip'
import cors from 'cors'

import { globalErrorHandling } from './modules/utils/errorHandling.js'

const bootstrap = (app, express) => {
    app.use(cors())

    app.get('/', (req, res) => {
        res.json({message: "hello world!"})
      })
      
    app.use(express.json())
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
   
    app.use((error,req,res,next)=>{
        return res.json({message:error.message})
    })
    app.use("*", (req, res, next) => {
        return res.json({ message: "In-valid Routing" })
    })


    app.use(globalErrorHandling)
    connectDB()
}
export default bootstrap