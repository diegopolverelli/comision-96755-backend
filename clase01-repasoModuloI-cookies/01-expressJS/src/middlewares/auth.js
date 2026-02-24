export const auth=(req, res, next)=>{
    let {email, password}=req.query

    if(email!="admin@test.com" || password!="1234"){
        
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales invalidas`})
    }

    next()
}