const Cart = require('../../models/cart');
const Product = require('../../models/product');
const assert = require('assert');

let cart;
let product;

describe('Shopping cart', function() {

  describe('shopping cart model', () => {

    beforeEach(() => {
      cart = new Cart({});
      product = new Product({
        "imagePath": "https://buildahead.com/wp-content/uploads/2017/02/happy-emoji-smaller.png",
        "title": "Happy",
        "description": "Happy",
        "price":5});
      product1 = new Product({
        "imagePath": "https://buildahead.com/wp-content/uploads/2017/02/happy-emoji-smaller.png",
        "title": "Sad",
        "description": "Sad",
        "price":3});
    });

    it('adds a sticker to the cart', function() {
      cart.add(product, product.id);
      assert.equal(cart.totalPrice, 5);
    });

    it('removes a sticker from the cart', function() {
      cart.add(product, product.id);
      cart.reduceByOne(product.id);
      assert.deepEqual(cart.items, {});
      assert.equal(cart.totalPrice, 0);
    });

    it('remove all quantities of sticker from the cart', function() {
      cart.add(product, product.id);
      cart.add(product, product.id);
      cart.removeItem(product.id);
      assert.deepEqual(cart.items, {});
      assert.equal(cart.totalPrice, 0);
    });

    it('returns an empty array', function() {
      assert.deepEqual(cart.generateArray(),[]);
    });

    it('returns an array with one item', function() {
      cart.add(product, product.id)
      assert.equal(cart.generateArray().length,1);
    });

    it('returns an array with two items', function() {
      cart.add(product, product.id)
      cart.add(product1, product1.id)
      assert.equal(cart.generateArray().length,2);
    });
    it('returns an empty array after adding 2 products', function() {
      cart.add(product, product.id)
      cart.add(product1, product1.id)
      assert.equal(cart.generateArray().length,2);
      cart.removeItem(product.id);
      cart.removeItem(product1.id);
      assert.deepEqual(cart.generateArray(),[]);

    });

    it('adds 2 stickers to the cart with total of 8', function() {
      cart.add(product, product.id);
      cart.add(product1, product1.id);
      assert.equal(cart.totalPrice,8);
    });

      it('adds 2 stickers from the same type to the cart then reduce it by one', function() {
        cart.add(product, product.id);
        assert.equal(cart.generateArray().length,1);
        cart.reduceByOne(product.id);
        assert.deepEqual(cart.generateArray(),[]);
    });
    it('removes 1 sticker from the cart', function() {
      cart.add(product, product.id);
      cart.add(product, product.id);
      cart.reduceByOne(product.id);
      assert.equal(cart.totalPrice, 5);
    });
  });
});
