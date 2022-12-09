/* eslint-disable camelcase */
import { clientCredentials } from '../client';

const getEvents = (uid = '') => new Promise((resolve, reject) => {
  // console.warn(user_id);
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const updateEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${event.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getEventById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, { method: 'DELETE' })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const joinEvent = (eventId, uid) => new Promise((resolve, reject) => {
  // TODO: Write the POST fetch request to join and event
  // console.warn(uid);
  fetch(`${clientCredentials.databaseURL}/events/${eventId}/signup`, {
    method: 'POST',
    body: JSON.stringify(uid),
    headers: {
      // Authorization: uid, // This is how to pass the uid
      'Content-Type': 'application/json',
      // Accept: 'application/json',
    },
    // uid,
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const leaveEvent = (eventId, uid) => new Promise((resolve, reject) => {
  // TODO: Write the DELETE fetch request to leave an event
  fetch(`${clientCredentials.databaseURL}/events/${eventId}/leave`,
    {
      method: 'DELETE',
      body: JSON.stringify(uid),
      headers: {
        // Authorization: uid, // This is how to pass the uid
        'Content-Type': 'application/json',
      },

    })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

// eslint-disable-next-line import/prefer-default-export
export {
  getEvents, updateEvent, createEvent, getEventById, deleteEvent, leaveEvent, joinEvent,
};
