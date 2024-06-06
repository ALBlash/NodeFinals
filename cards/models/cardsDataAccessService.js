// presentation NOde.js - 147 - 155;

const { handleBadRequest, handleError } = require("../../utils/handleErrors");
const Card = require("./mongodb/card");

const DB = process.env.DB || "MONGODB";

const getCards = async () => {
    if (DB === "MONGODB") {
        try {
            //   throw new Error("Opss... i did it again!");
            let cards = Card.find();
            console.log("cards from cardDataAccessService success" + cards);
            return Promise.resolve(cards);
        } catch (error) {
            error.status = 404;
            handleBadRequest("cards not found", error);
            return Promise.reject(error);
        }
    }
    return Promise.resolve([]);
};

const getMyCards = async userId => {
    if (DB === "MONGODB") {
        try {
            const cards = await Card.find({ user_id: userId });

            if (!cards || cards.length === 0) {
                handleError(req, 404, "no cards were found")
            }

            return Promise.resolve(cards);
        } catch (error) {
            error.status = 404;
            handleBadRequest("getMyCards not found", error);
            return Promise.reject(error);
        }
    }
    return Promise.resolve([]);
};


const getCard = async cardId => {
    if (DB === "MONGODB") {
        try {
            let card = await Card.findById(cardId);

            if (!card || card.length === 0) {
                throw new Error("Could not find card in database");
            }

            return Promise.resolve(card);
        } catch (error) {
            error.status = 404;
            handleBadRequest("getCard not found", error);
            return Promise.reject(error);
        }
    }
    return Promise.resolve([]);
};

const create = async normalizedCard => {
    if (DB === "MONGODB") {
        try {
            let card = new Card(normalizedCard);
            card = await card.save();
            //   throw new Error("Opss... i did it again!");
            return Promise.resolve(card);
        } catch (error) {
            error.status = 400;
            return Promise.reject(error);
        }
    }
    return Promise.resolve("create card not in mongodb");
};

const updateCard = async (id, normalizedCard) => {
    if (DB === "MONGODB") {
        try {
            let card = await Card.findByIdAndUpdate(id, normalizedCard, {
                new: true
            });

            if (!card || card.length === 0) {
                throw new Error("Could not update this card because a card with this ID cannot be found in the database");
            }
            return Promise.resolve(card);
        } catch (error) {
            error.status = 400;
            handleBadRequest("mongoose", error);
            return Promise.reject(error);
        }
    }
    return Promise.resolve("card update not in mongodb");
};

const like = async (cardId, userId) => {
    if (DB === "MONGODB") {
        try {
            let card = await Card.findById(cardId);

            if (!card) {
                throw new Error("Could not change card likes because a card with this ID cannot be found in the database");
            }

            if (!card.likes.includes(userId)) {
                card.likes.push(userId);
            } else {
                card.likes = card.likes.filter(id => id !== userId);
            }

            await card.save();

            return Promise.resolve(`Card no. ${cardId} likes updated successfully!`);
        } catch (error) {
            error.status = 400;
            handleBadRequest("mongoose", error);
            return Promise.reject(error);
        }
    }
    return Promise.resolve("!Card updated");
};


const deleteCard = async id => {
    if (DB === "MONGODB") {
        try {
            let card = await Card.findByIdAndDelete(id);

            if (!card || card.length === 0) {
                throw new Error("Could not delete this card because a card with this ID cannot be found in the database");
            }
            return Promise.resolve(card);
        } catch (error) {
            error.status = 400;
            handleBadRequest("mongoose", error);
            return Promise.reject(error);
        }
    }
    return Promise.resolve("card deleted not in mongodb");
};

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.create = create;
exports.updateCard = updateCard;
exports.like = like;
exports.deleteCard = deleteCard;
