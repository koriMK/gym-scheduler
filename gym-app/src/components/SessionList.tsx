import React, { useState, useEffect } from 'react';
import { Session, Trainer, Trainee } from '../types';
import { sessionService, trainerService, traineeService } from '../services/api';

interface SessionListProps {
  onEdit: (session: Session) => void;
}

const SessionList: React.FC<SessionListProps> = ({ onEdit }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sessionsRes, trainersRes, traineesRes] = await Promise.all([
        sessionService.getAll(),
        trainerService.getAll(),
        traineeService.getAll()
      ]);
      setSessions(sessionsRes.data);
      setTrainers(trainersRes.data);
      setTrainees(traineesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await sessionService.delete(id);
      setSessions(sessions.filter(session => session.id !== id));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const getTrainerName = (id: number) => trainers.find(t => t.id === id)?.name || 'Unknown';
  const getTraineeName = (id: number) => trainees.find(t => t.id === id)?.name || 'Unknown';

  if (loading) return <div>Loading...</div>;

  return (
    <div className="session-list">
      <h2>Sessions</h2>
      {sessions.map(session => (
        <div key={session.id} className="session-card">
          <h3>{session.activity}</h3>
          <p><strong>Day:</strong> {session.day}</p>
          <p><strong>Trainer:</strong> {getTrainerName(session.trainer_id)}</p>
          <p><strong>Trainee:</strong> {getTraineeName(session.trainee_id)}</p>
          <div className="actions">
            <button onClick={() => onEdit(session)}>Edit</button>
            <button onClick={() => handleDelete(session.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionList;