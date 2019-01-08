// 'next' - fuction that passes request on to the next middleware in the chain
module.exports = (req, res, next) => {
    if(!req.user) {
        return res.status(401).send({ error:'You must log in!' })  
    }      

    next();
};
