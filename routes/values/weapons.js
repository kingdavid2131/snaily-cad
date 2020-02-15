module.exports = {
    weaponsPage: (req, res) => {
        let query = "SELECT * FROM `weapons` ORDER BY id ASC"
        db.query(query, (err, result) => {
            if (err) {
                res.sendStatus(400)
            }
            res.render("admin-pages/weapons.ejs", { title: 'Admin Panel | Weapons', weapons: result })
        })
    },
    deleteWeapon: (req, res) => {
        let playerId = req.params.id;
        // let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
        let deleteUserQuery = 'DELETE FROM weapons WHERE id = "' + playerId + '"';

        db.query(deleteUserQuery, (err, result) => {
            console.log(`${playerId} was a success! DELETE`)
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/admin/values/weapons');
        });
    },
    addWeaponPage: (req, res) => {
        res.render("weapons/add-weapons.ejs", { title: "Add Weapon" })
    },
    addWeapon: (req, res) => {
        let name = req.body.name;

        let query = "INSERT INTO `weapons` (`name`) VALUES ('" + name + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/admin/values/weapons/');
        });
    },
    editWeaponPage: (req, res) => {
        let genderId = req.params.id;
        let query = "SELECT * FROM `weapons` WHERE id = '" + genderId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render("weapons/edit-weapon.ejs", { title: "Edit Gender", weapon: result[0] })
        });
    },
    editWeapon: (req, res) => {
        let genderId = req.params.id;
        let name = req.body.name;
        let query = 'UPDATE `weapons` SET `name` = "' + name + '" WHERE `weapons`.`id` = "' + genderId + '"';

        db.query(query, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }
            res.redirect('/admin/values/weapons');
            console.log(`EDIT?? ${name}`)
        });
    }

}