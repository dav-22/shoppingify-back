const router = require('express').Router();

const { List, Shopping } = require('../../db-config');

router.get('/', async (req, res) => {
    try {
        const lists = await List.findAll(
            {
                include: {model: Shopping, as: 'shoppingLists', include: 'item'},
                where: { userId: req.userId }
            }
        );

        res.json(lists);
        
    } catch (error) {
        res.status(400).send({error: error});
    }
        
});

router.post('/', async (req, res) => {
    try {
        const list = await List.create(req.body);
    
        res.json(list);
    } catch (error) {

        res.status(400).send({error: error}); 
        
    }
        
});

router.put('/:listId', async (req, res) => {
    const list = await List.update(req.body, {
        where: { id: req.params.listId }
    });
 
    res.json({success: true , List: list});
});

router.delete('/:listId', async (req, res) => {
    try {
        const list = await List.destroy({
            where: { id: req.params.listId }
        });
    
        res.json(true);
    } catch (error) {
        res.status(400).send(error); 

    }
});


module.exports = router;