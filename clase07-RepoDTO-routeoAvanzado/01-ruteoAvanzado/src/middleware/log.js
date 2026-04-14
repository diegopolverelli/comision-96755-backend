export const logger=(req, res, next)=>{
    console.log(`path consultado: ${req.url}`)
    // console.log(req)

    console.log(req)

    next()
}