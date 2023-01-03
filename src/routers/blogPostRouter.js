const router = require("express").Router({
    mergeParams: true,
});
const controller = require("../controllers/postController");

router.get("/", controller.getPost);
router.post("/", controller.createPost);
router.get("/:id", controller.getPost);
router.patch("/:id", controller.updatePost);

module.exports = router;
