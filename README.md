# Marcador de Básquet - MATEO FUENZALIDA

Aplicación móvil desarrollada con Expo para llevar el puntaje de un partido de básquet.

## Características
* Marcador independiente para equipo Local y Visitante.
* Suma de +1, +2 y +3 puntos usando una única función.
* Cálculo automático de estado derivado (quién va ganando, diferencia de puntos).
* Deshabilitación dinámica del botón "Nuevo partido".

## Respuestas del Ejercicio 2

**1. ¿Por qué acá el estado tiene que vivir en el padre?**
El estado debe vivir en el componente padre (la pantalla principal o App.tsx) porque necesitamos comparar ambos equipos simultáneamente para calcular el estado derivado. Si los puntos estuvieran aislados, la pantalla principal no podría saber la diferencia de puntos, quién va ganando para resaltarlo, ni si debe deshabilitar el botón de "Nuevo Partido".

**2. Adentro de PanelEquipo, ¿cómo le pasás el onAnotar a cada botón? ¿Por qué no alcanza con onPress={onAnotar}?**
Se le pasa en una arrow function: `onPress={() => onAnotar(1)}`. No alcanza con usar `onPress={onAnotar}` porque el evento `onPress` espera una función sin parámetros. Como nuestra función debe saber cuantos puntos sumar, usar una arrow function permite pasarle ese argumento sin que la función se ejecute automáticamente en la pantalla.