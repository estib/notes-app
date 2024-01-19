import { 
  Form, 
  useLoaderData,
  useFetcher,
} from "react-router-dom";

import ReactMarkdown from 'react-markdown'

import { 
  getNote, 
  updateNote, 
  Note as INote 
} from "../notes";

function FormattedDate(date) {
  var formatted_date = new Date(date);
  return formatted_date.toLocaleString();
}

export async function loader({ params }) {
  const note = await getNote<INote>(params.noteId);
  if (!note) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { note };
}

export default function Note() {
  const { note } = useLoaderData<INote>();

  return (
    <div id="note">
      <div>
        <h1>
          {note.name ? (
            <>
              {note.name}
            </>
          ) : (
            <i>(Unnamed)</i>
          )}
        </h1>

        <p>
          <i>
            created: {FormattedDate(note.created_date)}, last updated: {FormattedDate(note.updated_date)}
          </i>
        </p>
        <p></p>
        <span>
          {note.tags && note.tags.split(",").map((tag) => (
            <div className="tag" key={tag}>{tag.trim()}</div>
          ))}
        </span>

        {note.content && <ReactMarkdown children={note.content} />}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Are you sure you want to delete this note?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
