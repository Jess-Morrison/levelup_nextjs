import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getEventById } from '../../../utils/data/eventData';
import EventForm from '../../../components/event/EventForm';

export default function EditGame() {
  const [editEvent, setEditEvent] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getEventById(id).then(setEditEvent);
  }, [id]);

  return (
    <div className="edit-form" style={{ height: '45rem', padding: '10%' }}>
      <EventForm obj={editEvent} />
    </div>
  );
}
