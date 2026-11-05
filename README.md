# Muestra 2 · Invitación de boda en formato libro pop-up

Invitación web de boda, en español, que funciona como un libro de papel con pop-ups.
Al abrir el enlace se ve la portada cerrada sobre un escritorio. Con un toque se abre el libro,
el fondo pasa a un oscuro difuminado y cada página muestra un dato de la boda con piezas de papel
que se levantan al llegar.

Hecha por JotaPG. Estilo romántico moderno: negro vino, rojo y dorado.

## Qué incluye

1. Portada con los nombres de los novios
2. Bienvenida
3. Fecha, con cuenta regresiva
4. Lugar, con botón al mapa
5. Itinerario del día
6. Vestimenta
7. Regalos
8. Confirmación de asistencia (espacio reservado)
9. Cierre, con botón para volver a la portada

Además tiene música de fondo con botón para silenciarla, navegación deslizando, con flechas
en pantalla o con el teclado, y funciona en celular y en computadora. En pantallas anchas el libro
se muestra como dos páginas abiertas.

## Cómo cambiar los datos

Todo lo que cambia de una pareja a otra está en `js/config.js`: nombres, fecha y hora, lugar,
itinerario, vestimenta, regalos y música. No hace falta tocar el resto.

La música va en `audio/`. Para usar otra canción, se reemplaza el archivo y se actualiza la ruta
en `config.js`.

## Probarla en el computador

Hay que abrirla desde un servidor local, no con doble clic sobre `index.html`:

```bash
python3 -m http.server 8000
```

Luego se entra a `http://localhost:8000`.

## Publicarla

Es un sitio estático (HTML, CSS y JavaScript, sin dependencias). Se publica gratis con GitHub Pages:
Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Estructura

```
index.html        página y controles
css/styles.css    diseño, libro 3D y pop-ups
js/config.js      datos de la invitación
js/pages.js       diseño de cada página
js/book.js        apertura, páginas, gestos, música y cuenta regresiva
audio/            música de fondo
```

## Pendiente

- Confirmación de asistencia: la página 8 tiene un espacio (`#rsvp-slot`) donde se conectará.
- Tipografías: se cargan desde Google Fonts (Bodoni Moda y Hanken Grotesk). Si se quiere funcionar
  sin conexión, hay que descargarlas y servirlas desde el propio sitio.
