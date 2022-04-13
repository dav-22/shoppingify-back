const router = require('express').Router();

const { Shopping, Item, List } = require('../../db-config');

router.get('/', async (req, res) => {
    try {
        const shopping = await Shopping.findAll({include: {model: Item, as: 'items', include: 'shopping'}});

        res.json(shopping);
        
    } catch (error) {
        res.status(400).send({error: error});
    }
        
});

router.post('/', async (req, res) => {
    try {
        const list = await List.create({ name: req.body.listName, userId: req.userId});
        let shoppingList = []; 

        req.body.itemList.forEach(async il => {
            
            const shopping = await Shopping.create({ itemId: il.item.id, count: il.count, listId: list.id });
            shoppingList.push(shopping);
        });
    
        res.json({list: list, shopping: 'success'});

    } catch (error) {

        if(error.original.code.includes('ER_DUP_ENTRY')) {

            res.status(400).send({error: 'Duplicate entry'});
        }else {
            res.status(400).send({error: 'Something was wrong'}); 
        }
    }
        
});

router.put('/:shoppingId', async (req, res) => {
    const shopping = await Shopping.update(req.body, {
        where: { id: req.params.shoppingId }
    });
 
    res.json({success: true , shopping: shopping});
});

router.delete('/:shoppingId', async (req, res) => {
    const shopping = await Shopping.destroy({
        where: { id: req.params.shoppingId }
    });
 
    res.json({success: true});
});


module.exports = router;