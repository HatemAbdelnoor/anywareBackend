import userModel from "../../DB/model/User.model.js"
import { verifyToken } from "../modules/utils/GenerateAndVerifyToken.js"
import { asyncHandler } from "../modules/utils/errorHandling.js"



export const auth = () => {
    return asyncHandler(async (req, res, next) => {

        const { authorization } = req.headers
        if (!authorization?.startsWith(process.env.BEARER_KEY)) {
            return next(new Error('In-valid bearer key', { cause: 400 }))
        }
        const token = authorization.split(process.env.BEARER_KEY)[1]
        if (!token) {
            return next(new Error('Missing token', { cause: 400 }))
        }
        const decoded = verifyToken({ token })
        if (!decoded?.id) {
            return next(new Error('In-valid token payload', { cause: 400 }))
        }

        const user = await userModel.findById(decoded.id).select(" email    ")
        if (!user) {
            return next(new Error(`Not register account`, { cause: 401 }))
        }
        req.user = user;
        return next()
    })
}


