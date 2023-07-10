const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//Here, we establish a 'route' that can 'get' (retrieve) 'All' 'Tag's when we query. 'through' referencing our 'ProductTag's (aka, unique 'id's given to each individual 'Product' in our inventory), we also 'include' the associated 'Product's to which the 'Tag's apply in our query results. Lastly, we provide a 'catch' block that returns a 'status 500' 'res'ponse, in the event of an 'err'or.
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: {
        model: Product,
        through: ProductTag,
    },
  });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Similar to the above, we establish a 'route' that can return a single 'Tag' when we query (accessed by using the '/tags' endpoint followed by '/' and the the 'id' number assigned to the 'Tag' being queried). We also provide a message that will show in the event that the 'Tag' being queried does not exist.
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products'}]
    });

    if(!tagData) {
      res.status(404).json({ message: 'No Tag found with this id.'});
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Here, we provide the user with a 'route' that enables them to 'create' a new 'Tag' and a 'catch' block with that returns a 'res'ponse, in the event of an 'err'or. The data of a "new tag submission" could be received via JSON entered by the user, as in this example:
// {
//   "id": 9,
//   "tag_name": "camping equipment",
// }
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Here, we enable the user to update an existing 'Tag' and provide a 'catch' block with that 'return's a 'res'ponse, in the event of an 'err'or.
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id);

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }
    await tagData.update(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Here, we enable the user to delete (aka, 'destroy) an existing 'Tag' by querying the database with that 'Tag's 'id'. We also provide a 'catch' block that returns a 'status 404' 'err'or 'res'ponse, in the event that the user queries for a 'Tag' that does not yet exist in the database and a 'status 500' 'err'or, in the event that anything else goes awry.
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Finally, we 'export' the 'tag-routes', so they can be imported into our 'routes > api > index.js' file.
module.exports = router;
