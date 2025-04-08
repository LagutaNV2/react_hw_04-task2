import { useState } from 'react';
import Form from './components/Form';
import Table from './components/Table';
import { TrainingData } from './types/TrainingData';

const App = () => {
  const [data, setData] = useState<TrainingData[]>([]);
  const [editingData, setEditingData] = useState<TrainingData | null>(null);

  const handleAdd = (newData: TrainingData) => {
    // Проверяем наличие даты в списке тренировок
    const existingIndex = data.findIndex(
      (item) => item.date === newData.date
    );

    if (existingIndex !== -1) {
      // Обновляем существующую запись: добавляем к дистанции новую дистанцию
      const updatedData = [...data];
      updatedData[existingIndex].distance += newData.distance;
      setData(updatedData);
    } else {
      // Добавляем новую запись
      setData([...data, newData]);
    }
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number) => {
    const itemToEdit = data.find(item => item.id === id);
    if (itemToEdit) {
      setEditingData(itemToEdit);
    }
  };

  const handleSaveEdit = (updatedData: TrainingData) => {
    const newData = data.map(item =>
      item.id === updatedData.id ? updatedData : item
    );
    setData(newData);
    setEditingData(null);
  };

  // Сортировка по дате (по убыванию)
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-'));
    const dateB = new Date(b.date.split('.').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="app">
      <Form
        onSubmit={handleAdd}
        onEdit={handleSaveEdit}
        isEditMode={!!editingData}
        initialData={editingData}
      />
      <Table
        data={sortedData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default App;
