import Song from "../models/Song.js";
import catchValidationErrors from '../utils/validationErrors.js';
import ErrorHandller from "../utils/errorHandller.js";
import APIFeatures from '../utils/apifeatures.js'
const createSong = catchValidationErrors(async (req, res, next) => {
    try {
        const { title, artist, album, genre } = req.body;

        // Validate that required fields are present
        // console.log('title');
        if (!title || !artist || !album || !genre) {
            throw new ErrorHandller('Please fill all required fields', 500);
        }

        const song = await Song.create({ title, artist, album, genre });

        res.status(201).json({ message: 'Song created successfully', data: song });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});

const listSongs = catchValidationErrors(async (req, res, next) => {
    const resPerPage = 8;
    const count = await Song.countDocuments();
    const apiFeatures = new APIFeatures(Song.find({genere:req.params.keyword}), req.query).
    search()
    .filter()
    .pagination(resPerPage)
    const songs = await apiFeatures.query;
    
    try {
        res.status(200).json(songs);
    } catch (error) {
        // Handle any errors that occur during the database query or response
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});

const deleteSong = catchValidationErrors(async (req, res, next) => {
    try {
        const  songId  = req.params.id;
// console.log(songId);
        // Ensure a valid song ID is provided for deletion
        if (!songId) {
            throw new ErrorHandller('Invalid song ID', 400);
        }

        const deletedSong = await Song.findOneAndDelete({ _id: songId });

        if (!deletedSong) {
            throw new ErrorHandller('Song not found', 404);
        }

        res.status(200).json({ message: 'Song deleted successfully', data: deletedSong });
    } catch (error) {
        next(error);
    }
});


const updateSong = catchValidationErrors(async (req, res, next) => {
    try {
        const  songId  = req.params.id;
        // console.log(songId);
        const { title, artist, album, genre } = req.body;

        // Validate that required fields are present
        if (!title || !artist || !album || !genre) {
            throw new ErrorHandller('Please fill all required fields', 400);
        }

        // Ensure a valid song ID is provided for updating
        if (!songId) {
            throw new ErrorHandller('Invalid song ID', 400);
        }

        const updatedSong = await Song.findByIdAndUpdate(songId, { title, artist, album, genre }, { new: true });

        if (!updatedSong) {
            throw new ErrorHandller('Song not found', 404);
        }

        res.status(200).json({ message: 'Song updated successfully', data: updatedSong });
    } catch (error) {
        next(error);
    }
});

const getSingleSong = catchValidationErrors(async (req, res, next) => {
    try {
        const songId = req.params.id;
        // console.log(songId);
        // Ensure a valid song ID is provided for fetching a single song
        if (!songId) {
            throw new ErrorHandller('Invalid song ID', 400);
        }

        const song = await Song.findById(songId);

        if (!song) {
            throw new ErrorHandller('Song not found', 404);
        }

        res.status(200).json(song);
    } catch (error) {
        next(error);
    }
});
const getStatistics = catchValidationErrors(async (req, res, next) => {
    try {
        const totalSongs = await Song.countDocuments();
        const totalArtists = await Song.distinct('artist').length;
        const totalAlbums = await Song.distinct('album').length;
        const totalGenres = await Song.distinct('genre').length;
    
        const songsByGenre = await Song.aggregate([
          { $group: { _id: '$genre', count: { $sum: 1 } } },
        ]);
    
        const songsByArtist = await Song.aggregate([
          { $group: { _id: '$artist', songs: { $push: '$title' }, count: { $sum: 1 } } },
        ]);
    
        const songsByAlbum = await Song.aggregate([
          { $group: { _id: '$album', songs: { $push: '$title' }, count: { $sum: 1 } } },
        ]);
    
        res.status(200).json({
          totalSongs,
          totalArtists,
          totalAlbums,
          totalGenres,
          songsByGenre,
          songsByArtist,
          songsByAlbum,
        });
      } catch (error) {
        next(new ErrorHandller(500, 'Error fetching statistics', error));
      }
});
export {
    createSong,
    listSongs,
    deleteSong,
    updateSong,
    getSingleSong,
    getStatistics
};
