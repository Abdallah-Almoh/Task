const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const magicItem = require('./../models/magicItemModel');

exports.createMagicItem = catchAsync(async(req, res, next) => {

    const magicitem = await magicItem.create(req.body);
    res.status(201).json({
        status: 'Success',
        data: {
            magicitem
        }
    });
});