const fetch = require("node-fetch")

module.exports = {
    officersPage: (req, res) => {
        // if (req.session.loggedin) {
        // } else {
        //     res.redirect("/login")
        // }
        res.render("officers-pages/officers.ejs", { title: "My Officers", users: "qsd" })

    },
    tabletPage: (req, res) => {
        res.render("officers-pages/tablet.ejs", {
            title: "Officers Tablet", fetch: fetch("http://95.179.141.103:8000/businesses").then(url => {
                url.json("http://95.179.141.103:8000/businesses").then(result => {
                    console.log(result)
                })
            })
        })
    },
    penalCodesPage: (req, res) => {
        const url = "http://95.179.141.103:3000";
        fetch(url)
            .then(res => res.json())
            .then(json => res.render("officers-pages/penal-codes.ejs", { title: "Penal Codes | Equinox CAD", penals: json }));

    }
}

