const router = require('express').Router();

const { Category, Item } = require('../../db-config');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll({include: {model: Item, as: 'items', include: 'category'}});

        res.json(categories);
        
    } catch (error) {
        res.status(400).send({error: error});
    }
        
});

router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body);
    
        res.json(category);
    } catch (error) {

        if(error.original.code.includes('ER_DUP_ENTRY')) {

            res.status(400).send({error: 'Duplicate entry'});
        }else {
            res.status(400).send({error: 'Something was wrong'}); 
        }
    }
        
});

router.put('/:categoryId', async (req, res) => {
    const category = await Category.update(req.body, {
        where: { id: req.params.categoryId }
    });
 
    res.json({success: true , category: category});
});

router.delete('/:categoryId', async (req, res) => {
    const category = await Category.destroy({
        where: { id: req.params.categoryId }
    });
 
    res.json({success: true});
});


module.exports = router;