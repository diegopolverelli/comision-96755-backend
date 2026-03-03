export const isUser=(req, res, next)=>{
    console.log(req.user)
    if(!req.user || !req.user.rol){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    if(req.user.rol!="user"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`Privilegios insuficientes para el recurso solicitado`})
    }

    next()
}

export const isAdmin=(req, res, next)=>{
    if(!req.user || !req.user.rol){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    if(req.user.rol!="admin"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`Privilegios insuficientes para el recurso solicitado`})
    }

    next()
}

export const authRoles=(permisos=[])=>{  // ["Admin", "USER", "manager"]
    return (req, res, next)=>{
        if(!Array.isArray(permisos)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Error en permisos de ruta`})
        }

        permisos=permisos.map(p=>p.toLowerCase())

        if(permisos.includes("public")){

            return next()
        }

        if(!req.user || !req.user.rol){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No hay usuarios autenticados`})
        }        

        if(!permisos.includes(req.user.rol.toLowerCase())){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`Privilegios insuficientes para el recurso solicitado`})
        }

        next()
    }
}