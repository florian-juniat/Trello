const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {client} = require('../database/db');
const nodemailer = require('nodemailer');

router.get("/:id", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    const response = await client.query("select * from boards where id = " + req.params.id + ";");
    const tmp = await client.query("select * from cards where id IN(" + response.rows[0].card_id + ");");
    var name = await client.query("select name, id from users where id in (" + response.rows[0].memb_id + ");");
    if (!response.rows[0]) {
        res.status(404).send("Board not found");
        return;
    }
    if (response.rows[0].memb_id.includes(decoded.indice)) {
        response.rows[0].memb_id = name.rows;
        var obj = {
            board: response.rows[0],
            cards: tmp.rows
        }
        res.status(200).send(obj);
    } else
        res.status(403).send("Forbidden");
});


router.post("/:id/add-list", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    let board = {
        list: req.body.namelist
    };
    var k = 0;
    const all_name_lists = await client.query("select list from boards where id =" + req.params.id + ";");
    if (all_name_lists.rows.length > 1) {
        client.query("update boards set list = ARRAY [ '" + board.list + "' ] where id =" + req.params.id + ";");
    } else {
        for (var i = 0; i < all_name_lists.rows.length; i++) {
            if (all_name_lists.rows[i].list) {
                for (var j = 0; j < all_name_lists.rows[i].list.length; j++) {
                    if (all_name_lists.rows[i].list[j] == req.body.namelist) {
                        res.status(403).send("You already have the same list's name");
                        k = 1;
                    }
                }
            }
        }
    }
    if (k != 1) {
        await client.query("update boards set list = array_append(list, '" + board.list + "') where id =" + req.params.id + ";");
        res.status(200).send("List created.");
    }
});


router.delete("/:id/remove-list", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    let board = {
        list: req.body.namelist
    };
    await client.query("update boards set list = array_remove(list, '" + board.list + "') where id =" + req.params.id +";");
    res.status(200).send("List removed.");
});

router.post("/:id/remove-list", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    let board = {
        list: req.body.namelist
    };
    await client.query("update boards set list = array_remove(list, '" + board.list + "') where id =" + req.params.id +";");
    res.status(200).send("List removed.");
});


router.post("/:id/add-user", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    var k = 0;
    const all_users = await client.query("select * from users");
    for (let i = 0; i < all_users.rows.length; i++) {
        if (all_users.rows[i].email == req.body.adduser) {
            await client.query("update boards set memb_id = array_append(memb_id, '" + all_users.rows[i].id + "') where id =" + req.params.id +";");
            res.status(200).send("User add.");
            k = 1;
        }
    }
    if (k != 1) {
        res.status(404).send("User not found.");
    }
});


router.post("/:id/remove-user", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    let board = {
        removeuser: req.body.removeuser,
        memb_id: [decoded.indice]
    };
    var k = 0;
    const all_users = await client.query("select * from users where email ='" + board.removeuser + "';");
    await client.query("update boards set memb_id = array_remove(memb_id, '" + all_users.rows[0].id + "') where id =" + req.params.id +";");
    res.status(200).send("User removed.");
    k = 1;
    if (k != 1) {
        res.status(404).send("User not found.");
    }
});

router.delete("/:id/remove-user", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    let board = {
        removeuser: req.body.removeuser,
        memb_id: [decoded.indice]
    };
    var k = 0;
    const all_users = await client.query("select * from users where email ='" + board.removeuser + "';");
    await client.query("update boards set memb_id = array_remove(memb_id, '" + all_users.rows[0].id + "') where id =" + req.params.id +";");
    res.status(200).send("User removed.");
    k = 1;
    if (k != 1) {
        res.status(404).send("User not found.");
    }
});


router.post("/:id/add-card", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    let card = {
        name : req.body.name,
        list : req.body.namelist
    }
    var k = 0;
    var tmp = await client.query("select list from boards where id=" + req.params.id + ";");
    for (let i = 0; i < tmp.rows.length; i++) {
        for (let j = 0; j < tmp.rows[i].list.length; j++) {
            if (card.list == tmp.rows[i].list[j])
                k = 1;
        }
    }
    if (k != 0) {
        var id = await client.query("insert into cards(name, list) values ('" + card.name + "', '" + card.list + "') returning id;");
        await client.query("update boards set card_id = array_append(card_id, " + id.rows[0].id + ") where id = " + req.params.id + ";");
        res.status(200).send("Card create.");
    } else {
        res.status(403).send("You must create new list first.");
    }
});


router.delete("/:id/remove-card", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    await client.query("update boards set card_id = array_remove(card_id," + req.body.id + ") where id = " + req.params.id +";");
    await client.query("delete from cards where id = " + req.body.id + ";");
    res.status(200).send("Card removed.")
});

router.post("/:id/remove-card", async (req, res) => {
    console.log("test")
    if (!req.headers.authorization) {
        console.log("pb")
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    await client.query("update boards set card_id = array_remove(card_id," + req.body.id + ") where id = " + req.params.id +";");
    await client.query("delete from cards where id = " + req.body.id + ";");
    res.status(200).send("Card removed.")
});


router.put("/:id/move-card", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    let card = {
        newlist : req.body.newlist,
        card : req.body.id
    }
    await client.query("update cards set list ='" + card.newlist + "' where id = " + req.body.id + ";");
    res.status(200).send("Card moved.")
});


router.post("/:id/asign-user", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    
    var memb_board = await client.query("select memb_id from boards where id = " + req.params.id + ";");
    var memb_card = await client.query("select memb_id from cards where id = " + req.body.cardid + ";");
    var k = 0;
    //var l = 0;
    for (let i = 0; i < memb_board.rows[0].memb_id.length; i++) {
        if (memb_board.rows[0].memb_id[i] == req.body.userid) {
            await client.query("update cards set memb_id = array_append(memb_id, " + req.body.userid + ") where id = " + req.body.cardid + ";");
            k = 1;
        }
    }
    // Comparer si le user est deja asign à la card (2x ajout user à la card)
    // for (let i = 0; i < memb_card.rows[0].memb_id.length; i++) {
    //     console.log(memb_board.rows[0].memb_id[i]);
    //     if (memb_board.rows[0].memb_id[i] != req.body.userid) {
    //         await client.query("update cards set memb_id = array_append(memb_id, " + req.body.userid + ") where id = " + req.body.cardid + ";");
    //         l = 1
    //     }
    // }
    if (k != 1) 
        res.status(401).send("User is not asign in your board.");
    // else if (l != 1)
    //     res.status(401).send("User is already asign to this card");
    else {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jeanmarcelleaugustin@gmail.com',
                pass: 'fakePassword'
            }
        });
        var name_board = await client.query("select name from boards where id = " + req.params.id + ";");
        var name_card = await client.query("select name from cards where id = " + req.body.cardid + ";");
        var mailOptions = {
            from: 'EpiTrello@gmail.com',
            to: req.body.email,
            subject: 'EpiTrello asinged card',
            text: "You have been asigned to the " + name_board.rows[0].name + " to the " + name_card.rows[0].name,
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error)
                console.log(error);
            else
                console.log('Email sent: ' + info.response);
        });
        res.status(200).send("User asigned.");
    }
});


router.delete("/:id/unasign-user", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    await client.query("update cards set memb_id = array_remove(memb_id, " + req.body.userid + ") where id = " + req.body.cardid + ";");
    res.status(200).send("user unasign.")
});

router.post("/:id/unasign-user", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    await client.query("update cards set memb_id = array_remove(memb_id, " + req.body.userid + ") where id = " + req.body.cardid + ";");
    res.status(200).send("user unasign.")
});

router.post("/:id/description", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    var card = {
        description : req.body.description
    }
    await client.query("update cards set description = '" + req.body.description + "' where id = " + req.body.cardid + ";");
    res.status(200).send("Description add.")
});

router.put("/:id/set-label", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    var labelID = req.body.labelid;
    var labelName = req.body.labelname;
    await client.query("update boards set labels[" + labelID + "][2] = '" + labelName + "' where id = " + req.params.id + ";")
    .then((result) => {
        res.status(200).send("Label set.")    
    }).catch((err) => {
        console.log(err);
        res.status(400).send("Error occured.");
    });
})

router.put("/:id/labelize-card", async (req, res) => {
     if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    var labelID = req.body.labelid;
    var cardID = req.body.cardid;
    await client.query("update cards set labels = array_append(labels, " + labelID + ") where id = " + cardID + ";")
    .then((result) => {
        res.status(200).send("Card labelized.");
    }).catch((err) => {
        console.log(err);
        res.status(400).send("Error occured.");
    });
});


router.post("/:id/unlabelize-card", async (req, res) => {
    if (!req.headers.authorization) {
       res.status(401).send("Missing token.");
       return;
   }
   var token = req.headers.authorization;
   var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
   var labelID = req.body.labelid;
   var cardID = req.body.cardid;
   await client.query("update cards set labels = array_remove(labels, " + labelID + ") where id = " + cardID + ";")
   .then((result) => {
       res.status(200).send("Card unlabelized.");
   }).catch((err) => {
       console.log(err);
       res.status(400).send("Error occured.");
   });
});

router.delete("/:id/unlabelize-card", async (req, res) => {
     if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    var labelID = req.body.labelid;
    var cardID = req.body.cardid;
    await client.query("update cards set labels = array_remove(labels, " + labelID + ") where id = " + cardID + ";")
    .then((result) => {
        res.status(200).send("Card unlabelized.");
    }).catch((err) => {
        console.log(err);
        res.status(400).send("Error occured.");
    });
});

module.exports = router