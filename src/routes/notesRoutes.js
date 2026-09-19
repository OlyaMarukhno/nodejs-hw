// import { Router } from 'express';
// import {
//   createNote,
//   deleteNote,
//   getAllNotes,
//   getNoteById,
//   updateNote,
// } from '../controllers/notesController.js';

// const router = Router();

// router.get('/notes', getAllNotes);
// router.get('/notes/:noteId', getNoteById);
// router.post('/notes', createNote);
// router.delete('/notes/:noteId', deleteNote);
// router.patch('/notes/:noteId', updateNote);

// export default router;

import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.get('/notes', getAllNotesSchema, getAllNotes);
router.get('/notes/:noteId', noteIdSchema, getNoteById);
router.post('/notes', createNoteSchema, createNote);
router.delete('/notes/:noteId', noteIdSchema, deleteNote);
router.patch('/notes/:noteId', updateNoteSchema, updateNote);

export default router;