# Aplicacion para TopTive sobre una eCommerce store

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Los pasos para correr la app son.

- ##Primero:

 Clonar el proyecto de el repositorio : [TopTiveEcommerce](https://github.com/facebook/create-react-app).

- ##Segundo:
    - Abrir el proyecto y 2 consolas :  en una consola ingresar el comando  `cd server` si esta en windows , si no su equivalente a linux, en la otra cosola lo mismo con ### `cd client`.
    - En ambas consolas realizar `npm install`.
  
- ##Tercero: 
    - Correr el comando `npm run db` en la consola del servidor. Esto creara una base de datos Sql llamada TopTive.
    - Correr tanto servidor como client con `npm run start` en el caso del servidor creara las tablas de la Base de datos con el usuario Administrador incluido.

- ##Cuarto (opcional) : (TODAVIA NO IMPLEMENTADO)
    - En el caso de  querer mas  datos en la base por defecto ,abrir una tercera consola  , hacer `cd server` seguido del comando ### `npm run dataCreate`
    

## Tarjeta de prueba para stripe:
    4242424242424242

## Tecnologias usadas:
    - React
    - Nodejs
    - Reacstrap
    - MaterialUI
    - Sequelize


## Puertos:
    Servidor: 8080 por defecto
    Cliente : 3000 por defecto