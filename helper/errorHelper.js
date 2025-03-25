class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

function throwValidationError(field) {
    throw new AppError(`Polje '${field}' nije validno!`, 400);
}

function throwNotFoundError(entity) {
    throw new AppError(`${entity} nije pronađen!`, 404);
}

function throwServerError(err) {
    throw new AppError(`Greška na serveru! ${err.message || err}`, 500);
}

function throwEmailError() {
    throw new AppError("Neuspešno slanje emaila!", 500);
}

export default {
    AppError,
    throwValidationError,
    throwNotFoundError,
    throwServerError,
    throwEmailError,
};
