const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const magicMover = require('./../models/magicMoverModel');
const magicItem = require('./../models/magicItemModel');

exports.CreatemagicMover = catchAsync(async(req, res, next) => {
    const magicmover = await magicMover.create(req.body);
    res.status(201).json({
        status: 'Success',
        data: {
            magicmover
        }
    });

});


exports.LoadMoverWithItems = catchAsync(async(req, res, next) => {
    const MoverID = req.params.id;
    const ItemsIds = req.body.items;
    try {
        const mover = await magicMover.findById(MoverID);
        if (mover.questState == 'on-mission') {
            return next(new appError('SORRY! the mover is on mission now 🦾', 400));
        }
        await magicMover.findByIdAndUpdate(MoverID, { questState: 'loading' }, { new: true });
        const items = await magicItem.find({ _id: { $in: ItemsIds } });
        const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);

        if (!mover.canCarry(totalWeight)) {
            return next(new appError('Mover cannot carry all items', 400));
        }

        mover.currentWeight += totalWeight;
        await mover.save();

        res.status(201).json({
            status: 'success',
            message: 'Mission started successfully'
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.StartMission = catchAsync(async(req, res, next) => {
    const moverId = req.params.id;

    try {
        const mover = await magicMover.findById(moverId);
        if (mover.questState !== 'loading') {
            return next(new appError('Mover must be in loading state to start mission', 400));
        }

        mover.questState = 'on-mission';
        mover.completedMissions++;
        await mover.save();

        res.status(200).json({ message: 'Mission started successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.StopMission = catchAsync(async(req, res, next) => {

    const moverId = req.params.id;

    try {
        const mover = await magicMover.findById(moverId);
        if (mover.questState !== 'on-mission') {
            return next(new appError('Mover must be in on-mission state to Stop the mission', 400));
        }
        mover.currentWeight = 0;
        mover.questState = 'resting';
        await mover.save();

        res.status(200).json({ message: 'Mission ended successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error ending mission' });
    }
});
exports.getBestMovers = catchAsync(async(req, res, next) => {

    const bestMovers = await magicMover.find().sort({ completedMissions: -1 });
    res.status(200).json({
        status: 'success',
        data: bestMovers
    });
});