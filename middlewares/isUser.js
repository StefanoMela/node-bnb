const RestError = require("../utils/restError");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const isUserPost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = parseInt(req.params.id);

        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            return res.status(404).json({ message: "Post non trovato" });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ message: "Puoi modificare solo i tuoi post" });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const isAdmin = (req, res, next) => {
    const { username, password } = req.user;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user || !user.admin) {
        return res.status(403).send('Non sei autorizzato, devi essere admin');
    }
    next();
}

module.exports = {
    isUserPost,
    isAdmin
}