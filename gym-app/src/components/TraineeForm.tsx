import React, { useState, useEffect } from 'react';
import { Trainee } from '../types';
import { traineeService } from '../services/api';

interface TraineeFormProps {
  trainee?: Trainee;
  onSave: () => void;
  onCancel: () => void;
}

const TraineeForm: React.FC<TraineeFormProps> = ({ trainee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    age: 0
  });

  useEffect(() => {
    if (trainee) {
      setFormData({
        name: trainee.name,
        email: trainee.email,
        phone_number: trainee.phone_number,
        age: trainee.age
      });
    }
  }, [trainee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (trainee) {
        await traineeService.update(trainee.id, formData);
      } else {
        await traineeService.create(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving trainee:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="trainee-form">
      <h2>{trainee ? 'Edit Trainee' : 'Add New Trainee'}</h2>
      
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <input
        type="tel"
        name="phone_number"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
      />
      
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default TraineeForm;