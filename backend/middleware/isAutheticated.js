
import { UnauthorizedError } from "../models/Error.js";
import handleError from "../utils/handleError.js";

const isAuthenticated = async(req, res, next) => {
    if(req.session.userId){
        return next();
    }
    return handleError(new UnauthorizedError('Not authorized'), req, res);
}

export default isAuthenticated;