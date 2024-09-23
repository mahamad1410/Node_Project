const express = require("express")

const app = express();

app.use(express.json())

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

let arr = []

app.get("/", (req, res) => {
    res.render("index.ejs", { arr })
})

app.get("/singup", (req, res) => {
    res.render("singup.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.post("/singup", (req, res) => {
    let { email, password } = req.body
    let obj = {
        id: arr.length + 1,
        email,
        password
    }
    arr.push(obj)
    res.redirect("/login")
})

app.post("/loginData", (req, res) => {
    let { email, password } = req.body
    let data = arr.filter((el) => {
        return el.email == email && el.password == password
    })
    if (data.length) {
        res.redirect("/")
    } else {
        res.send("Login Unsuccesfull")
    }
})

app.delete("/delete/:id", (req, res) => {
    // console.log(req.params.id)
    let d = arr.filter(el => el.id != req.params.id)
    res.send(d)

})

app.listen(8080, () => {
    console.log("Server is Running on 8080")
})