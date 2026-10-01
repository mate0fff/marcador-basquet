import { View, Text, StyleSheet } from 'react-native';
import BotonAccion from './BotonAccion';

interface Props {
  nombre: string;
  puntos: number;
  color: string;
  onAnotar: (puntos: number) => void;
  ganando?: boolean;
}

export default function PanelEquipo({ nombre, puntos, color, onAnotar, ganando }: Props) {
  return (
    <View style={[
      styles.panel, 
      ganando && { borderColor: color, borderWidth: 3 } // Resalta si va ganando
    ]}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={[styles.puntos, { backgroundColor: color }]}>{puntos}</Text>
      
      <View style={styles.botones}>
        {/* Usamos una arrow function para poder pasarle el número a onAnotar */}
        <BotonAccion titulo="+1" onPress={() => onAnotar(1)} color={color} />
        <BotonAccion titulo="+2" onPress={() => onAnotar(2)} color={color} />
        <BotonAccion titulo="+3" onPress={() => onAnotar(3)} color={color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    padding: 15,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 10,
    width: '45%',
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  puntos: {
    fontSize: 40,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  botones: {
    width: '100%',
  }
});