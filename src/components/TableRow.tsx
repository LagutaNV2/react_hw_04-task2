import { TrainingData } from '../types/TrainingData';

interface TableRowProps {
  item: TrainingData;
  onDelete: () => void;
  onEdit: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ item, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{item.date}</td>
      <td>{item.distance.toFixed(1)}</td>
      <td>
        <button onClick={onEdit}>✎</button>
        <button onClick={onDelete}>✘</button>
      </td>
    </tr>
  );
};

export default TableRow;
