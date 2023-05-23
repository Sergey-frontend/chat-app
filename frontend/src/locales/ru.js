export default {
  translation: {
    addChannelModal: {
      header: 'Добавить канал',
      placeholder: 'Введите имя канала',
      cancel: 'Отменить',
      submit: 'Отправить',
      validation: {
        min: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
        required: 'Обязательное поле',
      },
    },
    removeChannelModal: {
      header: 'Удалить канал',
      body: 'Уверены?',
      cancel: 'Отменить',
      delete: 'Удалить',
    },
    renameChannelModal: {
      header: 'Переименовать канал',
      cancel: 'Отменить',
      rename: 'Отправить',
      validation: {
        min: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
        required: 'Обязательное поле',
      },
    },
    loginPage: {
      header: 'Hexlet Chat',
      formHeader: 'Войти',
      placeholderLogin: 'Ваш ник',
      placeholderPassword: 'Пароль',
      submit: 'Войти',
      haveNotAccount: 'Нет аккаунта?',
      link: 'Регистрация',
      validation: {
        required: 'Обязательное поле',
        minUsername: 'Логин должен быть не менее 4-х символов',
        minPassword: 'Пароль должен быть не менее 4-х символов',
        unknown: 'Ошибка соединения',
        wrongData: 'Неверные имя пользователя или пароль',
      },
    },
    chatHeader: {
      title: 'Hexlet Chat',
      logOut: 'Выйти',
    },
    notFoundPage: {
      number: '404',
      danger: 'Opps!',
      notFound: 'Page not found.',
      info: 'The page you’re looking for doesn’t exist.',
      redirect: 'Go Home',
    },
    signUpPage: {
      header: 'Hexlet Chat',
      title: 'Регистрация',
      placeholderName: 'Имя пользователя',
      placeholderPassword: 'Пароль',
      placeholderConfirmPassord: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      alreadyRegistered: 'Уже зарегистрированы?',
      link: 'Авторизуйтесь',
      validation: {
        required: 'Обязательное поле',
        minMaxUsername: 'От 3 до 20 симоволов',
        minPassword: 'Не менее 6 симоволов',
        confirmPassword: 'Пароли должны совпадать',
        unknown: 'Ошибка соединения',
        alreadyReg: 'Пользователь с данным именем уже зарегистрирован',
      },
    },
    channels: {
      id: '#',
      title: 'Каналы',
      plus: '+',
      rename: 'Переименовать',
      delete: 'Удалить',
    },
    messages: {
      id: '#',
      placeholder: 'Введите сообщение...',
      label: 'Новое сообщение',
      send: 'Отправить',
      loading: 'LOADING',
    },
    messagesCount: {
      key_zero: '{{count}} сообщений',
      key_one: '{{count}} сообщение',
      key_few: '{{count}} сообщения',
      key_many: '{{count}} сообщений',
    },
    toast: {
      add: 'Канал создан',
      rename: 'Канал переименован',
      remove: 'Канал удален',
      error: 'Ошибка соединения',
    },
  },
};
