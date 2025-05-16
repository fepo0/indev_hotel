import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Surface, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from '../services/auth';
import { RegisterCredentials } from '../types';
import { useUser } from '../contexts/UserContext';

const { width } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите корректный email')
    .required('Email обязателен'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .required('Пароль обязателен'),
  confirmPassword: Yup.string()
    .when('$isRegistration', {
      is: true,
      then: (schema) => schema
        .required('Подтверждение пароля обязательно')
        .test('passwords-match', 'Пароли должны совпадать', function(value) {
          return this.parent.password === value;
        }),
      otherwise: (schema) => schema.notRequired(),
    }),
});

type RootStackParamList = {
  AdminDashboard: undefined;
  UserDashboard: undefined;
  AdditionalInfo: {
    email: string;
    password: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RegistrationScreen = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { setUser } = useUser();

  const handleSubmit = async (values: RegisterCredentials) => {
    console.log('Начало отправки формы:', values);
    setSubmitted(true);
    setError(null);
    setLoading(true);

    try {
      console.log('Попытка регистрации/входа...');
      const response = hasAccount
        ? await authService.login(values)
        : await authService.register(values);

      console.log('Успешный ответ:', response);
      
      // Сохраняем данные пользователя в контексте
      setUser(response.user);

      if (response.user.role === 'admin') {
        console.log('Перенаправление на админ-панель');
        navigation.replace('AdminDashboard');
      } else if (hasAccount) {
        console.log('Перенаправление на панель пользователя');
        navigation.replace('UserDashboard');
      } else {
        console.log('Перенаправление на дополнительную информацию');
        navigation.navigate('AdditionalInfo', {
          email: values.email,
          password: values.password,
        });
      }
    } catch (err) {
      console.error('Ошибка при отправке формы:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка при отправке формы');
    } finally {
      setLoading(false);
    }
  };

  const validatePasswords = (values: any) => {
    if (!hasAccount && values.password !== values.confirmPassword) {
      return { confirmPassword: 'Пароли должны совпадать' };
    }
    return {};
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>
          {hasAccount ? 'Вход в систему' : 'Регистрация'}
        </Text>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          validate={validatePasswords}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          validationContext={{ isRegistration: !hasAccount }}
          enableReinitialize={true}
          key={hasAccount ? 'login' : 'register'}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, resetForm }) => {
            console.log('Состояние формы:', {
              values,
              errors,
              touched,
              isValid,
              validationErrors: Object.keys(errors).length > 0 ? errors : 'Нет ошибок валидации'
            });

            const hasErrors = Object.keys(errors).length > 0;
            const isFormValid = isValid && !hasErrors;

            return (
              <View style={styles.form}>
                <TextInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  style={styles.input}
                  error={touched.email && !!errors.email}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  outlineColor="#374151"
                  activeOutlineColor="#7C3AED"
                  disabled={loading}
                  autoComplete={hasAccount ? "email" : "new-password"}
                  textContentType={hasAccount ? "emailAddress" : "none"}
                  autoCorrect={false}
                  textColor="#F9FAFB"
                  placeholderTextColor="#9CA3AF"
                />
                {touched.email && errors.email && (
                  <HelperText type="error" visible={true} style={styles.errorText}>
                    {errors.email}
                  </HelperText>
                )}

                <TextInput
                  label="Пароль"
                  value={values.password}
                  onChangeText={(text) => {
                    handleChange('password')(text);
                    if (values.confirmPassword) {
                      handleBlur('confirmPassword')({ target: { name: 'confirmPassword' } });
                    }
                  }}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                  style={styles.input}
                  error={touched.password && !!errors.password}
                  mode="outlined"
                  outlineColor="#374151"
                  activeOutlineColor="#7C3AED"
                  disabled={loading}
                  autoComplete={hasAccount ? "current-password" : "new-password"}
                  textContentType={hasAccount ? "password" : "none"}
                  autoCorrect={false}
                  textColor="#F9FAFB"
                  placeholderTextColor="#9CA3AF"
                />
                {touched.password && errors.password && (
                  <HelperText type="error" visible={true} style={styles.errorText}>
                    {errors.password}
                  </HelperText>
                )}

                {!hasAccount && (
                  <>
                    <TextInput
                      label="Подтвердите пароль"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      secureTextEntry
                      style={styles.input}
                      error={touched.confirmPassword && !!errors.confirmPassword}
                      mode="outlined"
                      outlineColor="#374151"
                      activeOutlineColor="#7C3AED"
                      disabled={loading}
                      autoComplete="new-password"
                      textContentType="none"
                      autoCorrect={false}
                      textColor="#F9FAFB"
                      placeholderTextColor="#9CA3AF"
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <HelperText type="error" visible={true} style={styles.errorText}>
                        {errors.confirmPassword}
                      </HelperText>
                    )}
                  </>
                )}

                {error && (
                  <HelperText type="error" visible={true} style={styles.errorText}>
                    {error}
                  </HelperText>
                )}

                <View style={styles.linkContainer}>
                  <TouchableOpacity 
                    onPress={() => {
                      setHasAccount(!hasAccount);
                      resetForm();
                      setError(null);
                    }} 
                    disabled={loading}
                  >
                    <Text style={[styles.link, loading && styles.disabledLink]}>
                      {hasAccount ? 'Создать новый аккаунт' : 'У меня уже есть аккаунт'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Button
                  mode="contained"
                  onPress={() => {
                    console.log('Нажата кнопка отправки формы');
                    console.log('Значения формы:', values);
                    console.log('Ошибки валидации:', errors);
                    
                    if (!isFormValid) {
                      console.log('Форма невалидна. Ошибки:', errors);
                      return;
                    }

                    if (!hasAccount && values.password !== values.confirmPassword) {
                      return;
                    }

                    handleSubmit();
                  }}
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  loading={loading}
                  disabled={loading}
                >
                  {hasAccount ? 'Войти' : 'Зарегистрироваться'}
                </Button>
              </View>
            );
          }}
        </Formik>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  surface: {
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    width: Math.min(width - 40, 400),
    backgroundColor: '#1F2937',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#F9FAFB',
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#111827',
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
  linkContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  link: {
    color: '#3B82F6',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  disabledLink: {
    opacity: 0.5,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: '#7C3AED',
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 4,
    color: '#F9FAFB',
  },
}); 