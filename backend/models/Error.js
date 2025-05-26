class HttpError extends Error{
    constructor(code, name, message){
        super(code, name, message);

        this.code = code;
        this.name = name;
        this.message = message;
    }

    toJson(){
        return {
            name: this.name,
            message: this.message
        };
    }
}

class NotFoundError extends HttpError {
    constructor(message){
        super(404, 'NotFoun', message);
    }
}

class UnauthorizedError extends HttpError {
    constructor(message){
        super(401, 'Unauthorized', message);
    }
}

class BadRequestError extends HttpError {
    constructor(message){
        super(400, 'BadRequest', message);
    }
}

export {
    NotFoundError,
    UnauthorizedError,
    BadRequestError
}