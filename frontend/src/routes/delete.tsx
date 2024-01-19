import { 
  // Form, 
  // useLoaderData,
  redirect,
} from "react-router-dom";

import { getNote, deleteNote, Note } from "../notes";

export async function loader({ params }) {
  const note = await getNote<Note>(params.noteId);
  return { note };
}

export async function action({ params }) {
  await deleteNote(params.noteId);
  return redirect("/");
}
