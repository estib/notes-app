import { 
  Outlet, 
  NavLink, 
  useLoaderData,
  useNavigation,
  useSubmit,
  Form,
  redirect,
} from "react-router-dom";

import { useEffect } from "react";
import { getNotes, createNote, Note} from "../notes";


function FormattedDate(date) {
  var formatted_date = new Date(date);
  return formatted_date.toLocaleString();
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const tags = url.searchParams.get("tags");
  const notes = await getNotes<Note[]>(q, tags);
  return { notes, q, tags};
}

export async function action() {
  const note = await createNote<Note>();
  return redirect(`/notes/${note.id}/edit`);
}

export default function Root() {
  const { notes, q, tags } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = 
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  useEffect(() => {
    document.getElementById("q").value = q;
    document.getElementById("tags").value = tags;
  }, [q, tags]);

  return (
    <>
      <div id="sidebar">
        <h1>Notes App</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search notes"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <input
              id="tags"
              area-label="Search notes"
              placeholder="Filter by Tag"
              type="tag_filter"
              name="tags"
              onChange={(event) => {
                const isFirstSearch = tags == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                })
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">Add</button>
          </Form>
        </div>
        <nav>
          {notes.length ? (
            <ul>
              {notes.map((note) => (
                <li key={note.id}>
                  <NavLink
                    to={`notes/${note.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {note.name || note.updated_date ? (
                      <>
                        <div>{note.name}</div> <div><i>{FormattedDate(note.updated_date)}</i></div>
                      </>
                    ) : (
                      <i>(unnamed note)</i>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>Click "Add" to start writing notes.</i>
            </p>
          )}
        </nav>
      </div>
      <div 
        id="detail"
        className={
          navigation.state === "loading" ? "laoding" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}
