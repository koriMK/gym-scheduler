import React, { useState, useEffect } from 'react';
import { Trainer } from '../types';
import { trainerService } from '../services/api';

interface TrainerFormProps {
  trainer?: Trainer;
  onSave: () => void;
  onCancel: () => void;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ trainer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    specialization: '',
    phone_number: ''
  });

  useEffect(() => {
    if (trainer) {
      setFormData({
        name: trainer.name,
        bio: trainer.bio,
        specialization: trainer.specialization,
        phone_number: trainer.phone_number
      });
    }
  }, [trainer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (trainer) {
        await trainerService.update(trainer.id, formData);
      } else {
        await trainerService.create(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving trainer:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="trainer-form">
      <h2>{trainer ? 'Edit Trainer' : 'Add New Trainer'}</h2>
      
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      <input
        type="text"
        name="specialization"
        placeholder="Specialization"
        value={formData.specialization}
        onChange={handleChange}
        required
      />
      
      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio}
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
      
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default TrainerForm;