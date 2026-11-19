# Panel de control · Santo Spirito (prototipo)

Backoffice de la tienda. Define **todas las entradas** que necesita la tienda online
y sirve para probar el circuito completo antes de conectarlo a la web.

## Cómo abrirlo

Doble clic en `admin/panel.html` (funciona sin servidor, sin instalar nada).

Los datos se guardan en el navegador (`localStorage`). El botón **Restablecer al estado
inicial** vuelve a la carga de arranque.

## Estado de arranque

La tienda todavía no tiene ventas, así que el panel arranca **sin movimientos**:

- **78 modelos** del depósito (hoja `STOCK` del Excel), con sus talles y unidades reales (123 u).
- **48 fotos** (las del Excel y las de la tienda).
- **10 productos publicados**, ya vinculados con su `id` de la web.
- **0 pedidos, 0 clientes, 0 cobros, 0 cupones, 0 movimientos.**

Las pestañas de Pedidos, Clientes, Envíos, Cobros y Cupones quedan vacías con su
formulario listo para cargar la primera venta real (web o mostrador).

## Qué incluye

| Sección | Para qué sirve |
|---|---|
| **Resumen** | KPIs, alertas de lo que falta cargar y stock crítico |
| **Productos** | Alta y edición completa: nombre, SKU, categoría, tela, precio, costo, IVA, descripción, colores, talles con stock, fotos, estado de publicación, SEO |
| **Stock** | Matriz producto × talle editable en línea + movimientos (entrada / salida / ajuste) con motivo |
| **Pedidos** | Ventas web y de mostrador, estados, cobros, envíos |
| **Clientes** | Base de clientes, historial y saldo |
| **Envíos** | Transporte y seguimiento |
| **Cobros** | Pagos recibidos, medios y saldo pendiente |
| **Cupones** | Porcentaje, monto fijo o envío gratis, con vigencia y usos |
| **Contenido** | Portada, barra de anuncios y textos legales |
| **Ajustes** | Datos del negocio, envíos, pagos y exportación del catálogo |

## Cómo se conecta con la tienda

**Ahora:** el botón **Publicar** exporta `catalog.json` / `products.js` con los productos
publicados. Se reemplaza el archivo del sitio y se vuelve a compilar.

**Producción (recomendado):** panel + base de datos en un servidor (Supabase):

1. El panel escribe productos, stock y pedidos en la base.
2. La tienda lee catálogo y stock de la misma base.
3. El webhook de MercadoPago marca el pedido como pagado y descuenta el talle vendido.
4. Si un talle llega a 0, la web lo muestra agotado sin intervención manual.

Con eso, cargar una prenda o vender una unidad actualiza la web al instante y el Excel deja de usarse.

## Archivos

```
admin/
  panel.html     interfaz y lógica (sin dependencias)
  seed.js        carga inicial generada desde el Excel y la tienda
  media/         fotos (Excel + tienda), 62 archivos
```

## Lo que falta definir

- Dónde vive la base de datos y quién tiene acceso al panel (usuario y contraseña).
- Qué variante de Topacio está publicada (cuello mao 5 u / cuello corazón 7 u).
- Precio de los 68 modelos que hoy no tienen precio cargado.
