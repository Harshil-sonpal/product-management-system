const Product = require('../models/Product');
const { Op } = require('sequelize');

exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const url = req.protocol + '://' + req.get('host')
    const image = url + '/public/' + req.file.filename;
    const creationDate = new Date();
  
    const product = await Product.create({
      name,
      image,
      price,
      creationDate
    });
  
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
        return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price } = req.body;
    const url = req.protocol + '://' + req.get('host')
    const image = url + '/public/' + req.file.filename;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.image = image;
    product.price = price;
    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.listProducts = async (req, res) => {
    const page = req.query.page || 1;
    const limit = 10;
    const searchTerm = req.query.term;
    const startDate = req.query.start;
    const endDate = req.query.end;
    const sortOrder = req.query.sortOrder || 'asc';

    const offset = (page - 1) * limit;

    const filter = {};
    if (searchTerm) {
      filter.name = { [Op.like]: `%${searchTerm}%` };
    }
    if (startDate && endDate) {
      filter.createdAt = { [Op.between]: [startDate, endDate] };
    }

    try {
      // Fetch the products with pagination, filtering, and sorting
      const products = await Product.findAll({
        where: filter,
        order: [['createdAt', sortOrder]],
        limit,
        offset,
      });

      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
