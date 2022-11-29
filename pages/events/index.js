import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  // const { data } = router.query;

  useEffect(() => {
    getEvents().then((setEvents));
  }, []);

  // useEffect(() => {
  //   getEvents().then((data) => setEvents(data));
  // }, []);

  // useEffect(() => {
  //   getEvents(data).then(setEvents);
  // }, [data]);
  // console.warn(typeof events);

  return (
    <>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      <article className="events">
        <h1>Events</h1>
        {events.map((event) => (
          <section key={`event--${event.id}`} className="event">
            <EventCard description={event.description} date={event.date} time={event.time} organizer={event.organizer.bio} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
