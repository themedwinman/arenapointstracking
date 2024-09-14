import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Student {
  studentId: string;
  name: string;
  surname: string;
  house: string;
}

interface Props {
  student: Student;
  onDelete: (id: string) => void;
}

const StudentItem: React.FC<Props> = ({ student, onDelete }) => {
  const handleDelete = () => {
    onDelete(student.studentId);
  };

  return (
    <ListItem>
      <ListItemText
        primary={`${student.name} ${student.surname}`}
        secondary={student.house}
      />
      <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default React.memo(StudentItem);