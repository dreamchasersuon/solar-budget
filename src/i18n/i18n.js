import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// eslint-disable-next-line import/no-namespace
import * as Localization from 'expo-localization';

export const locale = Localization.locale;
export const supportedLanguages = ['en', 'ru'];
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
    },
    ChangePinScreen: {
      newPinText: 'New PIN-CODE',
      oldPinText: 'Old PIN-CODE'
    },
    FingerprintScreen: {
      headerTitle: 'Use fingerprint to login?',
      headerNote:
        'Use your fingerprint for faster and easier access to your account.',
      useFingerprintButtonLabel: 'Enable',
      useFingerprintLaterButtonLabel: 'Later'
    },
    ForgotPasswordScreen: {
      headerTitleStartReminder: 'Reset password',
      headerNoteStartReminder: 'Enter your login',
      headerTitleSuccessReminder: 'Password reset',
      headerNoteSuccessReminder: 'To update the password, click on the button',
      loginInputLabel: 'Login',
      loginInputText: 'Enter login',
      remindPasswordButton: 'Remind password',
      updatePasswordButton: 'Update password'
    },
    LoginCredentialsScreen: {
      headerTitle: 'Good evening',
      headerNote:
        'Log in with your username and password. If you forgot your password - use the form',
      headerExtendedNote: 'password recovery',
      loginInputLabel: 'Login',
      loginInputText: 'Enter login',
      passwordInputLabel: 'Password',
      passwordInputText: 'Enter password',
      loginButtonLabel: 'Login',
      redirectToRemindPasswordText: 'Forgot password?'
    },
    SelectAccountScreen: {
      headerTitle: 'Select account'
    },
    ValidatePinCodeScreen: {
      headerTitle: 'Enter PIN-CODE'
    },
    ChangeLanguageScreen: {
      englishLanguage: 'English',
      russianLanguage: 'Russian'
    },
    RatesScreen: {
      screenName: 'Exchange rates',
      ratesNotSelectedNote:
        'No exchange rates selected. To select a course, click on the button below'
    },
    SettingsScreen: {
      screenName: 'Settings',
      mainHeaderTitle: 'Main',
      languageSettings: 'Language',
      cloudSettings: 'Cloud copy',
      inviteFriendSettings: 'Invite a partner',
      themeSettings: 'Switch theme',
      securityHeaderTitle: 'Security',
      enableFingerprintSettings: 'Enable Fingerprint',
      changeLoginSettings: 'Change login',
      changePasswordSettings: 'Change password',
      changePinSettings: 'Change PIN-CODE',
      feedbackHeaderTitle: 'Feedback',
      rateUsSettings: 'Rate us',
      techSupportSettings: 'Technical support',
      termsOfUseSettings: 'Terms of use',
      privacyPolicySettings: 'Privacy policy',
      logoutButtonLabel: 'Logout'
    },
    TargetsScreen: {
      screenName: 'Targets',
      noteToCreateTargetText:
        'Create a target using the plus button in the upper right corner',
      noteToAddPayment:
        'The target has no payments. To create a payment for a target, you must specify the name of the target in the "Purpose" field of the transaction',
      transactionAboutText: 'Payment to target'
    },
    WalletScreen: {
      screenName: 'Wallet',
      noteToCreateBill:
        'To use the wallet, create an bill using the plus button in the upper right corner',
      noteAboutTransactions:
        'Billing history is clean. To add a payment - click on the button below'
    },
    HOCSideScreen: {
      headerTitle:
        'Keep track of your finances and fulfill your dreams with us',
      termsOfUseButtonLabel: 'Terms of use',
      privacyPolicyButtonLabel: 'Privacy policy',
      giveFeedbackButtonLabel: 'Give feedback',
      techSupportButtonLabel: 'Technical support',
      donationButtonLabel: 'Donation'
    },
    ModalCreateBill: {
      headerTitle: 'Bill',
      selectCurrencyLabel: 'Currency',
      selectCurrencyTextRub: 'Rubles',
      selectCurrencyTextUsd: 'Dollars',
      selectCurrencyTextEur: 'Euro',
      billAmountLabel: 'Amount',
      createBillButtonLabel: 'Create'
    },
    ModalCreateRatePair: {
      headerTitle: 'Currency pair',
      ratePairNote: 'Price'
    },
    ModalCreateTarget: {
      headerTitle: 'Target',
      targetNameInputLabel: 'Name',
      targetNameInputText: 'Write the name of the target',
      currencyCheckBoxesLabel: 'Currency',
      currencyCheckBoxRUBText: 'Rubles',
      currencyCheckBoxUSDText: 'Dollars',
      currencyCheckBoxEURText: 'Euro',
      amountLabel: 'Amount',
      createButtonLabel: 'Create'
    },
    ModalCreateTransaction: {
      descriptionInitialText: 'Description',
      headerTitle: 'Transaction',
      purposeInputLabel: 'Purpose',
      purposeInputDefaultText: 'Choose purpose',
      descriptionInputLabel: 'Description',
      descriptionInputText: 'Add description',
      dateAndTimeLabel: 'Date and time',
      amountLabel: 'Amount',
      operationTypeIncomeText: 'Income',
      operationTypeOutcomeText: 'Outcome',
      createButtonLabel: 'Create'
    },
    ModalUpdateLogin: {
      headerTitle: 'Login change',
      loginInputLabel: 'New login',
      loginInputText: 'Enter new login',
      updateButtonLabel: 'Update'
    },
    ModalUpdatePassword: {
      headerTitle: 'Password change',
      passwordInputLabel: 'New password',
      passwordInputText: 'Enter new password',
      confirmPasswordInputLabel: 'Confirm password',
      confirmPasswordInputText: 'Password confirmation',
      updateButtonLabel: 'Update'
    },
    ModalValidatePassword: {
      headerTitle: 'Confirm password',
      loginInputLabel: 'Last password',
      loginInputText: 'Enter last password',
      updateButtonLabel: 'Update'
    },
    ApplicationMessages: {
      passwordRecoveryMsg: 'Password recovery',
      passwordRecoveryMsgNote: 'Your new password is:',
      fingerprintScanningEnabledMsg: 'Scan started',
      fingerprintScanningEnabledMsgNote:
        'Please attach a fingerprint to the sensor'
    },
    ApplicationSuccessMessages: {
      sendNewPasswordMsg: 'Sent a new password',
      sendNewPasswordMsgNote: 'Wait for notification from the application',
      fingerprintRecognizedMsg: 'Fingerprint recognized',
      userFoundedMsg: 'User found',
      passwordUpdatedMsg: 'Password updated',
      pinAcceptedMsg: 'PIN-CODE accepted',
      pinUpdatedMsg: 'PIN-CODE updated',
      setLocaleSuccessMsg: 'Language changed'
    },
    ApplicationErrorMessages: {
      wrongPinMsg: 'Wrong PIN-CODE',
      wrongPinMsgNote: 'Please, try again',
      cameraPermissionsMsg: 'Rejected',
      cameraPermissionsMsgNote:
        'Access to the camera and gallery is required to download the image',
      fingerprintNotConfiguredMsg: 'Fingerprint not configured',
      fingerprintNotConfiguredMsgNote:
        'Log in in another way and enable fingerprint authentication in the settings',
      fingerprintNotRecognizedMsg: 'Fingerprint not recognized',
      fingerprintNotRecognizedMsgNote: 'Please, try to scan again',
      notSupportedMsg: 'Incompatible device',
      notSupportedFingerprintMsgNote:
        'This device does not have the ability to scan a fingerprint',
      loginNotEnteredMsg: 'Enter login',
      wrongLoginMsg: 'Wrong login',
      passwordNotEnteredMsg: 'Enter password',
      passwordsNotMatchMsg: "Passwords don't match",
      userNotFoundMsg: 'User not found',
      loginIsBusyMsg: 'Sorry, this login is already taken',
      setLocaleFailedMsg: 'Change language failed'
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
        'Получайте точные статистические данные по вашему бюджету в реальном времени',
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
    },
    ChangePinScreen: {
      newPinText: 'Новый PIN-CODE',
      oldPinText: 'Старый PIN-CODE'
    },
    FingerprintScreen: {
      headerTitle: 'Использовать отпечаток пальца для входа?',
      headerNote:
        'Используйте отпечаток пальца для более быстрого и легкого доступа к своей учетной записи',
      useFingerprintButtonLabel: 'Использовать',
      useFingerprintLaterButtonLabel: 'Позже'
    },
    ForgotPasswordScreen: {
      headerTitleStartReminder: 'Восстановление пароля',
      headerNoteStartReminder: 'Введите логин',
      headerTitleSuccessReminder: 'Пароль восстановлен',
      headerNoteSuccessReminder: 'Для обновления пароля нажмите на кнопку',
      loginInputLabel: 'Логин',
      loginInputText: 'Введите логин',
      remindPasswordButton: 'Напомнить пароль',
      updatePasswordButton: 'Обновить'
    },
    LoginCredentialsScreen: {
      headerTitle: 'Добрый вечер',
      headerNote:
        'Войдите с помощью логина и пароля. Если вы забыли пароль - воспользуйтесь формой',
      headerExtendedNote: 'восстановления пароля',
      loginInputLabel: 'Логин',
      loginInputText: 'Введите логин',
      passwordInputLabel: 'Пароль',
      passwordInputText: 'Введите пароль',
      loginButtonLabel: 'Войти',
      redirectToRemindPasswordText: 'Забыли пароль?'
    },
    SelectAccountScreen: {
      headerTitle: 'Выберите аккаунт'
    },
    ValidatePinScreen: {
      headerTitle: 'Введите PIN-CODE'
    },
    ChangeLanguageScreen: {
      englishLanguage: 'Английский',
      russianLanguage: 'Русский'
    },
    RatesScreen: {
      screenName: 'Курсы валют',
      ratesNotSelectedNote:
        'Курсы валют не выбраны. Для выбора курса нажмите на кнопку снизу'
    },
    SettingsScreen: {
      screenName: 'Настройки',
      mainHeaderTitle: 'Основные',
      languageSettings: 'Язык',
      cloudSettings: 'Облачная копия',
      inviteFriendSettings: 'Пригласить партнера',
      themeSettings: 'Переключить тему',
      securityHeaderTitle: 'Безопасность',
      enableFingerprintSettings: 'Использовать отпечаток пальца',
      changeLoginSettings: 'Изменить логин',
      changePasswordSettings: 'Изменить пароль',
      changePinSettings: 'Изменить PIN-CODE',
      feedbackHeaderTitle: 'Обратная связь',
      rateUsSettings: 'Оценить приложение',
      techSupportSettings: 'Техническая поддержка',
      termsOfUseSettings: 'Условия использования',
      privacyPolicySettings: 'Политика конфиденциальности',
      logoutButtonLabel: 'Выйти'
    },
    TargetsScreen: {
      screenName: 'Цели',
      noteToCreateTargetText:
        'Создайте цель с помощью кнопки с плюсом в правом верхнем углу',
      noteToAddPayment:
        'У цели нет ни одного платежа. Для создания платежа по цели необходимо указать название цели в поле "Назначение" транзакции',
      transactionAboutText: 'Платеж по цели'
    },
    WalletScreen: {
      screenName: 'Кошелёк',
      noteToCreateBill:
        'Для использования кошелька создайте счет с помощью кнопки с плюсом в правом верхнем углу',
      noteAboutTransactions:
        'Платежная история чиста. Чтобы добавить платеж - нажмите на кнопку снизу'
    },
    HOCSideScreen: {
      headerTitle:
        'Следите за своими финансами и исполняйте мечты вместе с нами',
      termsOfUseButtonLabel: 'Условия и положения',
      privacyPolicyButtonLabel: 'Политика конфиденциальности',
      giveFeedbackButtonLabel: 'Оставить отзыв',
      techSupportButtonLabel: 'Техническая поддержка',
      donationButtonLabel: 'Пожертвование'
    },
    ModalCreateBill: {
      headerTitle: 'Счет',
      selectCurrencyLabel: 'Валюта',
      selectCurrencyTextRub: 'Рубли',
      selectCurrencyTextUsd: 'Доллары',
      selectCurrencyTextEur: 'Евро',
      billAmountLabel: 'Сумма',
      createBillButtonLabel: 'Создать'
    },
    ModalCreateRatePair: {
      headerTitle: 'Валютная пара',
      ratePairNote: 'Цена'
    },
    ModalCreateTarget: {
      headerTitle: 'Цель',
      targetNameInputLabel: 'Название',
      targetNameInputText: 'Напишите название цели',
      currencyCheckBoxesLabel: 'Валюта',
      currencyCheckBoxRUBText: 'Рубли',
      currencyCheckBoxUSDText: 'Доллары',
      currencyCheckBoxEURText: 'Евро',
      amountLabel: 'Сумма',
      createButtonLabel: 'Создать'
    },
    ModalCreateTransaction: {
      descriptionInitialText: 'Описание',
      headerTitle: 'Транзакция',
      purposeInputLabel: 'Назначение',
      purposeInputDefaultText: 'Выберите назначение',
      descriptionInputLabel: 'Описание',
      descriptionInputText: 'Добавьте описание',
      dateAndTimeLabel: 'Дата и время',
      amountLabel: 'Сумма',
      operationTypeIncomeText: 'Доход',
      operationTypeOutcomeText: 'Расход',
      createButtonLabel: 'Создать'
    },
    ModalUpdateLogin: {
      headerTitle: 'Изменение логина',
      loginInputLabel: 'Новый логин',
      loginInputText: 'Введите новый логин',
      updateButtonLabel: 'Обновить'
    },
    ModalUpdatePassword: {
      headerTitle: 'Изменение пароля',
      passwordInputLabel: 'Новый пароль',
      passwordInputText: 'Введите новый пароль',
      confirmPasswordInputLabel: 'Подтвердите пароль',
      confirmPasswordInputText: 'Подтверждение пароля',
      updateButtonLabel: 'Обновить'
    },
    ModalValidatePassword: {
      headerTitle: 'Подтвердите пароль',
      passwordInputLabel: 'Старый пароль',
      passwordInputText: 'Введите старый пароль',
      validateButtonLabel: 'Проверить'
    },
    ApplicationMessages: {
      passwordRecoveryMsg: 'Восстановление пароля',
      passwordRecoveryMsgNote: 'Ваш пароль:',
      fingerprintScanningEnabledMsg: 'Сканирование запущено',
      fingerprintScanningEnabledMsgNote:
        'Пожалуйста, приложите отпечаток пальца к сенсору'
    },
    ApplicationSuccessMessages: {
      sendNewPasswordMsg: 'Отправили новый пароль',
      sendNewPasswordMsgNote: 'Дождитесь уведомления от приложения',
      fingerprintRecognizedMsg: 'Отпечаток распознан',
      userFoundedMsg: 'Пользователь найден',
      passwordUpdatedMsg: 'Пароль обновлён',
      pinAcceptedMsg: 'PIN-CODE подтверждён',
      pinUpdatedMsg: 'PIN-CODE  обновлён',
      setLocaleSuccessMsg: 'Язык изменён'
    },
    ApplicationErrorMessages: {
      wrongPinMsg: 'Неверный PIN-CODE',
      wrongPinMsgNote: 'Попробуйте еще раз',
      cameraPermissionsMsg: 'Отклонено',
      cameraPermissionsMsgNote:
        'Для загрузки изображения необходим доступ к камере и галерее',
      fingerprintNotConfiguredMsg: 'Отпечаток не настроен',
      fingerprintNotConfiguredMsgNote:
        'Авторизуйтесь другим способом и включите авторизацию по отпечатку пальца в настройках',
      fingerprintNotRecognizedMsg: 'Отпечаток не распознан',
      fingerprintNotRecognizedMsgNote: 'Попробуйте отсканировать еще раз',
      notSupportedMsg: 'Несовместимое устройство',
      notSupportedFingerprintMsgNote:
        'На данном устройстве нет возможности сканирования отпечатка пальца',
      loginNotEnteredMsg: 'Введите логин',
      wrongLoginMsg: 'Неверный логин',
      passwordNotEnteredMsg: 'Введите пароль',
      passwordsNotMatchMsg: 'Пароли не совпадают',
      userNotFoundMsg: 'Пользователь не найден',
      loginIsBusyMsg: 'Данный логин уже занят',
      setLocaleFailedMsg: 'Изменить язык не удалось'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: locale,
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
