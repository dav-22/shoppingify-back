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

router.put('/complete/:listId', async (req, res) => {
    try {
        
        const list = await List.update({status: 'completed'}, {
            where: { id: req.params.listId }
        });

        req.body.list.shoppingLists.forEach(s => {
            
            Shopping.update({checked: s.checked}, {
                where: {id: s.id}
            });
        });
    
        res.json(true);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/cancel/:listId', async (req, res) => {
    try {
        
        const list = await List.update({status: 'cancelled'}, {
            where: { id: req.params.listId }
        });
    
        res.json(true);
    } catch (error) {
        res.status(400).send(error);
    }
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

router.put('/shoppingList/:listId', async (req, res) => {

    try {
        const list = await List.update({name: req.body.listName}, {
            where: { id: req.params.listId }
        })
       
       req.body.itemList.forEach(async il => {
            if(il.listId == 0) {
               if(il.count > 0) {
                   await Shopping.create({count: il.count, itemId: il.item.id, listId: req.params.listId});
               }
            } else {
                if(il.count > 0) {
                    await Shopping.update({count: il.count}, {
                        where: { listId: il.listId, itemId: il.item.id }
                    });
                } else if(il.count == 0) {
                    await Shopping.destroy({
                        where: { listId: il.listId, itemId: il.item.id }
                    });
                
                }
            }
        });
     
        res.json(true);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;