
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface Note {
  name: string;
  content: string;
  tags?: string;
  created_date?: integer;  // not in create api
  updated_date?: integer;  // not in create api
}

interface NoteResponse {
  data: {
    message: string;
    data: Note[];
    id?: string;
    changes?: Object;
  }
}

// TODO: this only makes sense when the app is hosted on a single instance without
// anything routing requests from the browser to the sqlite service. Once we add
// a proper nginx service, we'll change this. 
const backend_host = `http://${location.host.split(":")[0]}:3000`


export async function getNotes(query, tag_filter) {
  let resp = await axios.get<NoteResponse>(
    `${backend_host}/api/notes`, {
    params: {
      q: query,
    }
  });
  let notes : Note[] = resp.data.data;
  if (tag_filter) {
    return notes.filter((e) => e.tags.split(",").includes(tag_filter)) ?? [];
  }
  return notes ?? [];
}

export async function getNote(id) {
  let resp = await axios.get<NoteResponse>(
    `${backend_host}/api/note/${id}`
  );
  const note : Note = resp.data.data;
  return note ?? {};
}

export async function createNote() {
  let resp = await axios.post<NoteResponse>(
    `${backend_host}/api/note/`, {
    name: "note name",
    content: "write your note here. markdown is supported.",
  });
  return resp.data ?? {};
}

export async function updateNote(id, updates) {
  let resp = await axios.patch<NoteResponse>(
    `${backend_host}/api/note/${id}`, 
    updates
  );
  return resp.data ?? {};
}

export async function deleteNote(id) {
  let resp = await axios.delete<NoteResponse>(
    `${backend_host}/api/note/${id}`
  );
  return resp.data ?? {};
}
