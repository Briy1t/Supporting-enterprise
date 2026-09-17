# 📘 Documentación de la API (OpenAPI)

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "SUPPORTING Platform Backend",
    "description": "Backend modular de la plataforma SUPPORTING",
    "version": "1.0.0"
  },
  "paths": {
    "/auth/create": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Crear Usuario Route",
        "operationId": "crear_usuario_route_auth_create_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AuthCreate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/auth/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Login Route",
        "operationId": "login_route_auth_login_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AuthLogin"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/clientes/": {
      "get": {
        "tags": [
          "Clientes"
        ],
        "summary": "Listar Clientes Route",
        "operationId": "listar_clientes_route_clientes__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/ClienteResponse"
                  },
                  "type": "array",
                  "title": "Response Listar Clientes Route Clientes  Get"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Clientes"
        ],
        "summary": "Crear Cliente Route",
        "operationId": "crear_cliente_route_clientes__post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ClienteCreate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/clientes/{cliente_id}": {
      "get": {
        "tags": [
          "Clientes"
        ],
        "summary": "Obtener Cliente Route",
        "operationId": "obtener_cliente_route_clientes__cliente_id__get",
        "parameters": [
          {
            "name": "cliente_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Cliente Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ClienteResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Clientes"
        ],
        "summary": "Eliminar Cliente Route",
        "operationId": "eliminar_cliente_route_clientes__cliente_id__delete",
        "parameters": [
          {
            "name": "cliente_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Cliente Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admin/forms/importar": {
      "post": {
        "tags": [
          "Admin - Formularios"
        ],
        "summary": "Importar Lead Route",
        "operationId": "importar_lead_route_admin_forms_importar_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LeadCreate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LeadResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admin/forms": {
      "get": {
        "tags": [
          "Admin - Formularios"
        ],
        "summary": "Listar Leads Route",
        "operationId": "listar_leads_route_admin_forms_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/LeadResponse"
                  },
                  "type": "array",
                  "title": "Response Listar Leads Route Admin Forms Get"
                }
              }
            }
          }
        }
      }
    },
    "/admin/forms/{lead_id}/estado": {
      "patch": {
        "tags": [
          "Admin - Formularios"
        ],
        "summary": "Actualizar Estado Route",
        "operationId": "actualizar_estado_route_admin_forms__lead_id__estado_patch",
        "parameters": [
          {
            "name": "lead_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Lead Id"
            }
          },
          {
            "name": "estado",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Estado"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admin/forms/{lead_id}/convertir": {
      "post": {
        "tags": [
          "Admin - Formularios"
        ],
        "summary": "Convertir Lead Route",
        "operationId": "convertir_lead_route_admin_forms__lead_id__convertir_post",
        "parameters": [
          {
            "name": "lead_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Lead Id"
            }
          },
          {
            "name": "telefono",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Telefono"
            }
          },
          {
            "name": "empresa",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Empresa"
            }
          },
          {
            "name": "servicio",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Servicio"
            }
          },
          {
            "name": "preferencia",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "correo",
              "title": "Preferencia"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "anyOf": [
                  {
                    "type": "array",
                    "items": {
                      "type": "integer"
                    }
                  },
                  {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  {
                    "type": "null"
                  }
                ],
                "title": "Servicios"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admin/forms/{lead_id}/descartar": {
      "post": {
        "tags": [
          "Admin - Formularios"
        ],
        "summary": "Descartar Lead Route",
        "operationId": "descartar_lead_route_admin_forms__lead_id__descartar_post",
        "parameters": [
          {
            "name": "lead_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Lead Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/admin/forms/lead/{lead_id}": {
      "get": {
        "tags": [
          "Admin - Formularios"
        ],
        "summary": "Obtener Lead Por Id Route",
        "operationId": "obtener_lead_por_id_route_admin_forms_lead__lead_id__get",
        "parameters": [
          {
            "name": "lead_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Lead Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LeadResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/servicios/": {
      "get": {
        "tags": [
          "Servicios"
        ],
        "summary": "Listar Servicios Route",
        "operationId": "listar_servicios_route_servicios__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/ServicioResponse"
                  },
                  "type": "array",
                  "title": "Response Listar Servicios Route Servicios  Get"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Servicios"
        ],
        "summary": "Crear Servicio Route",
        "operationId": "crear_servicio_route_servicios__post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServicioCreate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ServicioResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/servicios/{servicio_id}": {
      "put": {
        "tags": [
          "Servicios"
        ],
        "summary": "Actualizar Servicio Route",
        "operationId": "actualizar_servicio_route_servicios__servicio_id__put",
        "parameters": [
          {
            "name": "servicio_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Servicio Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServicioUpdate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ServicioResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Servicios"
        ],
        "summary": "Eliminar Servicio Route",
        "operationId": "eliminar_servicio_route_servicios__servicio_id__delete",
        "parameters": [
          {
            "name": "servicio_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Servicio Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/tickets/": {
      "get": {
        "tags": [
          "Tickets"
        ],
        "summary": "Listar Tickets Route",
        "operationId": "listar_tickets_route_tickets__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/TicketResponse"
                  },
                  "type": "array",
                  "title": "Response Listar Tickets Route Tickets  Get"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Tickets"
        ],
        "summary": "Crear Ticket Route",
        "operationId": "crear_ticket_route_tickets__post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TicketCreate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TicketResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/tickets/{ticket_id}": {
      "get": {
        "tags": [
          "Tickets"
        ],
        "summary": "Obtener Ticket Route",
        "operationId": "obtener_ticket_route_tickets__ticket_id__get",
        "parameters": [
          {
            "name": "ticket_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Ticket Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TicketResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Tickets"
        ],
        "summary": "Eliminar Ticket Route",
        "operationId": "eliminar_ticket_route_tickets__ticket_id__delete",
        "parameters": [
          {
            "name": "ticket_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Ticket Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/tickets/{ticket_id}/estado": {
      "patch": {
        "tags": [
          "Tickets"
        ],
        "summary": "Actualizar Estado Route",
        "operationId": "actualizar_estado_route_tickets__ticket_id__estado_patch",
        "parameters": [
          {
            "name": "ticket_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Ticket Id"
            }
          },
          {
            "name": "estado",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Estado"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/tecnicos/": {
      "get": {
        "tags": [
          "Tecnicos"
        ],
        "summary": "Listar Tecnicos Route",
        "operationId": "listar_tecnicos_route_tecnicos__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/TecnicoResponse"
                  },
                  "type": "array",
                  "title": "Response Listar Tecnicos Route Tecnicos  Get"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Tecnicos"
        ],
        "summary": "Crear Tecnico",
        "operationId": "crear_tecnico_tecnicos__post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TecnicoCreate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TecnicoResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/tecnicos/{tecnico_id}": {
      "get": {
        "tags": [
          "Tecnicos"
        ],
        "summary": "Obtener Tecnico Route",
        "operationId": "obtener_tecnico_route_tecnicos__tecnico_id__get",
        "parameters": [
          {
            "name": "tecnico_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Tecnico Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TecnicoResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Tecnicos"
        ],
        "summary": "Eliminar Tecnico Route",
        "operationId": "eliminar_tecnico_route_tecnicos__tecnico_id__delete",
        "parameters": [
          {
            "name": "tecnico_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Tecnico Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/tecnicos/{tecnico_id}/disponibilidad": {
      "patch": {
        "tags": [
          "Tecnicos"
        ],
        "summary": "Actualizar Disponibilidad Route",
        "operationId": "actualizar_disponibilidad_route_tecnicos__tecnico_id__disponibilidad_patch",
        "parameters": [
          {
            "name": "tecnico_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Tecnico Id"
            }
          },
          {
            "name": "disponibilidad",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Disponibilidad"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Crear Disponibilidad",
        "operationId": "crear_disponibilidad_tecnicos__tecnico_id__disponibilidad_post",
        "parameters": [
          {
            "name": "tecnico_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Tecnico Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DisponibilidadCreate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/tecnicos/{tecnico_id}/citas": {
      "post": {
        "tags": [
          "Citas"
        ],
        "summary": "Crear Cita",
        "operationId": "crear_cita_tecnicos__tecnico_id__citas_post",
        "parameters": [
          {
            "name": "tecnico_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Tecnico Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CitaCreate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CitaResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/tecnicos/{tecnico_id}/calendario": {
      "get": {
        "tags": [
          "Calendario Técnico"
        ],
        "summary": "Calendario Admin",
        "operationId": "calendario_admin_tecnicos__tecnico_id__calendario_get",
        "parameters": [
          {
            "name": "tecnico_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Tecnico Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/alarmas/": {
      "get": {
        "tags": [
          "Alarmas"
        ],
        "summary": "Listar Alarmas Route",
        "operationId": "listar_alarmas_route_alarmas__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/AlarmaResponse"
                  },
                  "type": "array",
                  "title": "Response Listar Alarmas Route Alarmas  Get"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Alarmas"
        ],
        "summary": "Crear Alarma Route",
        "operationId": "crear_alarma_route_alarmas__post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AlarmaCreate"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AlarmaResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/alarmas/{alarma_id}": {
      "get": {
        "tags": [
          "Alarmas"
        ],
        "summary": "Obtener Alarma Route",
        "operationId": "obtener_alarma_route_alarmas__alarma_id__get",
        "parameters": [
          {
            "name": "alarma_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Alarma Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AlarmaResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Alarmas"
        ],
        "summary": "Eliminar Alarma Route",
        "operationId": "eliminar_alarma_route_alarmas__alarma_id__delete",
        "parameters": [
          {
            "name": "alarma_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Alarma Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/alarmas/{alarma_id}/estado": {
      "patch": {
        "tags": [
          "Alarmas"
        ],
        "summary": "Actualizar Estado Route",
        "operationId": "actualizar_estado_route_alarmas__alarma_id__estado_patch",
        "parameters": [
          {
            "name": "alarma_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Alarma Id"
            }
          },
          {
            "name": "estado",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Estado"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/usuarios/": {
      "get": {
        "tags": [
          "Usuarios"
        ],
        "summary": "Listar Usuarios",
        "operationId": "listar_usuarios_usuarios__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/AuthResponse"
                  },
                  "type": "array",
                  "title": "Response Listar Usuarios Usuarios  Get"
                }
              }
            }
          }
        }
      }
    },
    "/contratos/{lead_id}": {
      "get": {
        "tags": [
          "Contratos"
        ],
        "summary": "Obtener Contrato Por Lead",
        "operationId": "obtener_contrato_por_lead_contratos__lead_id__get",
        "parameters": [
          {
            "name": "lead_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Lead Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/contratos/historial/{lead_id}": {
      "get": {
        "tags": [
          "Contratos"
        ],
        "summary": "Obtener Historial Por Lead",
        "operationId": "obtener_historial_por_lead_contratos_historial__lead_id__get",
        "parameters": [
          {
            "name": "lead_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Lead Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/contratos/descargar/{lead_id}": {
      "get": {
        "tags": [
          "Contratos"
        ],
        "summary": "Descargar Contrato",
        "operationId": "descargar_contrato_contratos_descargar__lead_id__get",
        "parameters": [
          {
            "name": "lead_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Lead Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/contratos/subir-firmado/{contrato_id}": {
      "post": {
        "tags": [
          "Contratos"
        ],
        "summary": "Subir Contrato Firmado",
        "operationId": "subir_contrato_firmado_contratos_subir_firmado__contrato_id__post",
        "parameters": [
          {
            "name": "contrato_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Contrato Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "$ref": "#/components/schemas/Body_subir_contrato_firmado_contratos_subir_firmado__contrato_id__post"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/contratos/renovar/{contrato_id}": {
      "post": {
        "tags": [
          "Contratos"
        ],
        "summary": "Renovar Contrato",
        "operationId": "renovar_contrato_contratos_renovar__contrato_id__post",
        "parameters": [
          {
            "name": "contrato_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Contrato Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/contratos/enviar/{contrato_id}": {
      "post": {
        "tags": [
          "Contratos"
        ],
        "summary": "Enviar Contrato Email",
        "operationId": "enviar_contrato_email_contratos_enviar__contrato_id__post",
        "parameters": [
          {
            "name": "contrato_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Contrato Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/EnviarEmailSchema"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/contratos/": {
      "get": {
        "tags": [
          "Contratos"
        ],
        "summary": "Listar O Filtrar Contratos",
        "operationId": "listar_o_filtrar_contratos_contratos__get",
        "parameters": [
          {
            "name": "lead_id",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "title": "Lead Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/contratos-generar/generar/{lead_id}": {
      "post": {
        "tags": [
          "Generar Contratos"
        ],
        "summary": "Generar Contrato",
        "operationId": "generar_contrato_contratos_generar_generar__lead_id__post",
        "parameters": [
          {
            "name": "lead_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Lead Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ContratoCreate"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/tecnicos/{tecnico_id}/mi-calendario": {
      "get": {
        "tags": [
          "Calendario Técnico"
        ],
        "summary": "Mi Calendario",
        "operationId": "mi_calendario_tecnicos__tecnico_id__mi_calendario_get",
        "parameters": [
          {
            "name": "tecnico_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "title": "Tecnico Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/dashboard": {
      "get": {
        "tags": [
          "Dashboard"
        ],
        "summary": "Dashboard",
        "operationId": "dashboard_api_dashboard_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          }
        }
      }
    },
    "/": {
      "get": {
        "summary": "Root",
        "operationId": "root__get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "AlarmaCreate": {
        "properties": {
          "tipo": {
            "type": "string",
            "title": "Tipo"
          },
          "descripcion": {
            "type": "string",
            "title": "Descripcion"
          },
          "cliente_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Cliente Id"
          }
        },
        "type": "object",
        "required": [
          "tipo",
          "descripcion"
        ],
        "title": "AlarmaCreate"
      },
      "AlarmaResponse": {
        "properties": {
          "tipo": {
            "type": "string",
            "title": "Tipo"
          },
          "descripcion": {
            "type": "string",
            "title": "Descripcion"
          },
          "cliente_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Cliente Id"
          },
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "estado": {
            "type": "string",
            "title": "Estado"
          },
          "fecha": {
            "type": "string",
            "format": "date-time",
            "title": "Fecha"
          }
        },
        "type": "object",
        "required": [
          "tipo",
          "descripcion",
          "id",
          "estado",
          "fecha"
        ],
        "title": "AlarmaResponse"
      },
      "AuthCreate": {
        "properties": {
          "usuario": {
            "type": "string",
            "title": "Usuario"
          },
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          },
          "password": {
            "type": "string",
            "title": "Password"
          },
          "rol": {
            "type": "string",
            "title": "Rol",
            "default": "cliente"
          },
          "empresa": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Empresa"
          }
        },
        "type": "object",
        "required": [
          "usuario",
          "email",
          "password"
        ],
        "title": "AuthCreate"
      },
      "AuthLogin": {
        "properties": {
          "usuario": {
            "type": "string",
            "title": "Usuario"
          },
          "password": {
            "type": "string",
            "title": "Password"
          }
        },
        "type": "object",
        "required": [
          "usuario",
          "password"
        ],
        "title": "AuthLogin"
      },
      "AuthResponse": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "usuario": {
            "type": "string",
            "title": "Usuario"
          },
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          },
          "rol": {
            "type": "string",
            "title": "Rol"
          },
          "empresa": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Empresa"
          },
          "estado": {
            "type": "string",
            "title": "Estado"
          }
        },
        "type": "object",
        "required": [
          "id",
          "usuario",
          "email",
          "rol",
          "empresa",
          "estado"
        ],
        "title": "AuthResponse"
      },
      "Body_subir_contrato_firmado_contratos_subir_firmado__contrato_id__post": {
        "properties": {
          "archivo": {
            "type": "string",
            "contentMediaType": "application/octet-stream",
            "title": "Archivo"
          }
        },
        "type": "object",
        "required": [
          "archivo"
        ],
        "title": "Body_subir_contrato_firmado_contratos_subir_firmado__contrato_id__post"
      },
      "CitaCreate": {
        "properties": {
          "cliente_id": {
            "type": "integer",
            "title": "Cliente Id"
          },
          "fecha": {
            "type": "string",
            "format": "date-time",
            "title": "Fecha"
          },
          "motivo": {
            "type": "string",
            "title": "Motivo"
          },
          "ticket_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Ticket Id"
          }
        },
        "type": "object",
        "required": [
          "cliente_id",
          "fecha",
          "motivo"
        ],
        "title": "CitaCreate"
      },
      "CitaResponse": {
        "properties": {
          "fecha": {
            "type": "string",
            "format": "date",
            "title": "Fecha"
          },
          "hora_inicio": {
            "anyOf": [
              {
                "type": "string",
                "format": "time"
              },
              {
                "type": "null"
              }
            ],
            "title": "Hora Inicio"
          },
          "hora_fin": {
            "anyOf": [
              {
                "type": "string",
                "format": "time"
              },
              {
                "type": "null"
              }
            ],
            "title": "Hora Fin"
          },
          "estado": {
            "type": "string",
            "title": "Estado",
            "default": "pendiente"
          },
          "motivo": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Motivo"
          },
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "tecnico_id": {
            "type": "integer",
            "title": "Tecnico Id"
          },
          "cliente_id": {
            "type": "integer",
            "title": "Cliente Id"
          },
          "ticket_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Ticket Id"
          }
        },
        "type": "object",
        "required": [
          "fecha",
          "id",
          "tecnico_id",
          "cliente_id",
          "ticket_id"
        ],
        "title": "CitaResponse"
      },
      "ClienteCreate": {
        "properties": {
          "nombre": {
            "type": "string",
            "title": "Nombre"
          },
          "email": {
            "type": "string",
            "title": "Email"
          },
          "empresa": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Empresa"
          },
          "telefono": {
            "type": "string",
            "maxLength": 15,
            "minLength": 8,
            "pattern": "^\\+?\\d[\\d\\s]{7,14}$",
            "title": "Telefono"
          },
          "servicios": {
            "items": {
              "type": "integer"
            },
            "type": "array",
            "title": "Servicios",
            "default": []
          },
          "lead_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Lead Id"
          },
          "preferencia": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Preferencia"
          }
        },
        "type": "object",
        "required": [
          "nombre",
          "email",
          "telefono"
        ],
        "title": "ClienteCreate"
      },
      "ClienteResponse": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "nombre": {
            "type": "string",
            "title": "Nombre"
          },
          "email": {
            "type": "string",
            "title": "Email"
          },
          "telefono": {
            "type": "string",
            "maxLength": 15,
            "minLength": 8,
            "pattern": "^\\+?\\d[\\d\\s]{7,14}$",
            "title": "Telefono"
          },
          "empresa": {
            "type": "string",
            "title": "Empresa"
          },
          "servicio": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Servicio"
          },
          "estado": {
            "type": "string",
            "title": "Estado"
          },
          "lead_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Lead Id"
          },
          "preferencia": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Preferencia"
          }
        },
        "type": "object",
        "required": [
          "id",
          "nombre",
          "email",
          "telefono",
          "empresa",
          "estado"
        ],
        "title": "ClienteResponse"
      },
      "ContratoCreate": {
        "properties": {
          "servicios": {
            "items": {
              "type": "integer"
            },
            "type": "array",
            "title": "Servicios"
          },
          "duracion": {
            "type": "string",
            "title": "Duracion"
          },
          "politicas": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Politicas"
          },
          "correo_envio": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Correo Envio"
          },
          "cliente_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Cliente Id"
          }
        },
        "type": "object",
        "required": [
          "servicios",
          "duracion"
        ],
        "title": "ContratoCreate"
      },
      "DisponibilidadCreate": {
        "properties": {
          "fecha": {
            "type": "string",
            "format": "date",
            "title": "Fecha"
          },
          "hora_inicio": {
            "type": "string",
            "format": "time",
            "title": "Hora Inicio"
          },
          "hora_fin": {
            "type": "string",
            "format": "time",
            "title": "Hora Fin"
          },
          "descripcion": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Descripcion"
          }
        },
        "type": "object",
        "required": [
          "fecha",
          "hora_inicio",
          "hora_fin"
        ],
        "title": "DisponibilidadCreate"
      },
      "DisponibilidadResponse": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "tecnico_id": {
            "type": "integer",
            "title": "Tecnico Id"
          },
          "fecha": {
            "type": "string",
            "format": "date",
            "title": "Fecha"
          },
          "hora_inicio": {
            "type": "string",
            "format": "time",
            "title": "Hora Inicio"
          },
          "hora_fin": {
            "type": "string",
            "format": "time",
            "title": "Hora Fin"
          },
          "estado": {
            "type": "string",
            "title": "Estado"
          },
          "descripcion": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Descripcion"
          }
        },
        "type": "object",
        "required": [
          "id",
          "tecnico_id",
          "fecha",
          "hora_inicio",
          "hora_fin",
          "estado"
        ],
        "title": "DisponibilidadResponse"
      },
      "EnviarEmailSchema": {
        "properties": {
          "correo": {
            "type": "string",
            "format": "email",
            "title": "Correo"
          }
        },
        "type": "object",
        "required": [
          "correo"
        ],
        "title": "EnviarEmailSchema"
      },
      "EventoResponse": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "titulo": {
            "type": "string",
            "title": "Titulo"
          },
          "fecha": {
            "type": "string",
            "format": "date-time",
            "title": "Fecha"
          },
          "tipo": {
            "type": "string",
            "title": "Tipo"
          }
        },
        "type": "object",
        "required": [
          "id",
          "titulo",
          "fecha",
          "tipo"
        ],
        "title": "EventoResponse"
      },
      "HTTPValidationError": {
        "properties": {
          "detail": {
            "items": {
              "$ref": "#/components/schemas/ValidationError"
            },
            "type": "array",
            "title": "Detail"
          }
        },
        "type": "object",
        "title": "HTTPValidationError"
      },
      "LeadCreate": {
        "properties": {
          "contacto": {
            "type": "string",
            "title": "Contacto"
          },
          "correo": {
            "type": "string",
            "format": "email",
            "title": "Correo"
          },
          "telefono": {
            "type": "string",
            "maxLength": 15,
            "minLength": 8,
            "pattern": "^\\+?\\d[\\d\\s]{7,14}$",
            "title": "Telefono"
          },
          "mensaje": {
            "type": "string",
            "title": "Mensaje"
          }
        },
        "type": "object",
        "required": [
          "contacto",
          "correo",
          "telefono",
          "mensaje"
        ],
        "title": "LeadCreate"
      },
      "LeadResponse": {
        "properties": {
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "contacto": {
            "type": "string",
            "title": "Contacto"
          },
          "correo": {
            "type": "string",
            "format": "email",
            "title": "Correo"
          },
          "telefono": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Telefono",
            "default": ""
          },
          "empresa": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Empresa",
            "default": ""
          },
          "mensaje": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Mensaje",
            "default": ""
          },
          "estado": {
            "type": "string",
            "title": "Estado"
          }
        },
        "type": "object",
        "required": [
          "id",
          "contacto",
          "correo",
          "estado"
        ],
        "title": "LeadResponse"
      },
      "ServicioCreate": {
        "properties": {
          "nombre": {
            "type": "string",
            "title": "Nombre"
          },
          "descripcion": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Descripcion"
          },
          "precio": {
            "type": "number",
            "title": "Precio"
          },
          "activo": {
            "type": "boolean",
            "title": "Activo",
            "default": true
          }
        },
        "type": "object",
        "required": [
          "nombre",
          "precio"
        ],
        "title": "ServicioCreate"
      },
      "ServicioResponse": {
        "properties": {
          "nombre": {
            "type": "string",
            "title": "Nombre"
          },
          "descripcion": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Descripcion"
          },
          "precio": {
            "type": "number",
            "title": "Precio"
          },
          "activo": {
            "type": "boolean",
            "title": "Activo",
            "default": true
          },
          "id": {
            "type": "integer",
            "title": "Id"
          }
        },
        "type": "object",
        "required": [
          "nombre",
          "precio",
          "id"
        ],
        "title": "ServicioResponse"
      },
      "ServicioUpdate": {
        "properties": {
          "nombre": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Nombre"
          },
          "descripcion": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Descripcion"
          },
          "precio": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Precio"
          },
          "activo": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Activo"
          }
        },
        "type": "object",
        "title": "ServicioUpdate"
      },
      "TecnicoCreate": {
        "properties": {
          "nombre": {
            "type": "string",
            "title": "Nombre"
          },
          "especialidad": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Especialidad"
          },
          "descripcion": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Descripcion"
          },
          "email": {
            "type": "string",
            "title": "Email"
          },
          "password": {
            "type": "string",
            "title": "Password"
          }
        },
        "type": "object",
        "required": [
          "nombre",
          "email",
          "password"
        ],
        "title": "TecnicoCreate"
      },
      "TecnicoResponse": {
        "properties": {
          "nombre": {
            "type": "string",
            "title": "Nombre"
          },
          "especialidad": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Especialidad"
          },
          "descripcion": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Descripcion"
          },
          "email": {
            "type": "string",
            "title": "Email"
          },
          "disponible": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Disponible",
            "default": "disponible"
          },
          "id": {
            "type": "integer",
            "title": "Id"
          }
        },
        "type": "object",
        "required": [
          "nombre",
          "email",
          "id"
        ],
        "title": "TecnicoResponse"
      },
      "TicketCreate": {
        "properties": {
          "cliente_id": {
            "type": "integer",
            "title": "Cliente Id"
          },
          "tecnico_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Tecnico Id"
          },
          "tipo": {
            "type": "string",
            "title": "Tipo"
          },
          "descripcion": {
            "type": "string",
            "title": "Descripcion"
          }
        },
        "type": "object",
        "required": [
          "cliente_id",
          "tipo",
          "descripcion"
        ],
        "title": "TicketCreate"
      },
      "TicketResponse": {
        "properties": {
          "cliente_id": {
            "type": "integer",
            "title": "Cliente Id"
          },
          "tecnico_id": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Tecnico Id"
          },
          "tipo": {
            "type": "string",
            "title": "Tipo"
          },
          "descripcion": {
            "type": "string",
            "title": "Descripcion"
          },
          "id": {
            "type": "integer",
            "title": "Id"
          },
          "estado": {
            "type": "string",
            "title": "Estado"
          },
          "creado_en": {
            "type": "string",
            "format": "date-time",
            "title": "Creado En"
          }
        },
        "type": "object",
        "required": [
          "cliente_id",
          "tipo",
          "descripcion",
          "id",
          "estado",
          "creado_en"
        ],
        "title": "TicketResponse"
      },
      "ValidationError": {
        "properties": {
          "loc": {
            "items": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            },
            "type": "array",
            "title": "Location"
          },
          "msg": {
            "type": "string",
            "title": "Message"
          },
          "type": {
            "type": "string",
            "title": "Error Type"
          },
          "input": {
            "title": "Input"
          },
          "ctx": {
            "type": "object",
            "title": "Context"
          }
        },
        "type": "object",
        "required": [
          "loc",
          "msg",
          "type"
        ],
        "title": "ValidationError"
      }
    }
  }
}
```