import { useState, useEffect } from 'react';
import { TrainingData } from '../types/TrainingData';

interface FormProps {
  onSubmit: (data: TrainingData) => void;
  onEdit?: (data: TrainingData) => void; // Для редактирования
  isEditMode?: boolean;
  initialData?: TrainingData | null;
}

const Form: React.FC<FormProps> = ({ onSubmit, onEdit, isEditMode, initialData }) => {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (initialData) {
      // setDate(initialData.date);

      // Конвертируем дату из формата ДД.ММ.ГГГГ в ГГГГ-ММ-ДД для <input type="date">
      const [day, month, year] = initialData.date.split('.');
      const isoDate = `${year}-${month}-${day}`;
      setDate(isoDate);

      setDistance(initialData.distance);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация даты
    // const formattedDate = formatAndValidateDate(date);
    // if (!formattedDate) {
    //   alert('Некорректный формат даты!');
    //   return;
    // }

    if (!date) {
      alert('Пожалуйста, выберите дату.');
      return;
    }

    // Конвертируем из ГГГГ-ММ-ДД в ДД.ММ.ГГГГ
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}.${month}.${year}`;

    const newData: TrainingData = {
      id: initialData?.id || Date.now(),
      date: formattedDate,
      distance: Number(distance),
    };

    if (isEditMode) {
      onEdit?.(newData);
    } else {
      onSubmit(newData);
    }

    setDate('');
    setDistance(0);
  };

  // Преобразование даты и валидация
  // const formatAndValidateDate = (input: string): string | null => {
  //   // Разделители могут быть любые (/, ., \, ,)
  //   const parts = input.split(/[^0-9]/).filter(part => part !== '');
  //   if (parts.length !== 3) return null;

  //   const day = parseInt(parts[0]);
  //   const month = parseInt(parts[1]);
  //   const year = parseInt(parts[2]);

  //   // Проверка корректности даты
  //   if (
  //     isNaN(day) ||
  //     isNaN(month) ||
  //     isNaN(year) ||
  //     day < 1 ||
  //     day > 31 ||
  //     month < 1 ||
  //     month > 12 ||
  //     year < 2000 ||
  //     year > 2050
  //   ) {
  //     return null;
  //   }

  //   // Создаем объект Date и проверяем корректность
  //   const date = new Date(year, month - 1, day);
  //   const isValid =
  //     date.getFullYear() === year &&
  //     date.getMonth() === month - 1 &&
  //     date.getDate() === day;

  //   if (!isValid) return null;

  //   return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
  // };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        // type="text"
        // placeholder="Дата (ДД.ММ.ГГГГ)"
        type="date"
        value={date}
        onChange={(e) => !isEditMode && setDate(e.target.value)}
        readOnly={isEditMode}
        max={getTodayDate()}
      />
      <input
        type="number"
        step="0.1"
        placeholder="Пройдено км"
        value={distance}
        onChange={(e) => setDistance(Number(e.target.value))}
      />
      <button type="submit">{isEditMode ? 'Сохранить' : 'OK'}</button>
    </form>
  );
};

export default Form;
