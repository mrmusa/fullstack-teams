import express from 'express'

const router = express.Router();
const notImplemented = (req, res, next) => res.status(501).json({ 'error': 'NotImplemented' });

router.post('/slack/myteam', notImplemented);

export default router;
