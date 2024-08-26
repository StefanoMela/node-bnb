const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerData = {
    name: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: 'Name is required.',
            bail: true
        },
        isString: {
            errorMessage: 'Name gotta be a string.',
            bail: true
        },
        isLength: {
            errorMessage: 'Name must be at least 3 chars',
            options: { min: 3 }
        },
    },
    lastName: {
        in: ["body"],
        trim: true,
        isString: {
            errorMessage: 'Last name gotta be a string.',
            bail: true
        },
    },
    dateOfBirth: {
        in: ["body"],
        trim: true,
        toDate: true,
        notEmpty: {
            errorMessage: 'Date of birth is required.',
            bail: true
        },
        isISO8601: {
            errorMessage: 'Date of birth must be a valid date',
            bail: true
        }
    },
    username: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: 'Username is required.',
            bail: true
        },
        isString: {
            errorMessage: 'Username must be a string.',
            bail: true
        },
        isLength: {
            errorMessage: 'Username must be at least 3 chars',
            options: { min: 3 }
        },
        custom: {
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: { username: value }
                });
                if (user) {
                    throw new Error(`Username ${value} already taken.`);
                }
                return true;
            }
        }
    },
    email: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: "Email è mandatory",
            bail: true,
        },
        isEmail: {
            errorMessage: 'Email must be valid',
            bail: true
        },
        custom: {
            // controllo se l'email è già presente nel DB
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: { email: value }
                });
                if (user) {
                    throw new Error(`Email ${value} already taken.`);
                }
                return true;
            }
        }
    },
    password: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: 'Password è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Password deve essere una stringa.',
            bail: true
        },
        isLength: {
            errorMessage: 'Password deve essere di almeno 8 caratteri',
            options: { min: 8 }
        }
    },
}

const loginData = {
    email: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: 'Email is required.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email must be valid',
        },
        custom: {
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: { email: value }
                });
                if (!user) {
                    throw new Error(`Email ${value} not found.`);
                }
                return true;
            }
        }
    },
    password: {
        in: ["body"],
        trim: true,
        notEmpty: {
            errorMessage: 'Password is required.',
            bail: true
        },
        isString: {
            errorMessage: 'Password must be a string.',
            bail: true
        },
    }
}

module.exports = {
    registerData,
    loginData
}