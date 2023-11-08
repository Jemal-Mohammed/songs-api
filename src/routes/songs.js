import express from 'express';
const router = express.Router();
import {
  createSong,
  deleteSong,
  getSingleSong,
  listSongs,
  updateSong,
  getStatistics
} from '../controllers/songsController.js';

// Songs CRUD operations
router.route('/songs').post(createSong);
router.route('/songs/:id').get(getSingleSong);
router.route('/songs').get(listSongs);
router.route('/songs/:id').delete(deleteSong);
router.route('/songs/:id').put(updateSong);
// song statics operation
router.route('/statistics').get(getStatistics);

export default router;
