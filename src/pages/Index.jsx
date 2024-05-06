import { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, Text, VStack, Container } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave, FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  const handleAddTask = () => {
    if (input) {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? editText : task));
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditText('');
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Text fontSize="2xl" fontWeight="bold">Todo List</Text>
        <Box display="flex" w="100%">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton icon={<FaPlus />} onClick={handleAddTask} colorScheme="blue" aria-label="Add task" />
        </Box>
        <List spacing={3} w="100%">
          {tasks.map((task, index) => (
            <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
              {editIndex === index ? (
                <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
              ) : (
                <Text fontSize="lg">{task}</Text>
              )}
              <Box>
                {editIndex === index ? (
                  <IconButton icon={<FaSave />} onClick={() => handleSaveEdit(index)} colorScheme="green" aria-label="Save edit" />
                ) : (
                  <IconButton icon={<FaEdit />} onClick={() => handleEditTask(index)} colorScheme="yellow" aria-label="Edit task" />
                )}
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(index)} colorScheme="red" aria-label="Delete task" />
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;