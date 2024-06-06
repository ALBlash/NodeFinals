const express = require("express");
const { handleError } = require("../../utils/handleErrors");
const {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    changeUserBusinessStatus,
    deleteUser,
} = require("../service/userService");
const normalizeUser = require("../helpers/normalizeUser");
const {
    validateRegistration,
    validateLogin,
    validateUpdate,
} = require("../validations/userValidationService");
const { auth } = require("../../auth/authService");
const { generateUserPassword } = require("../helpers/bcrypt");
const router = express.Router();


// thats a W.
router.post("/", async (req, res) => {
    try {
        let user = req.body;
        const { error } = validateRegistration(user);
        if (error)
            return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

        user = normalizeUser(user);
        user.password = generateUserPassword(user.password)
        user = await registerUser(user);
        return res.status(201).send(user);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        let user = req.body;
        const { error } = validateLogin(user);
        if (error)
            return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

        // sends a token after all the functions
        user = await loginUser(req.body);
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});


// makes sure only Admin's enter
// the function auth returns the user data if everything goes well
router.get("/", auth, async (req, res) => {
    try {
        const { isAdmin } = req.user;
        if (!isAdmin) return handleError(res, 403, "access denied. User is not admin");
        // auth(isAdmin);
        const users = await getUsers();
        return res.send(users);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUser(id);
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

// update user data
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let user = req.body;
        const { error } = validateUpdate(user);
        if (error)
            return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

        user = normalizeUser(user);
        user = await updateUser(id, user);
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { isBusiness } = req.body;
        const user = await changeUserBusinessStatus(id, isBusiness);
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await deleteUser(id);
        return res.send(user);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

module.exports = router;
