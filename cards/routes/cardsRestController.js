const express = require("express");
const { handleError } = require("../../utils/handleErrors");
const {
    getAllCards,
    getUserCards,
    getSingleCard,
    createNewCard,
    updateTheCard,
    likeingCard,
    deleteingCard,
} = require("../service/cardService");
const normalizeCard = require("../helper/normalizeCard");
const validateCard = require("../validations/cardValidationService");
const { auth } = require("../../auth/authService");
const router = express.Router();

//these middleware's unlike (for example) app.use()
// are more specific and called only for they're method
// and they are called middleware if they contain the next() method

// get all cards - W.
router.get("/", async (req, res) => {
    try {
        const cards = await getAllCards();
        return res.send(cards);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

// the card exists in the database but in postman looks like it's not
router.get("/my-cards", auth, async (req, res) => {
    try {
        const id = req.user._id;
        const card = await getUserCards(id);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const card = await getSingleCard(id);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

// create a new card - W.
router.post("/", async (req, res) => {
    try {
        let card = req.body;
        // const user = { _id: "6376667871c9c1d0b30481f7" };
        let user = req.params;
        const { error } = validateCard(card);
        if (error)
            return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

        card = await normalizeCard(card, user._id);
        card = await createNewCard(card, user._id);
        return res.status(201).send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        let card = req.body;
        const cardId = req.params.id;

        const { error } = validateCard(card);
        if (error)
            return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

        card = await normalizeCard(card);
        card = await updateTheCard(cardId, card);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const cardId = req.params.id;
        const userId = req.body.userId;
        const card = await likeingCard(cardId, userId);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const card = await deleteingCard(id);
        return res.send(card);
    } catch (error) {
        return handleError(res, error.status || 500, error.message);
    }
});

module.exports = router;
