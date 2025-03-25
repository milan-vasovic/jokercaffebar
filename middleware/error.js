const ErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMsg = err.message || "Došlo je do greške.";

    return res.status(statusCode).render("error/error", {
        path: "/error",
        pageTitle: `Greška ${statusCode}`,
        pageDescription: "Došlo je do greške na serveru.",
        pageKeyWords: "Greška, Server, Problem, Error",
        statusCode,
        errorMsg,
        errorDetails: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};

export default ErrorHandler;
