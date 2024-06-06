// first when the request (service) arrives to the server 
// before the server takes care of it (of the raw request)
// we run a validation so if there is an error we return an error right away
// it cold be a mtiny validation or a big function


const { handleJoiError } = require("../../utils/handleErrors");
const normalizeCard = require('../helper/normalizeCard');
const {
    getCards,
    getCard,
    create,
    updateCard,
    like,
    deleteCard,
    getMyCards,
} = require("../models/cardsDataAccessService");
const validateCard = require("../validations/cardValidationService");

const getAllCards = async () => {
    try {
        const cards = await getCards();
        return Promise.resolve(cards);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getUserCards = async userId => {
    try {
        const card = await getMyCards(userId);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getSingleCard = async cardId => {
    try {
        const card = await getCard(cardId);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};

const createNewCard = async (rawCard, userId) => {
    // const { error } = validateCard(rawCard);
    // if (error) return handleJoiError(error);

    try {
        let card = await normalizeCard(rawCard, userId);
        card.createdAt = new Date();
        card = await create(card);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateTheCard = async (cardId, rawCard) => {
    try {
        let card = { ...rawCard };
        card = await updateCard(cardId, card);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};

const likeingCard = async (cardId, userId) => {
    try {
        const card = await like(cardId, userId);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteingCard = async cardId => {
    try {
        const card = await deleteCard(cardId);
        return Promise.resolve(card);
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.getAllCards = getAllCards;
exports.getUserCards = getUserCards;
exports.getSingleCard = getSingleCard;
exports.createNewCard = createNewCard;
exports.updateTheCard = updateTheCard;
exports.likeingCard = likeingCard;
exports.deleteingCard = deleteingCard;
