import React from 'react';
import { List } from '@mui/material';
import StudentItem from './studentItem';
import { handleRemoveStudent } from '@/db/actions'; // Import the handleRemoveStudent function

interface Student {
  studentId: string;
  name: string;
  surname: string;
  house: string;
}

interface Props {
  students: Student[];
}

const StudentList: React.FC<Props> = ({ students }) => {
  if (students.length === 0) {
    return <p>No students found.</p>;
  }

  return (
    <List>
      {students.map((student) => (
        <StudentItem
          key={student.studentId}
          student={student}
          onDelete={handleRemoveStudent}
        />
      ))}
    </List>
  );
};

export default React.memo(StudentList);