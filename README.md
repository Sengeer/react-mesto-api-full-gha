<h1 align="center">Место</h1>

SPA приложение на библиотекe React, включающее фронтенд и бэкенд части приложения. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`. 

![Место](https://github.com/Sengeer/react-mesto-api-full-gha/assets/63221404/9af5cbb4-ccd7-40f4-8eea-e7d3a5a0dd9d)

## Функции проекта

- Авторизация и регистрация пользователей;
<img width="898" alt="Место. Авторизация и регистрация" src="https://github.com/Sengeer/react-mesto-api-full-gha/assets/63221404/7aeddb77-bd75-4cdb-859d-f37bbc05abd2">

- Операции с карточками и пользователями;
- Открытие изображений в всплывающем окне;
- Валидация всех форм / UX при работе с всплывающими окнами с помощью кастомного хука;
- Реализована адаптивная вёрстка;

**В проекте применен БЭМ подход.** Он позволяет снизить сложность и улучшить читабельность кода, а также сделать его более структурированным.

**API и общение с сервером.** Было разработано API для получения информации о карточках и пользователе с сервера. Для общения с сервером используется технология FETCH. Карточки и пользователь сохраняются на сервере с использованием методов HTTP: GET, POST, PUT, DELETE.

**Проект собран с помощью webpack.** Он позволяет минифицировать код и добавить вендорные префиксы.
## Инструкция по развёртыванию

1. Сохраните проект на компьютер\
&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/Sengeer/react-mesto-api-full-gha/assets/63221404/095944c8-a36e-4745-8530-3ef68b1b9a23" alt="Сохранить на компьютер" width="106" />
2. Установите зависимости в директориях `/backend` и `/frontend` командой `npm i`
3. Запустите поочерёдно, сначала `/backend`, потом `/frontend` командой `npm run start`
4. Нажмите `Y` чтобы согласится запустить фронтенд на порту 3001
5. Приложение будет доступно из браузера по адресу `http://localhost:3001`, API по адресу `http://localhost:3000`

## Технологический стек

**Front-end:** HTML, CSS, JS, React, Webpack

**Back-end:** Node.js, Express, API, Webpack



## Автор

- [@Sengeer](https://vk.com/sergey.polenov/)

