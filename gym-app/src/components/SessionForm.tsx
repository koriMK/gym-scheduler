import React, { useState, useEffect } from 'react';
import { Session, Trainer, Trainee } from '../types';
import { sessionService, trainerService, traineeService } from '../services/api';

interface SessionFormProps {
  session?: Session;
  onSave: () => void;
  onCancel: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ session, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    day: '',
    activity: '',
    trainer_id: 0,
    trainee_id: 0
  });
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [trainees, setTrainees] = useState<Trainee[]>([]);

  useEffect(() => {
    fetchOptions();
    if (session) {
      setFormData({
        day: session.day,
        activity: session.activity,
        trainer_id: session.trainer_id,
        trainee_id: session.trainee_id
      });
    }
  }, [session]);

  const fetchOptions = async () => {
    try {
      const [trainersRes, traineesRes] = await Promise.all([
        trainerService.getAll(),
        traineeService.getAll()
      ]);
      setTrainers(trainersRes.data);
      setTrainees(traineesRes.data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (session) {
        await sessionService.update(session.id, formData);
      } else {
        await sessionService.create(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="session-form">
      <h2>{session ? 'Edit Session' : 'Add New Session'}</h2>
      
      <input
        type="text"
        name="day"
        placeholder="Day"
        value={formData.day}
        onChange={handleChange}
        required
      />
      
      <input
        type="text"
        name="activity"
        placeholder="Activity"
        value={formData.activity}
        onChange={handleChange}
        required
      />
      
      <select
        name="trainer_id"
        value={formData.trainer_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Trainer</option>
        {trainers.map(trainer => (
          <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
        ))}
      </select>
      
      <select
        name="trainee_id"
        value={formData.trainee_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Trainee</option>
        {trainees.map(trainee => (
          <option key={trainee.id} value={trainee.id}>{trainee.name}</option>
        ))}
      </select>
      
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default SessionForm;