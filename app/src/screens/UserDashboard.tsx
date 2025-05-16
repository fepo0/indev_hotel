import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeScreen } from './HomeScreen';
import { MyBookingsScreen } from './MyBookingsScreen';
import { ManageRoomScreen } from './ManageRoomScreen';
import { ProfileScreen } from './ProfileScreen';
import { mockBookings } from './MyBookingsScreen';

type RootStackParamList = {
  Home: undefined;
  MyBookings: undefined;
  ManageRoom: undefined;
  Profile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const UserDashboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const [currentScreen, setCurrentScreen] = useState('Home');

  const hasActiveBookings = mockBookings.length > 0;

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const navigateTo = (screen: keyof RootStackParamList) => {
    setCurrentScreen(screen);
    closeMenu();
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen />;
      case 'MyBookings':
        return <MyBookingsScreen />;
      case 'ManageRoom':
        return <ManageRoomScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" onPress={openMenu} />
        <Appbar.Content title={
          currentScreen === 'Home' ? 'Главная' :
          currentScreen === 'MyBookings' ? 'Моя бронь' :
          currentScreen === 'ManageRoom' ? 'Управление номером' :
          currentScreen === 'Profile' ? 'Профиль' : 'Отель'
        } />
      </Appbar.Header>

      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={{ x: 0, y: 0 }}
        style={styles.menu}
        contentStyle={styles.menuContent}
        theme={{
          colors: {
            surface: '#1F2937',
            onSurface: '#F9FAFB',
            backdrop: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <Menu.Item
          onPress={() => navigateTo('Home')}
          title="Главная"
          leadingIcon="home"
          titleStyle={styles.menuItemText}
        />
        <Menu.Item
          onPress={() => navigateTo('MyBookings')}
          title="Моя бронь"
          leadingIcon="calendar"
          titleStyle={styles.menuItemText}
        />
        {hasActiveBookings && (
          <Menu.Item
            onPress={() => navigateTo('ManageRoom')}
            title="Управлять номером"
            leadingIcon="room-service"
            titleStyle={styles.menuItemText}
          />
        )}
        <Menu.Item
          onPress={() => navigateTo('Profile')}
          title="Профиль"
          leadingIcon="account"
          titleStyle={styles.menuItemText}
        />
      </Menu>

      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    backgroundColor: '#1F2937',
  },
  menu: {
    marginTop: 50,
  },
  menuContent: {
    backgroundColor: '#1F2937',
  },
  menuItemText: {
    color: '#F9FAFB',
  },
}); 