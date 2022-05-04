const router = require('express').Router();

const { Item, Category } = require('../../db-config');

router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll({include: 'category', where: { userId: req.userId }});

        res.json(items);
        
    } catch (error) {
        res.status(400).send({error: error});
    }
        
});

router.post('/', async (req, res) => {
    try {
        const item = await Item.create(req.body);
    
        res.json(item);
    } catch (error) {

        res.status(400).send({error: error}); 
        
    }
        
});

router.put('/:itemId', async (req, res) => {
    const item = await Item.update(req.body, {
        where: { id: req.params.itemId }
    });
 
    res.json({success: true , Item: item});
});

router.delete('/:itemId', async (req, res) => {
    try {
        const item = await Item.destroy({
            where: { id: req.params.itemId }
        });
    
        res.json(true);
    } catch (error) {
        res.status(400).send(error); 

    }
});


module.exports = router;