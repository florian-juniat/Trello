const router = require("express").Router()
const jwt = require("jsonwebtoken")
const {client} = require('../database/db')

router.get("/", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token.");
        return;
    }
    var token = req.headers.authorization;  
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    const response = await client.query("select * from boards where '" + decoded.indice + "' = ANY(memb_id);");
    res.status(200).send(response.rows);
});

router.post("/add-board", async(req, res) => {
    console.log("test")
    if (!req.headers.authorization || !req.body.name) {
        console.log("there is a probleem")
        res.status(401).send("Missing token or board's name.");
        return;
    }
    var token = req.headers.authorization;
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    let board = {
        name: req.body.name,
        memb_id: [decoded.indice],
        picture: req.body.picture
    };
    var labels = '{{1, ""}, {2, ""}, {3, ""}, {4, ""}, {5, ""}, {6, ""}}';
    client.query("insert into boards(name, memb_id, picture, labels) values ('" + board.name +"', ARRAY [ " + board.memb_id + " ] , " + board.picture + ", '" + labels + "' );");
    res.status(200).send("Board created.");
});


module.exports = router