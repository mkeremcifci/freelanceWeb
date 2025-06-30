const session = {
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: true,
        maxAge: 3600000,
        httpOnly: true,
    }
};

export default session;