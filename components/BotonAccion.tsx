import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BotonProps {
  titulo: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
}

export default function BotonAccion({ titulo, onPress, disabled, color = '#007AFF' }: BotonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.boton, 
        { backgroundColor: color, opacity: disabled ? 0.3 : 1 }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
    minWidth: 60,
  },
  texto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});