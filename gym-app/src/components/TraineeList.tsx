import React, { useState, useEffect } from 'react';
import { Trainee } from '../types';
import { traineeService } from '../services/api';

interface TraineeListProps {
  onEdit: (trainee: Trainee) => void;
}

const TraineeList: React.FC<TraineeListProps> = ({ onEdit }) => {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainees();
  }, []);

  const fetchTrainees = async () => {
    try {
      const response = await traineeService.getAll();
      setTrainees(response.data);
    } catch (error) {
      console.error('Error fetching trainees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await traineeService.delete(id);
      setTrainees(trainees.filter(trainee => trainee.id !== id));
    } catch (error) {
      console.error('Error deleting trainee:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="trainee-list">
      <h2>Trainees</h2>
      {trainees.map(trainee => (
        <div key={trainee.id} className="trainee-card">
          <h3>{trainee.name}</h3>
          <p><strong>Email:</strong> {trainee.email}</p>
          <p><strong>Age:</strong> {trainee.age}</p>
          <p><strong>Phone:</strong> {trainee.phone_number}</p>
          <div className="actions">
            <button onClick={() => onEdit(trainee)}>Edit</button>
            <button onClick={() => handleDelete(trainee.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TraineeList;