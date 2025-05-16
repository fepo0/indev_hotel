import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface UserProfile {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  bookingsCount: number;
}

const mockProfile: UserProfile = {
  firstName: 'Иван',
  lastName: 'Иванов',
  middleName: 'Иванович',
  email: 'ivanov@example.com',
  phone: '+375 (29) 123-45-67',
  bookingsCount: 2
};

export const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    // TODO: Реализовать очистку данных пользователя
    console.log('Выход из системы');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Paragraph style={styles.label}>Имя:</Paragraph>
            <Paragraph style={styles.value}>{mockProfile.firstName}</Paragraph>
            
            <Paragraph style={styles.label}>Фамилия:</Paragraph>
            <Paragraph style={styles.value}>{mockProfile.lastName}</Paragraph>
            
            <Paragraph style={styles.label}>Отчество:</Paragraph>
            <Paragraph style={styles.value}>{mockProfile.middleName}</Paragraph>
            
            <Paragraph style={styles.label}>Email:</Paragraph>
            <Paragraph style={styles.value}>{mockProfile.email}</Paragraph>
            
            <Paragraph style={styles.label}>Телефон:</Paragraph>
            <Paragraph style={styles.value}>{mockProfile.phone}</Paragraph>
            
            <Paragraph style={styles.label}>Количество броней:</Paragraph>
            <Paragraph style={styles.value}>{mockProfile.bookingsCount}</Paragraph>
          </Card.Content>
        </Card>

        <Button 
          mode="contained" 
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          Выйти
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  profileContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: '#1F2937',
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#00A4BB',
    textAlign: 'center',
  },
  label: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: '#F9FAFB',
    fontSize: 16,
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#7C3AED',
    marginTop: 20,
    marginHorizontal: 16,
  },
}); 