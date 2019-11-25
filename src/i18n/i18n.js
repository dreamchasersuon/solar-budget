import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  en: {
    WelcomeScreen: {
      createAccountLabel: 'Create account',
      loginLabel: 'Login'
    },
    SliderComponent: {
      firstSlideHeaderTitle: 'Analyze statistics',
      firstSlideNote: 'Accurate statistics on your budget currently received',
      secondSlideHeaderTitle: 'Track your transactions',
      secondSlideNote:
        'The control over the receipt and expenditure of funds is completely in your hands',
      thirdSlideHeaderTitle: 'Control your finances',
      thirdSlideNote:
        'Keep a record of your finances. Learn to save your money with'
    },
    CreateAccountScreen: {
      screenName: 'New account',
      headerTitle: 'Anonymity',
      headerNote:
        'Only you can view your data. No binding to social. networks and end-to-end analytics',
      loginInputLabel: 'Login',
      loginInputText: 'Enter login',
      passwordInputLabel: 'Password',
      passwordInputText: 'Create password',
      confirmPasswordInputLabel: 'Confirmation',
      confirmPasswordInputText: 'Confirm password',
      createButtonLabel: 'Create',
      redirectToLoginText: 'LOGIN',
      alreadyRegisteredRedirectText: 'Already registered?'
    },
    LoginPinScreen: {
      greeting: 'Good evening',
      redirectToAuthByLoginAndPasswordText: 'Use login and password',
      redirectToCreateAccountText: 'REGISTER',
      notRegisteredText: 'Not registered?'
    },
    CreatePinScreen: {
      headerTitle: 'Dream up PIN-CODE'
    },
    AcceptPinScreen: {
      headerTitle: 'Confirm PIN-CODE'
    }
  },
  ru: {
    WelcomeScreen: {
      createAccountLabel: 'Создать аккаунт',
      loginLabel: 'Войти'
    },
    SliderComponent: {
      firstSlideHeaderTitle: 'Анализируйте статистику',
      firstSlideNote:
        'Получайте точные статистические данные по вашему бюджету в реальном\n' +
        '          времени',
      secondSlideHeaderTitle: 'Следите за своими операциями',
      secondSlideNote:
        'Контроль за приходом и расходом средств полностью в ваших руках',
      thirdSlideHeaderTitle: 'Контролируйте свои финансы',
      thirdSlideNote:
        'Ведите учет своих финансов. Научитесь сберегать свои деньги вместе с'
    },
    CreateAccountScreen: {
      screenName: 'Новый аккаунт',
      headerTitle: 'Анонимность',
      headerNote:
        'Только вы можете просматривать свои данные. Никакой привязки к соц. сетям и сквозной аналитики',
      loginInputLabel: 'Логин',
      loginInputText: 'Введите логин',
      passwordInputLabel: 'Пароль',
      passwordInputText: 'Создайте пароль',
      confirmPasswordInputLabel: 'Подтверждение',
      confirmPasswordInputText: 'Подтвердите пароль',
      createButtonLabel: 'Создать',
      redirectToLoginText: 'ВОЙТИ',
      alreadyRegisteredRedirectText: 'Уже зарегистрированы?'
    },
    LoginPinScreen: {
      greeting: 'Добрый вечер',
      redirectToAuthByLoginAndPasswordText: 'Используйте логин и пароль',
      redirectToCreateAccountText: 'РЕГИСТРАЦИЯ',
      notRegisteredText: 'Не зарегистрированы?'
    },
    CreatePinScreen: {
      headerTitle: 'Придумайте PIN-CODE'
    },
    AcceptPinScreen: {
      headerTitle: 'Подтвердите PIN-CODE'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
