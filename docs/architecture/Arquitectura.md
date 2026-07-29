# Arquitectura de la Plataforma Empresarial Supporting

## 1. Objetivo de la plataforma

La Plataforma Empresarial Supporting tiene como objetivo centralizar la gestión de clientes, técnicos, servicios y alertas en un entorno único, orientado a empresas que requieren soporte técnico, monitorización y seguimiento administrativo de su infraestructura y servicios.

La arquitectura está diseñada para ser modular, escalable y alineada con buenas prácticas DevOps y de desarrollo empresarial.

---

## 2. Áreas principales de la plataforma

La plataforma se organiza en cuatro áreas funcionales principales:

### 2.1 Área de Clientes

Esta área gestiona toda la información relacionada con los clientes y sus expedientes.

**Elementos clave:**

- Expedientes de clientes  
- Servicios contratados  
- Técnicos asignados  
- Tickets abiertos  
- Historial de acciones y eventos  
- Alertas asociadas al cliente  
- Información administrativa

**Acciones principales:**

- Crear expediente de cliente  
- Editar expediente  
- Asignar técnico  
- Asignar servicio  
- Ver tickets  
- Ver historial  
- Ver alertas

> La creación de clientes se realiza exclusivamente desde el área administrativa, por motivos de seguridad, control y auditoría.

---

### 2.2 Área de Técnicos

Esta área gestiona la información y la operativa de los técnicos que dan soporte a los clientes.

**Elementos clave:**

- Datos del técnico (nombre, especialidad)  
- Horarios  
- Disponibilidad  
- Agenda de citas con clientes  
- Tickets asignados  
- Alertas técnicas

**Acciones principales:**

- Ver disponibilidad  
- Agendar cita con cliente  
- Ver tickets asignados  
- Ver alertas técnicas  
- Marcar disponibilidad

---

### 2.3 Área de Servicios

Esta área centraliza los servicios ofrecidos por Supporting y su relación con los clientes y técnicos.

**Tipos de servicios:**

- Servicios generales (soporte IT, hardening, etc.)  
- Servicios de monitorización  
- Servicios de demo guiada  
- Servicios técnicos  
- Servicios personalizados

**Acciones principales:**

- Asignar servicio a cliente  
- Ver estado del servicio  
- Ver técnicos asignados al servicio  
- Ver alertas asociadas al servicio

---

### 2.4 Área Administrativa

Esta área gestiona la parte comercial, de control y de permisos dentro de la plataforma.

**Funciones principales:**

- Gestión de clientes interesados  
- Contacto con clientes  
- Seguimiento comercial  
- Gestión de servicios ofrecidos  
- Estado de cada cliente  
- Roles y permisos  
- Panel de control empresarial

**Roles definidos:**

- Administrador  
- Técnico  
- Comercial  
- Cliente (acceso limitado)

---

## 3. Panel general (Dashboard empresarial)

El dashboard es la puerta de entrada a la plataforma y el punto central de visualización del estado del negocio.

**Objetivo del dashboard:**

Mostrar información resumida y relevante en pocos segundos, sin necesidad de navegar por múltiples pantallas.

**Indicadores principales:**

- Número de clientes activos  
- Técnicos disponibles  
- Servicios contratados  
- Alertas activas (especialmente críticas)  
- Tickets abiertos  
- Estado general del sistema

**Ejemplo de resumen:**

- 32 clientes activos  
- 5 técnicos disponibles  
- 12 servicios contratados  
- 3 alertas críticas  
- 7 tickets abiertos  

Este panel permite una visión rápida del estado de la empresa y facilita la toma de decisiones operativas.

---

## 4. Accesos rápidos

Debajo del panel general se incluyen accesos rápidos a las acciones más utilizadas:

- Crear cliente  
- Registrar técnico  
- Crear servicio  
- Ver alertas  
- Acceder al panel administrativo  

Estos accesos están orientados a mejorar la productividad y reducir el tiempo de navegación.

---

## 5. Estado del usuario

En la esquina superior derecha del interfaz se muestra información del usuario autenticado:

- Nombre del usuario  
- Rol (Admin / Técnico / Operador / Comercial / Cliente)  
- Foto o inicial  
- Botón de cerrar sesión  

Este patrón sigue estándares de diseño de plataformas empresariales y facilita la identificación del contexto de trabajo.

---

## 6. Consideraciones de seguridad y control

- La creación y gestión de clientes se realiza desde el área administrativa.  
- Los roles determinan el nivel de acceso a cada área (clientes, técnicos, servicios, alertas, administración).  
- Las acciones críticas (asignación de servicios, cambios de estado, gestión de alertas) deben quedar registradas para auditoría futura.  

La arquitectura funcional está pensada para soportar futuras integraciones con sistemas de monitorización, automatización y reporting, manteniendo una separación clara entre áreas de negocio y roles de usuario.
