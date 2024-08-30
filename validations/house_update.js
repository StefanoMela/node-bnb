const houseValidations = {
    description: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "Description is mandatory",
            bail: true
        },
        isString: {
            errorMessage: "Description must be a string",
            bail: true
        }
    },
    pricePerDay: {
        in: ["body"],
        trim: true,
        toInt: true,
        notEmpty: {
            errorMessage: "Price is mandatory",
            bail: true
        },
        isInt: {
            errorMessage: "Price must be an integer",
            bail: true
        }
    },
    rooms: {
        in: ["body"],
        trim: true,
        toInt: true,
        notEmpty: {
            errorMessage: "Rooms is mandatory",
            bail: true
        },
        toInt: true,
        isInt: {
            errorMessage: "Rooms must be an integer",
            bail: true
        }
    },
    beds: {
        in: ["body"],
        trim: true,
        toInt: true,
        notEmpty: {
            errorMessage: "Beds is mandatory",
            bail: true
        },
        toInt: true,
        isInt: {
            errorMessage: "Beds must be an integer",
            bail: true
        }
    },
    baths: {
        in: ["body"],
        trim: true,
        toInt: true,
        notEmpty: {
            errorMessage: "Baths is mandatory",
            bail: true
        },
        isInt: {
            errorMessage: "Baths must be an integer",
            bail: true
        }
    },
    squareMeters: {
        in: ["body"],
        trim: true,
        toInt: true,
        notEmpty: {
            errorMessage: "Square meters is mandatory",
            bail: true
        },
        isInt: {
            errorMessage: "Square meters must be an integer",
            bail: true
        }
    },
    address: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "Address is mandatory",
            bail: true
        },
        isString: {
            errorMessage: "Address must be a string",
            bail: true
        }
    },
    user: {
        in: ["user"],
        trim: true,
        toInt: true,
        notEmpty: {
            errorMessage: "User ID is mandatory",
            bail: true
        },
        isInt: {
            errorMessage: "User ID must be an integer",
            bail: true
        }
    }
}

module.exports = houseValidations;