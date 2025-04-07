import { TrainingData } from '../types/TrainingData';
import TableRow from './TableRow';

interface TableProps {
  data: TrainingData[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, onDelete, onEdit }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Пройдено км</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow
            key={item.id}
            item={item}
            onDelete={() => onDelete(item.id)}
            onEdit={() => onEdit(item.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
