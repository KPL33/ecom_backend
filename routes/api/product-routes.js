const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

//Here, we establish a 'route' that can 'get' (retrieve) 'All' 'products' when we query. We also 'include' the 'category' with which the 'Product' is associated in the JSON data that is retrieved and it displays in our results. Lastly, we provide a 'catch' block that returns a 'status 500' 'res'ponse, in the event of an 'err'or.
// 'through' referencing our 'ProductTag's (aka, unique 'id's given to each individual 'Tag' in our inventory), we also 'include' the 'Tag's associated with the 'Product's in our query results. Lastly, we provide a 'catch' block that returns a 'status 500' 'res'ponse, in the event of an 'err'or.
router.get('/', (req, res) => {
  Product.findAll({
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    .then((products) => res.json(products))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  }
);

//Similar to the above, we establish a 'route' that can return a single 'Product' when we query (accessed by using the '/products' endpoint followed by '/' and the the 'id' number assigned to the item being queried). We also provide a message that will show in the event that the 'product' being queried does not exist.
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id);

    if (!productData) {
      res.status(404).json({ message: 'No product found with this ID.' });
      return;

    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Here, we provide the user with a 'route' that enables them to 'create' a new 'product' and a 'catch' block that returns a 'res'ponse, in the event of an 'err'or. The data of a "new product submission" could be received via JSON entered by the user, as in this example:
// {
//   product_name: "Basketball",
//   price: 200.00,
//   stock: 3,
//   tagIds: [1, 2, 3, 4]
// }
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      //Here, we check 'if' the 'TagIdArr'ay already exists (has a 'length'/aka 'value' greater than 0). If the condition is true, the 'map' method is called on 'req.body.tagIds', transforming each 'tagId' into an array of objects containing the 'req'uired properties for creating associations between the 'product_id's and 'tag_id's.
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          //We then 'return' a new "object" for each item in the array. The "objects" will each cosist of a 'product_id' and 'tag_id', pairing them together.
          return {
            product_id: product.id,
            tag_id,
          };
        });
        //We then 'bulkCreate' new 'ProductTag's for each pair in our 'productTagIdArr'ay detailed above. The result is a unique 'Id' given to each individual instance of a 'Product', which we're calling 'ProductTag'.
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    //After the 'productTagIds' are created, we '200' 'res'sponse if the request was successful, or '400' should any 'err'or occur.
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  }
);

//Here, we enable the user to 'update' an existing 'Product' via JSON submission, with values in the important keys for a given 'Product' ("product_name", "price", etc.). We also provide a 'catch' block that returns a 'status 404' 'err'or 'res'ponse, in the event that the user queries for a 'product' that does not yet exist in the database and a 'status 500' 'err'or, in the event that anything else goes awry.
router.put('/:id', async (req, res) => {
  
  Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
          }).then((productTags) => {
          
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
          });

        
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          
            return Promise.all([
              ProductTag.destroy({ where: { id: productTagsToRemove } }),
              ProductTag.bulkCreate(newProductTags),
            ]
          );
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    }
  );
});

//Here, we enable the user to delete (aka, 'destroy) an existing 'Product' by querying the database with that 'Product's name. We also provide a 'catch' block that returns a 'status 404' 'err'or 'res'ponse, in the event that the user queries for a 'product' that does not yet exist in the database and a 'status 500' 'err'or, in the event that anything else goes awry.
router.delete('/:id', async (req, res) => {

  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Finally, we 'export' the 'product-routes', so they can be imported into our 'routes > api > index.js' file.
module.exports = router;
