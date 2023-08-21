
const validateMethod = (req, res, next) =>{
    if(req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE' && req.method !== 'GET'){
        return res.status(405).send('El método enviado no está permitido')
    }else{
        next();
    }
}
module.exports = validateMethod;
