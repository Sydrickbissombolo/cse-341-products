const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Loging error to the console

    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.stack : {}, // Showing stacktrace only in development
    });
};

module.exports = errorHandler;
