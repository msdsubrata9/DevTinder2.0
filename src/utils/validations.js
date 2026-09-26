const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    }
    if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("First Name should be within length of 4 to 50");
    }
}

const validateProfileEditData = (req) => {
    const ALLOWED_EDITED_DATA_FIELD_LIST = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];

    const isAllowedEdit = Object.keys(req).every(element => {
        return ALLOWED_EDITED_DATA_FIELD_LIST.includes(element);
    });
    return isAllowedEdit;
}

module.exports = {
    validateSignUpData,
    validateProfileEditData,
}