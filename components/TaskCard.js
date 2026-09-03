import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme';

export default function TaskCard({ title, done, onToggle, onDelete }) {
  return (
    <View style={styles.card}>
      <Pressable onPress={onToggle} style={styles.left}>
        <Ionicons
          name={done ? 'checkmark-circle' : 'ellipse-outline'}
          size={22}
          color={done ? colors.teal : colors.gray}
        />
        <Text style={styles.title}>{title}</Text>
      </Pressable>

      <Pressable onPress={onDelete}>
        <Ionicons name="trash-outline" size={20} color={colors.red} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    backgroundColor: colors.lightBg,
    borderRadius: 8,
  },

  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
