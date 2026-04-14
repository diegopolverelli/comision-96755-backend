export const auth=(permisos=[])=>{
    return (req, res, next)=>{
        if(!Array.isArray(permisos)){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Problemas con los permisos de la ruta`})
        }

        permisos=permisos.map(p=>p.toLowerCase())

        if(permisos.includes("public")) return next()

        console.log(req.user)
        if(!req.user || !req.user.rol){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No hay usuarios valido autenticados`})
        }

        if(!permisos.includes(req.user.rol.toLowerCase())){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso solicitado`})
        }

        next()
    }
}