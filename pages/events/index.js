import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  // const { data } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getEvents(user.uid).then((setEvents));
  }, []);
  // console.warn(user);

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
            <EventCard
              description={event.description}
              date={event.date}
              time={event.time}
              organizer={event.organizer.bio}
              id={event.id}
              uid={user.uid}
              joined={event.joined}
              onUpdate={getEvents}
              // // TODO: create the Leave button
              //   ? (
              //     <Button
              //       onClick={() => {
              //         leaveEvent();
              //       }}
              //     >
              //       Leave
              //     </Button>
              //   )
              // // TODO: create the Join button
              //   : (
              //     <Button
              //       onClick={() => {
              //         joinEvent();
              //       }}
              //     >
              //       Join
              //     </Button>
              //   )
            // }
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
