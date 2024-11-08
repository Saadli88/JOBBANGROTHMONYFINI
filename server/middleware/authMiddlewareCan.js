
import jwt from 'jsonwebtoken'
import Candidat from '../models/Candidat.js'

const authMiddlewareCan =async (req,res,next) => {

const {authorization}=  req.headers

if(!authorization) {
    return res.status(401).json({error: 'Authorizasation token required'})
}
    const tokenCan = authorization.split(' ')[1]

    try{

        const {_id}=jwt.verify(tokenCan, process.env.SECRET)
        req.candidat = await Candidat.findOne({ _id}).select('_id')
        next()

    }catch(error){
        console.log(error)
        res.status(401).json({ error: 'Request pas autorisé'})    
        }


}

export default authMiddlewareCan
