const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerData = {
    name: {
        in: ["body"],
        isString: {
            errorMessage: 'Name gotta be a string.',
            bail: true
        },
        isLength: {
            errorMessage: 'Name must be at least 3 chars',
            statusCode: 422,
            options: { min: 3 }
        }
    },
    lastName: {
        in: ["body"],
        isString: {
            errorMessage: 'Last name gotta be a string.',
            bail: true
        },
    },
    dateOfBirth: {
        in: ["body"],
        toDate: true,
        isISO8601: {
            errorMessage: 'Date of birth must be a valid date',
            bail: true
        }
    },
    username: {
        in: ["body"],
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
    avatar: {
        in: ["file"],
        optional: true,
        custom: {
            options: (value, req ) => {
                const allowedMimetypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (req.file) {
                    const file = req.file;
                    if (!allowedMimetypes.includes(file.mimetype)) {
                        throw new Error('Invalid avatar file format. Allowed formats: jpeg, png, gif');
                    }
                    return true;
                }
                return true;
            },
        },
    },
}

const loginData = {
    email: {
        in: ["body"],
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