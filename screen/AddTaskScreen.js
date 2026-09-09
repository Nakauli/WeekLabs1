import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import { auth, db } from '../firebaseConfig';
import TaskCard from '../components/TaskCard';

export default function AddTaskScreen() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [quote, setQuote] = useState("Loading today's motivation...");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const unsubscribe = onSnapshot(
      query(collection(db, 'tasks'), where('ownerId', '==', user.uid)),
      (snapshot) => {
        const loadedTasks = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));
        setTasks(loadedTasks);
      },
      (error) => {
        console.error('Firestore listener error:', error.message);
        setErrorMessage(error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchQuote();
  }, []);

  function fetchQuote() {
    setQuote("Loading today's motivation...");

    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => setQuote(data.content))
      .catch(() => setQuote('Believe in yourself and get it done!'));
  }

  async function handleAddTask() {
    if (taskText.trim() === '') {
      setErrorMessage('Please type a task before adding it.');
      return;
    }

    try {
      if (!auth.currentUser) return;
      await addDoc(collection(db, 'tasks'), {
        title: taskText,
        done: false,
        ownerId: auth.currentUser.uid,
      });
      setTaskText('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleToggleTask(id, currentDone) {
    try {
      await updateDoc(doc(db, 'tasks', id), { done: !currentDone });
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Log Out" onPress={handleLogout} />
      <Text style={styles.quote}>💬 {quote}</Text>

      <View style={styles.quoteButton}>
        <Button
          title="New Quote"
          onPress={fetchQuote}
        />
      </View>

      <Text style={styles.heading}>Add a Task</Text>

      <TextInput
        style={styles.input}
        placeholder="What do you need to do?"
        value={taskText}
        onChangeText={setTaskText}
      />

      {errorMessage !== '' && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}

      <Button
        title="Add Task"
        onPress={handleAddTask}
      />

      {tasks.length > 0 && tasks.every((t) => t.done) && (
        <Text style={styles.celebration}>🎉 All done! Great work!</Text>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            done={item.done}
            onToggle={() => handleToggleTask(item.id, item.done)}
            onDelete={() => handleDeleteTask(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet — add one above! 👆</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  quote: {
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },

  quoteButton: {
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D8DEE9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  error: {
    color: '#B23A48',
    marginBottom: 10,
  },

  celebration: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E8A7A',
    textAlign: 'center',
    marginVertical: 12,
  },

  list: {
    marginTop: 16,
  },

  empty: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 24,
  },

  separator: {
    height: 8,
  },
});
