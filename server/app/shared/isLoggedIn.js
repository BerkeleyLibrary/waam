module.exports = (req, res, next) => {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't send error message
    res.json({
        error: 'Not allowed.',
    });
};
