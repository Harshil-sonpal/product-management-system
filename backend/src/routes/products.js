const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload');

router.post('/', upload.single('image'), productController.createProduct);
router.get('/:productId',productController.getByProductId)
router.put('/:productId', upload.single('image'), productController.editProduct);
router.get('/', productController.listProducts);

module.exports = router;
