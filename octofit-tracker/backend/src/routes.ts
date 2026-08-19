import { Router, Request, Response } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const router = Router();

type Model = typeof User;

function createCollectionHandlers(model: Model) {
  return {
    list: async (_request: Request, response: Response) => {
      try {
        response.json(await model.find().lean());
      } catch (error) {
        response.status(503).json({ error: 'Database unavailable' });
      }
    },
    create: async (request: Request, response: Response) => {
      try {
        const document = await model.create(request.body);
        response.status(201).json(document);
      } catch (error) {
        response.status(400).json({ error: 'Invalid request', details: error instanceof Error ? error.message : error });
      }
    },
  };
}

const users = createCollectionHandlers(User);
const teams = createCollectionHandlers(Team);
const activities = createCollectionHandlers(Activity);
const workouts = createCollectionHandlers(Workout);

router.get('/users/', users.list);
router.post('/users/', users.create);
router.get('/teams/', teams.list);
router.post('/teams/', teams.create);
router.get('/activities/', activities.list);
router.post('/activities/', activities.create);
router.get('/leaderboard/', async (_request, response) => {
  try {
    response.json(await Leaderboard.find().sort({ points: -1 }).populate('userId', 'username name').lean());
  } catch (error) {
    response.status(503).json({ error: 'Database unavailable' });
  }
});
router.post('/leaderboard/', async (request, response) => {
  try {
    response.status(201).json(await Leaderboard.create(request.body));
  } catch (error) {
    response.status(400).json({ error: 'Invalid request', details: error instanceof Error ? error.message : error });
  }
});
router.get('/workouts/', workouts.list);
router.post('/workouts/', workouts.create);

export default router;
