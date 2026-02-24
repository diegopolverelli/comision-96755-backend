import express from 'express';
import cookieParser from "cookie-parser"
const PORT=3000;

const app=express();

app.use(cookieParser("claveSecreta"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./src/public'))

app.get('/',(req,res)=>{

    console.log(req.headers)

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})


app.get("/get", (req, res)=>{
    let cookies=req.cookies
    let cookiesFirmadas=req.signedCookies

    if(req.cookies.cookie01){
        console.log(`Seteo tamaño fuente en ${req.cookies.cookie01.fontSize}`)
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:{
        cookies, 
        cookiesFirmadas
    }});

})

app.get('/set',(req,res)=>{

    let data={
        fontSize: 18, 
        theme: "dark", 
        font: "Arial" 
    }

    
    res.cookie("cookie01", data, {maxAge: 1000 * 60 * 5})
    res.cookie("cookie01b", data, {maxAge: 1000 * 5 })
    res.cookie("cookie02", data, {expires: new Date(2026, 2, 23)})
    res.cookie("cookie03firmada", data, {expires: new Date(2026, 2, 23), signed: true})
    res.cookie("cookie04firmadaHttpOnly", data, {expires: new Date(2026, 2, 23), signed: true, httpOnly: true})

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies Seteadas...!!!"});
})

app.get("/delcookies", (req, res)=>{

    // res.clearCookie("cookie01")
    let cookies=Object.keys(req.cookies)
    cookies.forEach(c=>res.clearCookie(c))

    cookies=Object.keys(req.signedCookies)
    cookies.forEach(c=>res.clearCookie(c))
    // Array.isArray(1)
    // Array.isArray([1,2])

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies eliminadas...!!!"});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
