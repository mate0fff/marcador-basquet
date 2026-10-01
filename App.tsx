import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PanelEquipo from './components/PanelEquipo';
import BotonAccion from './components/BotonAccion';

type Equipo = 'local' | 'visitante';
type Jugada = { equipo: Equipo; puntos: number }; // <-- Nuevo tipo para el Ejercicio 4

export default function App() {
  // Ejercicio 1: Un useState por equipo
  const [local, setLocal] = useState(0);
  const [visitante, setVisitante] = useState(0);
  
  // Ejercicio 4: Jugadas
  const [jugadas, setJugadas] = useState<Jugada[]>([]);

  // Una sola función que resuelve los seis botones
  const anotar = (equipo: Equipo, puntos: number) => {
    // 1. Suma puntios
    if (equipo === 'local') {
      setLocal(prev => prev + puntos);
    } else {
      setVisitante(prev => prev + puntos);
    }
    // 2. Guarda la jugada
    setJugadas(prev => [...prev, { equipo, puntos }]);
  };

  // EJERCICIO 4: Función Deshacer
  const deshacer = () => {
    if (jugadas.length === 0) return; 
    
    
    const ultimaJugada = jugadas[jugadas.length - 1];
    
   
    if (ultimaJugada.equipo === 'local') {
      setLocal(prev => prev - ultimaJugada.puntos);
    } else {
      setVisitante(prev => prev - ultimaJugada.puntos);
    }
    
    // Uso de Slice
    setJugadas(prev => prev.slice(0, -1));
  };

  const nuevoPartido = () => {
    setLocal(0);
    setVisitante(0);
    setJugadas([]); // Pista
  };

  // Ejercicio 3 - Lo que se calcula solo
  const diferencia = Math.abs(local - visitante);
  let leyenda = "Empate";
  if (local > visitante) {
    leyenda = `Gana Local por ${diferencia}`;
  } else if (visitante > local) {
    leyenda = `Gana Visitante por ${diferencia}`;
  }

  const estaEnCero = local === 0 && visitante === 0;

  const ultimasJugadas = jugadas.slice(-5).reverse();

  return (
    <View style={styles.container}>
      <View style={styles.marcador}>
        <PanelEquipo
          nombre="Local"
          puntos={local}
          color="#FF3B30"
          onAnotar={(puntos) => anotar('local', puntos)}
          ganando={local > visitante}
        />
        <PanelEquipo
          nombre="Visitante"
          puntos={visitante}
          color="#007AFF"
          onAnotar={(puntos) => anotar('visitante', puntos)}
          ganando={visitante > local}
        />
      </View>

      <Text style={styles.leyenda}>{leyenda}</Text>

      {/* EJERCICIO 4: UI de Jugadas y Deshacer */}
      <View style={styles.historialContainer}>
        <View style={styles.cajaHistorial}>
          {ultimasJugadas.map((j, index) => (
            <Text key={index} style={styles.textoHistorial}>
              {j.equipo === 'local' ? 'Local' : 'Visitante'} +{j.puntos}
            </Text>
          ))}
          {ultimasJugadas.length === 0 && (
            <Text style={styles.textoHistorialVacio}>No hay jugadas recientes</Text>
          )}
        </View>

        <BotonAccion
          titulo="Deshacer"
          onPress={deshacer}
          disabled={jugadas.length === 0}
          color="#FF9500" 
        />
      </View>

      <BotonAccion
        titulo="Nuevo partido"
        onPress={nuevoPartido}
        disabled={estaEnCero}
        color="#34C759" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  marcador: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  leyenda: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  historialContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  cajaHistorial: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    minHeight: 100,
    marginBottom: 10,
  },
  textoHistorial: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'monospace',
  },
  textoHistorialVacio: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  }
});