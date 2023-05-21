const express = require('express')
const router = express.Router()
const shoesController = require('../controllers/shoesController')

router.route('/')
    .get(shoesController.getAllShoes)
    .post(shoesController.createNewShoe)
    .patch(shoesController.updateShoe)
    .delete(shoesController.deleteShoe)

router.route("/:id/comments").post(shoesController.commentShoe)
router.route("/comments").delete(shoesController.deleteComment)
router.route('/countWithPrice').get(shoesController.countShoesWithPriceOver100)
router.route('/countWithCollaboration').get(shoesController.countShoesWithCollaboration)
router.route('/countWithoutCollaboration').get(shoesController.countShoesWithoutCollaboration)
router.route('/count').get(shoesController.countShoes)
router.route('/countAveragePrice').get(shoesController.averagePrice)
router.route('/highestPrice').get(shoesController.ShoeWithHighestPrice)
router.route('/lowestPrice').get(shoesController.ShoeWithLowestPrice)
router.route('/MostComments').get(shoesController.ShoeWithMostComments)
router.route('/totalComments').get(shoesController.countComments)

module.exports = router