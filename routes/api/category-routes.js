const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

//Here, we establish a 'route' that can return 'All' 'categories' when we query. We also 'include' the 'Product' names in the JSON data that is retrieved and it displays in our results. Lastly, we provide a 'catch' block with that returns a 'status 500' 'res'ponse, in the event of an 'err'or.
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

//Similar to the above, we establish a 'route' that can return a single 'Category' 'categories' when we query. We also 'include' the 'Product' names in the JSON data that is retrieved and it displays in our results. Lastly, we provide a 'catch' block with that returns a 'status 500' 'res'ponse, in the event of an 'err'or.
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
  
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }

    // Update the category using the found instance
    await categoryData.update(req.body);

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put('/:id', async (req, res) => {
  // update a category by its `id` value
//   try {
//     const updatedCategory = await Category.update{
//       category_name: req.body.cat
//     }
//   }
// });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
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

module.exports = router;
