import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { TextInput, Button, Text, Surface, HelperText, Dialog, Portal } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AdditionalUserInfo } from '../types';

const { width } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  passportNumber: Yup.string()
    .matches(/^[A-Z]{2}\d{7}$/, 'Номер паспорта должен быть в формате MP4000000')
    .required('Номер паспорта обязателен'),
  birthDate: Yup.string()
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Дата должна быть в формате ДД.ММ.ГГГГ')
    .required('Дата рождения обязательна'),
  phoneNumber: Yup.string()
    .matches(/^\+375\d{9}$/, 'Номер телефона должен быть в формате +375XXXXXXXXX')
    .required('Номер телефона обязателен'),
});

type RootStackParamList = {
  AdditionalInfo: {
    email: string;
    password: string;
  };
  UserDashboard: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdditionalInfo'>;
type RouteProps = RouteProp<RootStackParamList, 'AdditionalInfo'>;

export const AdditionalInfoScreen = () => {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formValues, setFormValues] = useState<AdditionalUserInfo | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { email, password } = route.params;

  const handleSubmit = async (values: AdditionalUserInfo) => {
    setFormValues(values);
    setShowDialog(true);
  };

  const handleConfirm = async () => {
    if (!formValues) return;
    
    setLoading(true);
    try {
      // Здесь будет запрос к API для сохранения дополнительной информации
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация запроса
      
      // После успешного сохранения переходим на главную страницу
      navigation.replace('UserDashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setShowDialog(false);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setFormValues(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.surface}>
        <Text style={styles.title}>Дополнительная информация</Text>
        <Formik
          initialValues={{
            passportNumber: '',
            birthDate: '',
            phoneNumber: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <TextInput
                label="Номер паспорта"
                value={values.passportNumber}
                onChangeText={handleChange('passportNumber')}
                onBlur={handleBlur('passportNumber')}
                style={styles.input}
                error={touched.passportNumber && !!errors.passportNumber}
                mode="outlined"
                autoCapitalize="characters"
                outlineColor="#374151"
                activeOutlineColor="#7C3AED"
                disabled={loading}
                placeholder="MP0000000"
                textColor="#F9FAFB"
                placeholderTextColor="#9CA3AF"
              />
              {touched.passportNumber && errors.passportNumber && (
                <HelperText type="error" visible={true}>
                  {errors.passportNumber}
                </HelperText>
              )}

              <TextInput
                label="Дата рождения"
                value={values.birthDate}
                onChangeText={handleChange('birthDate')}
                onBlur={handleBlur('birthDate')}
                style={styles.input}
                error={touched.birthDate && !!errors.birthDate}
                mode="outlined"
                outlineColor="#374151"
                activeOutlineColor="#7C3AED"
                disabled={loading}
                placeholder="ДД.ММ.ГГГГ"
                textColor="#F9FAFB"
                placeholderTextColor="#9CA3AF"
              />
              {touched.birthDate && errors.birthDate && (
                <HelperText type="error" visible={true}>
                  {errors.birthDate}
                </HelperText>
              )}

              <TextInput
                label="Номер телефона"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                style={styles.input}
                error={touched.phoneNumber && !!errors.phoneNumber}
                mode="outlined"
                keyboardType="phone-pad"
                outlineColor="#374151"
                activeOutlineColor="#7C3AED"
                disabled={loading}
                placeholder="+375 (XX) XXX-XX-XX"
                textColor="#F9FAFB"
                placeholderTextColor="#9CA3AF"
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <HelperText type="error" visible={true}>
                  {errors.phoneNumber}
                </HelperText>
              )}

              <Button
                mode="contained"
                onPress={() => handleSubmit()}
                style={styles.button}
                labelStyle={styles.buttonLabel}
                loading={loading}
                disabled={loading}
              >
                Далее
              </Button>
            </View>
          )}
        </Formik>
      </Surface>

      <Portal>
        <Dialog 
          visible={showDialog} 
          onDismiss={handleCancel}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>Согласие на обработку персональных данных</Dialog.Title>
          <Dialog.Content style={styles.dialogContent}>
            <ScrollView 
              style={styles.dialogScrollView}
              indicatorStyle="white"
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollContent}
            >
              <Text style={styles.dialogText}>
                В соответствии со статьей 5 Закона Республики Беларусь от 7 мая 2021 г. № 99-З "О защите персональных данных" я даю согласие на обработку моих персональных данных:
              </Text>
              
              <Text style={styles.dialogSubtitle}>Цель обработки:</Text>
              <Text style={styles.dialogText}>
                • Регистрация и авторизация в системе{'\n'}
                • Предоставление доступа к функционалу системы
              </Text>

              <Text style={styles.dialogSubtitle}>Объем обрабатываемых данных:</Text>
              <Text style={styles.dialogText}>
                • Фамилия, имя, отчество{'\n'}
                • Номер паспорта{'\n'}
                • Дата рождения{'\n'}
                • Номер телефона{'\n'}
                • Адрес электронной почты
              </Text>

              <Text style={styles.dialogSubtitle}>Срок действия согласия:</Text>
              <Text style={styles.dialogText}>
                Согласие действует в течение 3 лет с момента его предоставления или до момента его отзыва.
              </Text>

              <Text style={styles.dialogText}>
                Мне разъяснены права, связанные с обработкой персональных данных, механизм их реализации, а также последствия дачи мною согласия или отказа в даче такого согласия.
              </Text>
            </ScrollView>
          </Dialog.Content>
          <View style={styles.dialogActionsContainer}>
            <Button 
              onPress={handleCancel}
              textColor="#3B82F6"
            >
              Отказаться
            </Button>
            <Button 
              onPress={handleConfirm}
              mode="contained"
              buttonColor="#7C3AED"
              textColor="#F9FAFB"
            >
              Согласен
            </Button>
          </View>
        </Dialog>
      </Portal>
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
  button: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: '#7C3AED',
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 4,
    color: '#E6FCFF',
  },
  dialog: {
    backgroundColor: '#1F2937',
    borderRadius: 10,
    maxWidth: 400,
    alignSelf: 'center',
    width: '90%',
    maxHeight: '80%',
  },
  dialogContent: {
    paddingHorizontal: 0,
    flex: 1,
    backgroundColor: '#1F2937',
  },
  dialogScrollView: {
    maxHeight: 400,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  dialogTitle: {
    color: '#F9FAFB',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 16,
  },
  dialogText: {
    color: '#F9FAFB',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  dialogSubtitle: {
    color: '#F9FAFB',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  dialogActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: '#1F2937',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
}); 