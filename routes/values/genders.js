module.exports = {
    genderPage: (req, res) => {
        if (req.session.loggedin) {
            let query = "SELECT * FROM `genders` ORDER BY id ASC"
            db.query(query, (err, result) => {
                if (err) {
                    res.sendStatus(400)
                }
                res.render("admin-pages/gender.ejs", { title: 'Admin Panel | Genders', genders: result })
            })
        } else {
            res.render("errors/logged.ejs", { title: "Error" })
        }

    },
    deleteGender: (req, res) => {
        if (req.session.loggedin) {
            let playerId = req.params.id;
            // let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
            let deleteUserQuery = 'DELETE FROM genders WHERE id = "' + playerId + '"';

            db.query(deleteUserQuery, (err, result) => {
                console.log(`${playerId} was a success! DELETE`)
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin/values/genders');
            });
        } else {
            res.render("errors/logged.ejs", { title: "Error" })
        }

    },
    addGenderPage: (req, res) => {
        if (req.session.loggedin) {
            res.render("genders/add-gender.ejs", { title: "Add Gender" })

        } else {
            res.render("errors/logged.ejs", { title: "Error" })
        }
    },
    addGender: (req, res) => {
        if (req.session.loggedin) {
            let gender = req.body.gender;

            let query = "INSERT INTO `genders` (`gender`) VALUES ('" + gender + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/admin/values/genders/');
            });
        } else {
            res.render("errors/logged.ejs", { title: "Error" })
        }

    },
    editGenderPage: (req, res) => {
        if (req.session.loggedin) {
            let genderId = req.params.id;
            let query = "SELECT * FROM `genders` WHERE id = '" + genderId + "' ";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render("genders/edit-gender.ejs", { title: "Edit Gender", gender: result[0] })
            });
        } else {
            res.render("errors/logged.ejs", { title: "Error" })
        }

    },
    editGender: (req, res) => {
        if (req.session.loggedin) {
            let genderId = req.params.id;
            let gender = req.body.gender;
            let query = 'UPDATE `genders` SET `gender` = "' + gender + '" WHERE `genders`.`id` = "' + genderId + '"';

            db.query(query, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send(err);
                }
                res.redirect('/admin/values/genders');
                console.log(`EDIT?? ${gender}`)
            });
        } else {
            res.render("errors/logged.ejs", { title: "Error" })
        }

    }

}