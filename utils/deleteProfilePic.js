const path = require('path');
const fs = require('fs');

const deleteProfilePic = (filename) => {
    try{
        const filePath = path.join(__dirname, '../public/avatars/', filename);
        console.log(`Elimino la profile pic ${filename}.`);
        fs.unlinkSync(filePath);
    }
    catch(err){
        console.log(`Non sono riuscito ad eliminare la profile pic ${filename}.`);
    }
}

module.exports = deleteProfilePic;