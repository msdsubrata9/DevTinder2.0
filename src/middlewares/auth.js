const adminAuth = (req, res, next) => {
    let token = "xyz";
    let isAdminAuthenticated = token === "xyz";
    if (!isAdminAuthenticated) {
        res.status(401).send("User Unauthorized");
    }
    else {
        next();
    }
}

const userAuth = (req, res, next) => {
    let token = "xyz";
    let isAdminAuthenticated = token === "xyz";
    if (!isAdminAuthenticated) {
        res.status(401).send("User Unauthorized");
    }
    else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}