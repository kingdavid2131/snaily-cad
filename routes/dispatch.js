module.exports = {
    dispatchPage: (req, res) => {

        if (req.session.loggedin) {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        let query = "SELECT * FROM `users` WHERE username = '" + req.session.username2 + "'"
                        connection1.query(query, (err, result) => {
                            if (result[0].dispatch == 'yes') {
                                let weapons = "SELECT * FROM weapons WHERE cadID = '" + req.params.cadID + "'"
                                let addressess = "SELECT address FROM citizens"
                                let officersQ = "SELECT * FROM officers"

                                connection.query(`${weapons}; ${addressess}; ${officersQ}`, (err, result) => {
                                    if (err) {
                                        return console.log(err)
                                    } else {
                                        res.render("dispatch/main.ejs", { title: "Dispatch | SnailyCAD", isAdmin: "", weapons: result[0], address: result[1], officers: result[2], cadId: result2[0].cadID })
                                    }
                                });
                            } else {
                                res.sendStatus(403);
                            };
                        });
                    } else {
                        res.sendStatus(404)
                    }
                }
            });


        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            });

        }



    },
    disptachNameSearch: (req, res) => {
        if (req.session.loggedin) {
            let searchQ = req.body.name_search;
            let query = "SELECT * FROM `citizens` WHERE `full_name` = '" + searchQ + "' AND `cadID` = '" + req.params.cadID + "'";
            let vehicles = "SELECT * FROM `registered_cars` WHERE `owner` = '" + searchQ + "' AND `cadID` = '" + req.params.cadID + "'";
            let weapon = "SELECT * FROM `registered_weapons` WHERE `owner` = '" + searchQ + "' AND `cadID` = '" + req.params.cadID + "'";
            let charge = "SELECT * FROM `posted_charges` WHERE `name` = '" + searchQ + "' AND `cadID` = '" + req.params.cadID + "'";

            connection.query(`${query}; ${vehicles}; ${weapon}; ${charge}`, (err, result) => {
                if (err) {
                    return console.log(err);
                } else {
                    let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'";
                    connection1.query(query2, (err, result2) => {
                        if (err) {
                            console.log(err);
                            return res.sendStatus(500);
                        } else {
                            if (result2[0]) {
                                res.render("dispatch/name-search.ejs", { title: "Dispatch | SnailyCAD", isAdmin: "", result: result[0][0], vehicles: result[1], weapons: result[2], charges: result[3], cadId: result2[0].cadID });
                            } else {
                                res.sendStatus(404);
                            };
                        };
                    });
                };
            });
        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            });
        }


    },
    disptachPlateSearch: (req, res) => {
        if (req.session.loggedin) {
            let searchQ = req.body.plate_search;
            let vehicle = "SELECT * FROM `registered_cars` WHERE `plate` = '" + searchQ + "' AND `cadID` = '" + req.params.cadID + "'";

            connection.query(`${vehicle}`, (err1, result1) => {
                if (!result1[0]) {
                    console.log(err1);
                    let query2 = "SELECT cadID FROM `users` WHERE `cadID` = '" + req.params.cadID + "'"

                    connection1.query(query2, (err, result2) => {
                        if (err) {
                            console.log(err);
                            return res.sendStatus(500);
                        } else {
                            if (result2[0]) {
                                res.render("dispatch/plate-not-found.ejs", { title: "Dispatch | SnailyCAD", isAdmin: "", cadId: result2[0].cadID });
                            } else {
                                res.sendStatus(404);
                            };
                        };
                    });
                } else {
                    let query2 = "SELECT cadID FROM `users` WHERE `cadID` = '" + req.params.cadID + "'"

                    connection1.query(query2, (err, result2) => {
                        if (err) {
                            console.log(err);
                            return res.sendStatus(500);
                        } else {
                            if (result2[0]) {

                                let citizen = "SELECT * FROM `citizens` WHERE `full_name` = '" + result1[0].owner + "' AND `cadID` = '" + req.params.cadID + "'";
                                connection.query(citizen, (err, result) => {

                                    res.render("dispatch/plate-search.ejs", { title: "Dispatch | SnailyCAD", isAdmin: "", plates: result1[0], name: result[0], cadId: result2[0].cadID });
                                });
                            } else {
                                res.sendStatus(404)
                            }
                        }
                    });


                };
            });
        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            });
        }

    },
    disptachWeaponSearch: (req, res) => {
        if (req.session.loggedin) {
            let searchQ = req.body.weapon_search;
            let weaponQ = "SELECT * FROM `registered_weapons` WHERE `weapon` = '" + searchQ + "' AND `cadID` = '" + req.params.cadID + "'";

            connection.query(`${weaponQ}`, (err, result) => {
                res.render("dispatch/weapons-search.ejs", { title: 'Dispatch | SnailyCAD', isAdmin: "", weapons: result });
            })
        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'";

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`);
                    } else {
                        res.sendStatus(404);
                    }
                }
            });
        }

    },
    disptachAddressSearch: (req, res) => {
        if (req.session.loggedin) {
            let searchQ = req.body.address_search;
            let query = "SELECT * FROM citizens WHERE address = '" + searchQ + "'";

            connection.query(query, (err, result) => {
                if (err) {
                    return console.log(err);
                } else {
                    res.render("dispatch/address-search.ejs", { title: "Dispatch | SnailyCAD", isAdmin: "", users: result });
                };
            });
        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`)
                    } else {
                        res.sendStatus(404)
                    }
                }
            });
        }

    },
    statusChangeDispatch: (req, res) => {
        if (req.session.loggedin) {
            let id = req.body.id
            let status = req.body.status;
            let status2 = req.body.status2;
            if (status2 === undefined) {
                status2 = "----------"
            }
            let query1 = "UPDATE `officers` SET `status` = '" + status + "' WHERE `officers`.`id` = '" + id + "'"
            let query2 = "UPDATE `officers` SET `status2` = '" + status2 + "' WHERE `officers`.`id` = '" + id + "'"
            connection.query(`${query1}; ${query2};`, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500)
                } else {
                    let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'"

                    connection1.query(query2, (err, result2) => {
                        if (err) {
                            console.log(err);
                            return res.sendStatus(500);
                        } else {
                            if (result2[0]) {
                                res.redirect(`/cad/${result2[0].cadID}/dispatch`)
                            } else {
                                res.sendStatus(404)
                            }
                        }
                    });

                }
            })
        } else {
            let query2 = "SELECT cadID FROM `users` WHERE cadID = '" + req.params.cadID + "'";
            connection1.query(query2, (err, result2) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                } else {
                    if (result2[0]) {
                        res.redirect(`/cad/${result2[0].cadID}/login`);
                    } else {
                        res.sendStatus(404);
                    };
                };
            });
        };
    }
};