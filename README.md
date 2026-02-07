# Portfolio Frontend - Angular Application

Aplicación web desarrollada en Angular 18 que proporciona una interfaz moderna y responsiva para visualizar un portafolio profesional. El sistema consume una API REST desarrollada en Laravel para mostrar proyectos, habilidades, experiencia laboral, formación académica e información personal.

## Requisitos del Sistema

El sistema requiere las siguientes herramientas instaladas en el entorno de desarrollo:

- Node.js 18.x o superior
- npm 9.x o superior
- Angular CLI 19.x
- Navegador web moderno (Chrome, Firefox, Safari o Edge)

## Arquitectura del Proyecto

La aplicación sigue la arquitectura estándar de Angular organizada en componentes, servicios y modelos. Esta estructura modular permite un mantenimiento eficiente y escalabilidad del código.

### Estructura de Directorios

El proyecto está organizado en la carpeta src/app que contiene todos los módulos de la aplicación. Dentro de esta carpeta se encuentran los components que incluyen los componentes de páginas (home, about, projects, skills, education, work-experience, languages) y los componentes compartidos (navbar, footer). Los services contienen los servicios HTTP para comunicación con la API backend. Los models definen las interfaces TypeScript que representan las entidades del sistema. El archivo app-routing.module.ts configura todas las rutas de navegación.

## Componentes Principales

La aplicación está construida con componentes reutilizables que siguen el patrón de diseño de Angular.

### HomeComponent

El componente principal de la página de inicio muestra un hero section con información personal destacada, proyectos destacados con filtro de los tres más importantes, habilidades principales limitadas a las seis más relevantes, y una sección de call-to-action invitando al contacto. El componente carga los datos de manera asíncrona combinando información de tres servicios diferentes (PersonalInfo, Projects y Skills) y presenta la información de forma atractiva y profesional.

### AboutComponent

El componente de información personal presenta los detalles completos del propietario del portafolio. Incluye un header con imagen de perfil o iniciales si no hay foto, información personal completa (nombre, título, biografía, ubicación), sección de contacto con email, teléfono y edad, y enlaces a redes sociales (GitHub y LinkedIn). El componente maneja la carga de la imagen de perfil desde el backend Laravel y proporciona un fallback con iniciales en caso de que no exista imagen.

### ProjectsComponent

Este componente muestra el portafolio completo de proyectos realizados. Presenta cada proyecto en tarjetas que incluyen imagen del proyecto, título y descripción detallada, tecnologías utilizadas mostradas como tags, fechas de inicio y fin con duración calculada, estado actual (en progreso, completado o pausado), enlaces a demo en vivo y repositorio GitHub, y badge especial para proyectos destacados. El componente implementa estados de carga, manejo de errores y una interfaz responsiva que se adapta a diferentes tamaños de pantalla.

### SkillsComponent

El componente de habilidades organiza y presenta todas las competencias del desarrollador. Incluye un sistema de filtros por categoría (técnicas, blandas, herramientas) y subcategoría dinámica según la categoría seleccionada. Las habilidades técnicas se muestran con barra de progreso visual indicando el nivel de competencia (0-100%) y etiqueta de nivel (Básico, Intermedio, Avanzado). Las habilidades blandas se presentan en tarjetas con gradiente de color. Las herramientas se muestran en un grid compacto con iconos. El componente utiliza FormsModule para el two-way data binding de los filtros.

### EducationComponent

Este componente presenta la formación académica en un formato de timeline vertical. Cada registro educativo muestra institución y título obtenido, campo de estudio, período de duración calculado automáticamente, estado con badges de color (completado, en progreso, pausado), ubicación de la institución, descripción del programa, y enlace al certificado cuando está disponible. El timeline incluye marcadores visuales y una línea conectora con degradado de color.

### WorkExperienceComponent

El componente de experiencia laboral muestra el historial profesional en formato timeline. Cada experiencia incluye cargo y empresa, período de trabajo con duración en meses, ubicación del empleo, badge especial con animación para empleos actuales, descripción general del puesto, lista de responsabilidades principales, y datos de referencia laboral (nombre y teléfono de contacto). Los marcadores del timeline tienen una animación pulsante para empleos actuales.

### LanguagesComponent

Este componente presenta los idiomas dominados en un grid de tarjetas. Cada idioma muestra emoji de bandera del país, nombre del idioma, badge con código de nivel según Marco Común Europeo (A1-C2), nivel de competencia (Nativo, Avanzado, Intermedio, Básico), barra de progreso visual con color diferenciado según nivel, y descripción adicional si está disponible. Las barras de progreso incluyen una animación de shimmer para mejor apariencia visual.

### Navbar Component

El componente de navegación proporciona acceso a todas las secciones del portafolio. Incluye logo o nombre del portafolio, menú de navegación con enlaces a Home, Proyectos, Habilidades, Educación, Experiencia, Idiomas y Sobre Mí. Utiliza routerLink para navegación sin recarga de página y routerLinkActive para resaltar la sección activa. En dispositivos móviles implementa un menú hamburguesa responsivo.

### Footer Component

El componente de pie de página muestra información de copyright, enlaces a redes sociales, enlaces rápidos a secciones principales, y información de contacto. Mantiene una apariencia consistente en todas las páginas del sitio.

## Servicios HTTP

Los servicios encapsulan toda la lógica de comunicación con la API backend siguiendo el patrón singleton de Angular con providedIn root.

### Estructura Común de Servicios

Todos los servicios siguen el mismo patrón de diseño. Inyectan HttpClient para realizar peticiones HTTP. Definen una URL base combinando el environment.apiUrl con el endpoint específico. Implementan métodos para operaciones CRUD (getAll para listar recursos, getById para obtener un recurso específico, create para crear nuevos recursos, update para actualizar recursos existentes, delete para eliminar recursos). Retornan Observables que permiten suscripción asíncrona y manejo reactivo de datos. Incluyen tipado fuerte con TypeScript para prevenir errores.

### PersonalInfoService

Este servicio gestiona la información personal con una particularidad importante. El método get retorna un Observable de tipo PersonalInfo (objeto único) en lugar de un array, ya que solo existe un registro de información personal. El servicio maneja la construcción de URLs completas para imágenes de perfil cuando el backend retorna rutas relativas.

### ProjectService

El servicio de proyectos implementa todos los métodos CRUD estándar. Maneja el array de tecnologías que viene como JSON del backend. Procesa las fechas y calcula duraciones en el componente basándose en los atributos computados del backend.

### SkillService

El servicio de habilidades gestiona las tres categorías diferentes (técnicas, blandas, herramientas). Maneja el campo de competencia numérica que solo aplica a habilidades técnicas. Los componentes pueden filtrar localmente por categoría y subcategoría usando los datos retornados.

### EducationService

Este servicio maneja los registros de formación académica. Gestiona el campo booleano current que indica estudios en curso. Procesa las fechas de inicio y fin para calcular períodos.

### WorkExperienceService

El servicio de experiencia laboral gestiona el historial profesional. Maneja el array de responsabilidades que viene como JSON. Procesa el campo current para identificar empleos actuales. Gestiona los datos de referencia laboral opcionales.

### LanguageService

El servicio de idiomas maneja la información de lenguajes dominados. Procesa los niveles de competencia predefinidos. Los componentes pueden usar el emoji generado automáticamente por el backend.

## Modelos (Interfaces TypeScript)

Las interfaces definen contratos de tipo que garantizan la consistencia de datos en toda la aplicación.

### PersonalInfo Interface

Define la estructura de información personal con campos nombre_completo y titulo en español para coincidir exactamente con el backend Laravel. Incluye campos opcionales para datos que pueden no estar presentes (github_url, linkedin_url, age, profile_image). Define tipos específicos para cada campo garantizando type safety.

### Project Interface

Define la estructura de proyectos con un array de strings para technologies. Campos date como strings en formato ISO. Campo status como union type de valores específicos (in_progress, completed, paused). Campo type como union type (personal, academic, professional). Campos booleanos para featured e is_current. Campos opcionales para image, url_demo y url_github.

### Skill Interface

Define habilidades con campo category como union type (technical, soft, tool). Campo proficiency como number opcional (solo para habilidades técnicas). Campo proficiency_label calculado por el backend. Subcategory como string opcional. Featured como booleano para identificar habilidades destacadas.

### Education Interface

Define formación académica con campos de fecha como strings. Campo current como booleano indicando estudios en curso. Campo status como union type (completed, in_progress, paused). Campo period calculado automáticamente por el backend. Certificate_url y location como opcionales.

### WorkExperience Interface

Define experiencia laboral con campo responsabilities escrito exactamente como en el backend (no responsibilities). Array de strings para las responsabilidades. Campo current indicando empleo actual. Campos opcionales para reference_name y reference_phone. Campo duration_in_months calculado por el backend.

### Language Interface

Define idiomas con campo proficiency como union type (Nativo, Avanzado, Intermedio, Basico). Campo level_code para el nivel según Marco Común Europeo. Campo flag_emoji calculado automáticamente por el backend. Description como opcional.

## Routing y Navegación

El sistema de rutas está configurado en app-routing.module.ts siguiendo las convenciones de Angular Router.

### Configuración de Rutas

Las rutas principales incluyen la ruta raíz que carga HomeComponent, la ruta projects para ProjectsComponent, about para AboutComponent, skills para SkillsComponent, education para EducationComponent, work-experience para WorkExperienceComponent, languages para LanguagesComponent, y una ruta wildcard que redirige cualquier URL no encontrada a la página principal.

### Navegación en la Aplicación

La navegación se implementa usando routerLink en lugar de href para evitar recargas de página. RouterLinkActive se usa para aplicar clases CSS a los enlaces activos. El Router inyectado en componentes permite navegación programática cuando es necesario. Las transiciones entre rutas son instantáneas mejorando la experiencia de usuario.

## Estilos y Diseño

La aplicación utiliza SCSS (Sass) para estilos avanzados con variables, anidamiento y mixins.

### Sistema de Diseño

El diseño sigue principios de diseño moderno con una paleta de colores consistente usando tonos de azul (primary: #1976d2), verde (success: #2e7d32), naranja (warning: #f57c00) y rojo (error: #c62828). Utiliza gradientes para elementos destacados (linear-gradient con tonos púrpura y azul). Implementa tipografía jerárquica con tamaños de fuente consistentes y pesos variables. Incluye spacing consistente usando múltiplos de 8px. Aplica border-radius de 8px-16px para elementos con esquinas redondeadas. Usa sombras sutiles (box-shadow) para profundidad visual.

### Responsividad

Todos los componentes son completamente responsivos. Utilizan CSS Grid y Flexbox para layouts flexibles. Implementan media queries para adaptación a diferentes tamaños de pantalla. Los breakpoints principales son 768px para tablets y 480px para móviles. Los grids cambian de múltiples columnas a una sola columna en móviles. Las tipografías se reducen proporcionalmente en pantallas pequeñas.

### Animaciones y Transiciones

La interfaz incluye múltiples animaciones CSS para mejor experiencia de usuario. Las transiciones suaves en hover (0.3s ease) se aplican a botones, tarjetas y enlaces. Existen transformaciones translateY para efectos de elevación en hover. Las barras de progreso tienen transiciones de width con duración de 1 segundo. Los marcadores de timeline actuales incluyen animación de pulse infinita. Las animaciones de shimmer se aplican a barras de progreso para efecto visual atractivo.

## Gestión de Estado y Datos

La aplicación maneja el estado de forma reactiva usando RxJS Observables.

### Carga de Datos

Los componentes implementan la interfaz OnInit ejecutando la carga de datos en ngOnInit. Utilizan el patrón de subscribe con handlers para next (datos exitosos), error (manejo de errores), y complete (opcional). Mantienen variables locales de estado para loading (booleano), error (string) y data (tipado fuerte). Muestran estados de carga con mensajes apropiados y estados de error con opción de reintentar.

### Manejo de Errores

El sistema implementa un manejo robusto de errores. Captura errores en el handler error del subscribe. Muestra mensajes de error amigables al usuario. Ofrece botones de reintentar que vuelven a ejecutar la petición. Registra errores en console para debugging durante desarrollo. No expone detalles técnicos al usuario final.

### Performance

La aplicación está optimizada para rendimiento. Usa trackBy en ngFor para optimizar renderizado de listas. Implementa OnPush change detection strategy cuando es apropiado. Carga datos solo cuando son necesarios (lazy loading conceptual). Cachea datos en memoria durante la sesión cuando es apropiado. Minimiza re-renders innecesarios.

## Configuración de Entornos

Angular proporciona configuración de entornos para diferentes etapas de desarrollo.

### Environment Files

El archivo environment.development.ts se usa durante desarrollo local con apiUrl apuntando a http://localhost:8000/api y production como false. El archivo environment.ts se usa para producción con apiUrl apuntando a la URL del servidor de producción y production como true.

### Uso de Environments

Los servicios importan environment desde @angular/environments. Construyen URLs de API usando environment.apiUrl concatenado con el endpoint específico. El build de Angular automáticamente usa el environment correcto según el comando ejecutado (ng serve usa development, ng build usa production).

## Instalación y Configuración

### Paso 1: Clonar el Repositorio

Clone el repositorio en su máquina local:
```bash
git clone <url-del-repositorio>
cd portfolio-frontend
```

### Paso 2: Instalar Dependencias

Instale todas las dependencias de npm:
```bash
npm install
```

### Paso 3: Configurar Environment

Edite el archivo src/environments/environment.development.ts y configure la URL de su API backend:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

### Paso 4: Iniciar la Aplicación

Ejecute el servidor de desarrollo:
```bash
ng serve
```

La aplicación estará disponible en http://localhost:4200 y se recargará automáticamente cuando detecte cambios en los archivos fuente.

## Comandos Disponibles

Durante el desarrollo, los siguientes comandos de Angular CLI son útiles.

Para iniciar el servidor de desarrollo use ng serve con la opción --open para abrir automáticamente el navegador. Para construir el proyecto para producción ejecute ng build que generará los archivos optimizados en el directorio dist. Para ejecutar pruebas unitarias use ng test con Karma. Para ejecutar pruebas end-to-end utilice ng e2e. Para generar un nuevo componente ejecute ng generate component nombre-componente. Para generar un nuevo servicio use ng generate service nombre-servicio. Para generar una nueva interfaz ejecute ng generate interface nombre-interfaz.

## Resolución de Problemas

### Error de CORS

Si encuentra errores de CORS verifique que el backend Laravel esté configurado correctamente con el middleware CORS activo. Asegúrese de que http://localhost:4200 esté en allowed_origins del backend. Verifique que ambos servidores (Angular y Laravel) estén ejecutándose. Revise la consola del navegador para mensajes de error específicos de CORS.

### Datos no se cargan

Si los datos no aparecen verifique que el backend Laravel esté ejecutándose en http://localhost:8000. Confirme que la base de datos contenga datos de prueba. Revise la consola del navegador para errores de red o JavaScript. Verifique que las URLs en environment.development.ts sean correctas. Use las herramientas de desarrollo del navegador en la pestaña Network para inspeccionar las peticiones HTTP.

### Errores de TypeScript

Si aparecen errores de compilación de TypeScript verifique que las interfaces coincidan exactamente con la estructura de datos del backend. Asegúrese de usar nombre_completo y titulo (no full_name ni title) en PersonalInfo. Use responsabilities (no responsibilities) en WorkExperience. Verifique que los tipos de union (status, category) coincidan exactamente con los valores del backend.

### Problemas de Rutas

Si las rutas no funcionan correctamente confirme que app-routing.module.ts esté importado en app.module.ts. Verifique que RouterModule.forRoot esté llamado con el array de rutas. Asegúrese de tener router-outlet en app.component.html. Use routerLink en lugar de href para navegación interna.

## Buenas Prácticas Implementadas

El proyecto sigue las mejores prácticas de Angular y desarrollo web moderno.

### Organización del Código

Los componentes están separados en archivos distintos (TypeScript, HTML, SCSS). Los servicios están centralizados en la carpeta services. Las interfaces están definidas en archivos separados en models. La lógica de negocio está en servicios, no en componentes. Los componentes se enfocan solo en presentación y manejo de eventos de UI.

### Tipado Fuerte

Todas las variables, parámetros y retornos tienen tipos explícitos de TypeScript. Las interfaces definen contratos claros para objetos de datos. Los Observables están tipados con el tipo de dato que emiten. No se usa el tipo any en ninguna parte del código. El compilador de TypeScript está configurado en modo estricto.

### Gestión de Suscripciones

Los componentes se suscriben a Observables en ngOnInit. Las suscripciones se manejan apropiadamente con el patrón subscribe. Se implementa manejo de errores en cada suscripción. Los componentes limpian suscripciones en ngOnDestroy cuando es necesario para prevenir memory leaks.

### Accesibilidad

Los elementos interactivos son accesibles por teclado. Las imágenes tienen atributos alt descriptivos. Los enlaces tienen texto descriptivo o aria-labels. Los formularios (cuando existen) tienen labels apropiados. La aplicación es navegable sin mouse usando solo teclado.

## Testing

El proyecto está configurado para testing con Jasmine y Karma.

### Estructura de Tests

Cada componente y servicio tiene su archivo .spec.ts correspondiente. Los tests unitarios verifican la lógica de componentes y servicios. Los tests pueden ejecutarse con ng test. La cobertura de código puede generarse con ng test --code-coverage.

## Optimización para Producción

La aplicación está optimizada para deployment en producción.

### Build de Producción

El comando ng build --configuration production genera archivos optimizados. El proceso incluye minificación de JavaScript y CSS, tree-shaking para eliminar código no usado, ahead-of-time compilation para mejor performance, bundling y code splitting automático, y optimización de imágenes y assets.

### Consideraciones de Deploy

Antes de hacer deploy configure la URL correcta del backend en environment.ts. Asegúrese de que el backend acepte peticiones desde el dominio de producción en su configuración CORS. Configure el servidor web para servir index.html en todas las rutas (para que el routing de Angular funcione). Implemente HTTPS en producción. Configure headers de caché apropiados para assets estáticos.

## Tecnologías Utilizadas

El proyecto utiliza Angular 18 como framework principal, TypeScript 5 como lenguaje de programación, RxJS para programación reactiva, SCSS/Sass para estilos avanzados, Angular Router para navegación, y Angular HttpClient para peticiones HTTP.

## Estructura de Módulos

El proyecto usa NgModule tradicional con app.module.ts como módulo raíz. Los componentes no son standalone (standalone: false). El módulo principal importa BrowserModule para funcionalidad de navegador, AppRoutingModule para configuración de rutas, HttpClientModule para peticiones HTTP, y FormsModule para two-way data binding en filtros.

## Próximos Pasos

Para extender la funcionalidad del portafolio considere implementar autenticación para administrar contenido, un panel de administración para gestionar datos sin acceder a la base de datos directamente, búsqueda y filtrado avanzado de proyectos, modo oscuro/claro, internacionalización (i18n) para múltiples idiomas, animaciones de página más elaboradas, Progressive Web App (PWA) para funcionalidad offline, y optimización SEO con Angular Universal para server-side rendering.

## Licencia

Este proyecto es de código propietario desarrollado para uso personal como portafolio profesional.
