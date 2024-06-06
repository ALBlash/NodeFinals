const normalizeUser = rawUser => {
    const name = {
        first: rawUser.name.first,
        middle: rawUser.name.middle || ' ',
        last: rawUser.name.last
    };

    const image = {
        url: rawUser.image.url || "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
        alt: rawUser.image.alt || "Business card image"
    };

    const address = {
        state: rawUser.address.state || "not defined",
        country: rawUser.address.country || "not defined ",
        city: rawUser.address.city || " not defined",
        street: rawUser.address.street || "not defined ",
        houseNumber: rawUser.address.houseNumber || 123456,
        zip: rawUser.address.zip || 123456
    };

    const user = {
        ...rawUser,
        name: name,
        image: image,
        address: address,
    };

    return user;
};

module.exports = normalizeUser;