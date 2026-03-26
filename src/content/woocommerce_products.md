# Woocommerce Productos

Lo primero que vamos a tratar en esta guía, es la forma de introducir o administrar nuestros productos en la tienda. Esto lo podemos realizar buscando en el menú lateral principal de WordPress, el bloque “Productos” como vimos antes, hacemos clic en “Todos los productos”.

<img src="/images/woocommerce-products.png"  width="400" alt="Menú acceso productos">

¿Qué podemos encontrar?
Veremos un listado detallado de los productos que has creado (publicados o no), organizados por fecha de creación, del más reciente al más antiguo. Es
posible utilizar los filtros para encontrar un producto o serie de productos que nos interese.

Como podemos ver, un aspecto importante es la disponibilidad de cada producto, en verde si hay existencia, en rojo si se encuentra AGOTADO y no podrá
ser comprado hasta cambiar su estado a disponible.
Podemos editar los productos existentes, borrarlos o bien, ingresar nuevos, como veremos un poco más adelante.

### Crear productos

Para agregar productos nuevos lo primero que debemos hacer es acceder a la opción de “Añadir nuevo”, podremos añadir la información de nuestro producto como el nombre, descripción, precio, categoría, imágenes etc.

Como vemos en la parte superior izquierda podemos agregar el nombre de nuestro producto
nuevo y en el más grande una descripción larga del producto.

<img src="/images/woocommerce-products-simple.png"  width="600" alt="Woocommerce producto simple">

También podemos agregar categorías y subcategorías a nuestro producto. En el panel derecho tenemos también los botones de “Vista previa” y “Publicar”, si no estamos seguros de los cambios podemos previsualizar y una vez que estamos seguros publicamos el artículo.

Para poner precio a nuestro producto debemos buscar la sección de “Datos del producto” que se encuentra más abajo en la sección, debemos asegurarnos
que el producto se encuentre en “Producto simple”
, introducimos el precio.
Es importante no confundir el precio normal y el rebajado, el precio normal se verá subrayado si hay algún valor en el precio rebajado.

<img src="/images/woocommerce-products-simple-price.png"  width="600" alt="woocommerce producto simple con precio">

Al final del panel derecho encontraremos el lugar para agregar nuestra imagen principal y
también imágenes a la galería en caso de que tengamos muchas imágenes.
Si dejamos vacía la opción de “Imagen del producto” y ponemos varias imágenes en
“Galería del producto” la primera imagen cargada será la principal.

<img src="/images/woocommerce-products-simple-image.png"  width="300" alt="woocommerce producto simple con precio">

### Crear productos variables

Crear un producto variable es muy similar a crear uno simple, la diferencia es que en el apartado de “Datos del producto” seleccionaremos “Producto variable”
(Si no sabes como crear el producto revisa la primera parte de “Crear productos simples)

Una vez ya tenemos seleccionado “Producto variable” haremos clic en la ventana de “Atributos”, Elegimos la opción de “Atributo de producto personalizado”  después “Añadir” 

<img src="/images/woocommerce-products-variable.png"  width="300" alt="woocommerce producto simple con precio">


Cuando hacemos clic en “Añadir” veremos dos cuadros de texto, Nombre y Valores.
El Nombre se refiere al tipo de variación ejemplos serían: Talla, color, tamaño, presentación.
Y el apartado de Valores se refiere a los elementos que conforman el atributo, por ejemplo para el Nombre Color, todos los colores serían posibles valores y se separan con una barra vertical “|” (normalmente esta barra se escribe con la tecla a la izquierda del número uno)
Una vez tenemos el nombre y valor del atributo, marcamos como activa la casilla “Usado para variaciones” y guardamos.

<img src="/images/woocommerce-products-variable-atribute.png"  width="300" alt="woocommerce producto simple con precio">

Cuando ya tenemos los atributos listos vamos a la pestaña de variaciones y elegimos la opción de “Crear variaciones para todos los atributos” y hacemos clic en “Ir” . Esto va a generar las combinaciones de producto posibles según los atributos que creaste.

<img src="/images/woocommerce-products-variable-atributes-list.png"  width="300" alt="woocommerce producto simple con precio">

Por ejemplo, si tienes el atributo color con 3 colores, entonces tienes 3 productos diferentes pero si tienes color y Talla (talla con 2 valores como grande y mediano) entonces al combinarlos tendrás 6 productos distintos, que son el resultado de la combinación de cada variación. 

<img src="/images/woocommerce-products-variable-variations.png"  width="300" alt="woocommerce producto simple con precio">

Si queremos modificar cada uno de los productos variables hacemos clic sobre el ID, como #3008 y podremos ingresar imágenes individuales para cada variación, peso y precio así como información diferente a la del producto principal.

<img src="/images/woocommerce-products-variable-variatons-list.png"  width="300" alt="woocommerce producto simple con precio">

Al final damos clic a guardar cambios y en publicar el producto en la tienda
