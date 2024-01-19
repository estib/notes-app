import { 
  Form, 
  useLoaderData,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";

import { getNote, updateNote, Note } from "../notes";

function FormattedDate(date) {
  var formatted_date = new Date(date);
  return formatted_date.toLocaleString();
}

export async function loader({ params }) {
  const note = await getNote<Note>(params.noteId);
  return { note };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateNote(params.noteId, updates);
  return redirect(`/notes/${params.noteId}`);
}

export default function EditNote() {
  let { note } = useLoaderData<Note>();
  const navigate = useNavigate();

  return (
    <Form method="post" id="note-form">
      <p></p>
      <p>
        <label>
          <span>Name </span>
          <input
            placeholder="Name"
            aria-label="Name"
            type="text"
            name="name"
            defaultValue={note.name}
            required
          />
        </label>
      </p>
      <p>
        <label>
          <span> Tags </span>
          <input
            placeholder="Tags, comma-separated"
            aria-label="Tags"
            type="text"
            name="tags"
            defaultValue={note.tags}
          />
        </label>
      </p>
      <p>
        <label>
          <span>Content</span>
          <textarea
            name="content"
            defaultValue={note.content}
            rows={6}
            minLength="20"
            maxLength="300"
            required
          />
        </label>
      </p>
      <span>
        <div>
        <button type="submit">Save</button>
        <> </> 
        <button 
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >Cancel</button>
        </div>
      </span>
      <i>
        created: {FormattedDate(note.created_date)}, <br/>
        last updated: {FormattedDate(note.updated_date)}
      </i>
    </Form>
  );
}
