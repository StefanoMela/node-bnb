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
    image: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Image is mandatory",
            bail: true
        },
        isString: {
            errorMessage: "Image must be a string",
            bail: true
        }
    },
    price: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Price is mandatory",
            bail: true
        },
        toInt: true,
        isInt: {
            errorMessage: "Price must be an integer",
            bail: true
        }
    },
    rooms: {
        in: ["body"],
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
        notEmpty: {
            errorMessage: "Beds is mandatory",
            bail: true
        },
        toInt: true,
        isInt: {
            errorMessage: "Beds must be an integer",
            bail: true
        }
    }
}