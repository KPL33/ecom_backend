const router = require('express').Router();
const { Category, Product } = require('../../models');

//Here, we establish a 'route' that can 'get' (retrieve) 'All' 'categories' when we query. We also 'include' the associated 'product_name's in the JSON data that is retrieved and it displays in our results. Lastly, we provide a 'catch' block that returns a 'status 500' 'res'ponse, in the event of an 'err'or.
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: Product
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Similar to the above, we establish a 'route' that can return a single 'Category' when we query (accessed by using the '/categories' endpoint followed by '/' and the the 'id' number assigned to the 'Category' being queried). We also provide a message that will show, in the event that the 'category' being queried does not exist.
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products'}]
    });

    if(!categoryData) {
      res.status(404).json({ message: 'No category found with this id.'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Here, we provide the user with a 'route' that enables them to 'create' a new 'Category' and a 'catch' block that returns a 'res'ponse, in the event of an 'err'or.
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Here, we enable the user to update an existing 'category' and provide a 'catch' block that 'return's a 'res'ponse, in the event of an 'err'or.
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }
    await categoryData.update(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Here, we enable the user to delete (aka, 'destroy') an existing 'Category' by querying the database with that 'Category's 'id'. We also provide a 'catch' block that returns a 'status 404' 'err'or 'res'ponse, in the event that the user queries for a 'Category' that does not yet exist in the database and a 'status 500' 'err'or, in the event that anything else goes awry.
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Finally, we 'export' the 'category-routes', so they can be imported into our 'routes > api > index.js' file.
module.exports = router;
