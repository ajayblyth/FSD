const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
res.send("GET for users");
});
router.get("/:id", (req, res)=>{
res.send("GET for users");
});
router.post("/", (req, res) => {
res.send("POST for users");

});

router.delete("/:id", (req, res)=>{
res.send("delete for user id");
}   );
module.exports = router;