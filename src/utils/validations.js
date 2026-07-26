const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    }
    if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("First Name should be within length of 4 to 50");
    }
}

module.exports = {
    validateSignUpData,
}