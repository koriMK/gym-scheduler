import React, { useState } from 'react';
import TrainerList from './components/TrainerList';
import TrainerForm from './components/TrainerForm';
import TraineeList from './components/TraineeList';
import TraineeForm from './components/TraineeForm';
import SessionList from './components/SessionList';
import SessionForm from './components/SessionForm';
import { Trainer, Trainee, Session } from './types';
import './App.css';

type ActiveTab = 'trainers' | 'trainees' | 'sessions';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('trainers');
  const [showForm, setShowForm] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<Trainer | undefined>();
  const [editingTrainee, setEditingTrainee] = useState<Trainee | undefined>();
  const [editingSession, setEditingSession] = useState<Session | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setEditingTrainer(undefined);
    setEditingTrainee(undefined);
    setEditingSession(undefined);
    setShowForm(true);
  };

  const handleEditTrainer = (trainer: Trainer) => {
    setEditingTrainer(trainer);
    setShowForm(true);
  };

  const handleEditTrainee = (trainee: Trainee) => {
    setEditingTrainee(trainee);
    setShowForm(true);
  };

  const handleEditSession = (session: Session) => {
    setEditingSession(session);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingTrainer(undefined);
    setEditingTrainee(undefined);
    setEditingSession(undefined);
    setRefreshKey(prev => prev + 1);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTrainer(undefined);
    setEditingTrainee(undefined);
    setEditingSession(undefined);
  };

  const renderForm = () => {
    if (activeTab === 'trainers') {
      return (
        <TrainerForm
          trainer={editingTrainer}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      );
    } else if (activeTab === 'trainees') {
      return (
        <TraineeForm
          trainee={editingTrainee}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      );
    } else {
      return (
        <SessionForm
          session={editingSession}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      );
    }
  };

  const renderList = () => {
    if (activeTab === 'trainers') {
      return <TrainerList key={refreshKey} onEdit={handleEditTrainer} />;
    } else if (activeTab === 'trainees') {
      return <TraineeList key={refreshKey} onEdit={handleEditTrainee} />;
    } else {
      return <SessionList key={refreshKey} onEdit={handleEditSession} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gym Management System</h1>
        
        <nav className="nav-tabs">
          <button 
            className={activeTab === 'trainers' ? 'active' : ''}
            onClick={() => setActiveTab('trainers')}
          >
            Trainers
          </button>
          <button 
            className={activeTab === 'trainees' ? 'active' : ''}
            onClick={() => setActiveTab('trainees')}
          >
            Trainees
          </button>
          <button 
            className={activeTab === 'sessions' ? 'active' : ''}
            onClick={() => setActiveTab('sessions')}
          >
            Sessions
          </button>
        </nav>

        {!showForm && (
          <button onClick={handleAdd} className="add-btn">
            Add New {activeTab.slice(0, -1)}
          </button>
        )}
      </header>

      <main>
        {showForm ? renderForm() : renderList()}
      </main>
    </div>
  );
}

export default App;