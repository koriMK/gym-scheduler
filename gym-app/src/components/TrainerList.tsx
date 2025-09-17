import React, { useState, useEffect } from 'react';
import { Trainer } from '../types';
import { trainerService } from '../services/api';

interface TrainerListProps {
  onEdit: (trainer: Trainer) => void;
}

const TrainerList: React.FC<TrainerListProps> = ({ onEdit }) => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await trainerService.getAll();
      setTrainers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await trainerService.delete(id);
      setTrainers(trainers.filter(trainer => trainer.id !== id));
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="trainer-list">
      <h2>Trainers</h2>
      {trainers.map(trainer => (
        <div key={trainer.id} className="trainer-card">
          <h3>{trainer.name}</h3>
          <p><strong>Specialization:</strong> {trainer.specialization}</p>
          <p><strong>Bio:</strong> {trainer.bio}</p>
          <p><strong>Phone:</strong> {trainer.phone_number}</p>
          <div className="actions">
            <button onClick={() => onEdit(trainer)}>Edit</button>
            <button onClick={() => handleDelete(trainer.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainerList;