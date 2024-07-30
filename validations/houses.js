const houseValidations = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Title is mandatory",
            bail: true
        },
        isString: {
            errorMessage: "Title must be a string",
            bail: true
        }
    },
    description: {
        in: ["body"],
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