const divMensajes=document.getElementById("divMensajes")
const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value 
    let password=inputPassword.value 

    if(email.trim().length==0 || password.trim().length==0){
        divMensajes.textContent=`Complete email | password`
        setTimeout(() => {
            divMensajes.textContent=``
        }, 3000);
        return 
    }

    const response=await fetch("/api/sessions/login", {
        method: "POST", 
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, password})
    })
    if(response.status>=400){
        let {error}=await response.json()
        divMensajes.textContent=`Error: ${error}`
        setTimeout(() => {
            divMensajes.textContent=``
        }, 3000);
        return 
    }

    let {payload}=await response.json()
    window.location.href=`/perfil?mensaje=${payload}`

})