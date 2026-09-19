// import { Note } from '../models/note.js';
// import createHttpError from 'http-errors';

// export const getAllNotes = async (req, res) => {
//   const notes = await Note.find();
//   res.status(200).json(notes);
// };

// export const getNoteById = async (req, res) => {
//   const { noteId } = req.params;
//   const note = await Note.findOne({ _id: noteId });

//   if (!note) {
//     throw createHttpError(404, 'Note not found');
//   }

//   res.status(200).json(note);
// };

// export const createNote = async (req, res) => {
//   const note = await Note.create(req.body);
//   res.status(201).json(note);
// };

// export const deleteNote = async (req, res) => {
//   const { noteId } = req.params;
//   const note = await Note.findOneAndDelete({ _id: noteId });

//   if (!note) {
//     throw createHttpError(404, 'Note not found');
//   }

//   res.status(200).json(note);
// };

// export const updateNote = async (req, res) => {
//   const { noteId } = req.params;
//   const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
//     returnDocument: 'after',
//   });
//   if (!note) {
//     throw createHttpError(404, 'Note not found');
//   }
//   res.status(200).json(note);
// };

import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const parsedPage = parseInt(page);
    const parsedPerPage = parseInt(perPage);
    const skip = (parsedPage - 1) * parsedPerPage;

    const filter = {};

    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search,$options: 'i' } },
        { content: { $regex: search,$options: 'i' } },
      ];
    }

    const [notes, totalNotes] = await Promise.all([
      Note.find(filter).skip(skip).limit(parsedPerPage),
      Note.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalNotes / parsedPerPage);

    res.status(200).json({
      page: parsedPage,
      perPage: parsedPerPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found note with id ${noteId}!`,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a note!',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findOneAndDelete({ _id: noteId });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const result = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
      new: true,
      includeResultMetadata: true,
    });

    if (!result || !result.value) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a note!',
      data: result.value,
    });
  } catch (error) {
    next(error);
  }
};