import Note from "../models/Note.js"


export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes Controller", error);
    res.status(500).json({message: "Internal Server error"});
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) res.status(404).json({ message: "No note found!" });
    res.json(note)
  } catch (error) {
    console.error("Error in getNoteByID Controller", error);
    res.status(500).json({message: "Internal Server error"});
  }
}

export async function createNote(req, res) {
  try {
    console.log("Incoming body:", req.body);
    const { title, content } = req.body;
    const note = new Note({ title, content});
    const savedNote = await note.save(); 

    res.status(201).json({savedNote});
  } catch (error) {
    console.error("Error in createNote Controller", error);
    res.status(500).json({message: "Internal Server error"});
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );

    if(!updatedNote) return res.status(400).json({message: "Note not found"});

    res.status(200).json(updatedNote);

  } catch (error) {
    console.error("Error in updateNote Controller", error);
    res.status(500).json({message: "Internal Server error"});
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if(!deletedNote) return res.status(400).json({message: "Note not found"});
    
    res.status(200).json(deletedNote);  
    
  } catch (error) {
    console.error("Error in updateNote Controller", error);
    res.status(500).json({message: "Internal Server error"});    
  }
}