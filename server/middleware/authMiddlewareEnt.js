import jwt from 'jsonwebtoken'
import Entreprise from '../models/Entreprise.js'

const authMiddlewareEnt =async (req,res,next) => {

const {authorization}=  req.headers

if(!authorization) {
    return res.status(401).json({error: 'Authorizasation token required'})
}
    const tokenEnt = authorization.split(' ')[1]

    try{

        const {_id}=jwt.verify(tokenEnt, process.env.SECRET)
        req.entreprise = await Entreprise.findOne({ _id}).select('_id')
        next()

    }catch(error){
        console.log(error)
        res.status(401).json({ error: 'Request pas autorisé'})    
        }


}

export default authMiddlewareEnt

//test