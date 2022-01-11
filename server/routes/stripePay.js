const router = require("express").Router();

router.get('/secret', async (req, res) => {
        const intent = 'ID_PATO_KEY'
            res.json({client_secret: intent.client_secret});
})

module.exports = router;