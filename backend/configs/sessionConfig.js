const session = {
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 3600000,
        httpOnly: true,
    }
};

export default session;