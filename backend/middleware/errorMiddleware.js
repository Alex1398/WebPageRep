// custom error handler for any non-existent routes
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

// custom error handler for any existing routes with bad format
const errorHandler = (err, req, res, next) => {
    /*
    if(res.statusCode === 200)
        error = 500
    else error = res.statusCode
    */
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export { notFound, errorHandler }