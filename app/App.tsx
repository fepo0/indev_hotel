import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { UserProvider } from './src/contexts/UserContext';
import { RegistrationScreen } from './src/screens/RegistrationScreen';
import { AdminDashboard } from './src/screens/AdminDashboard';
import { UserDashboard } from './src/screens/UserDashboard';
import { AdditionalInfoScreen } from './src/screens/AdditionalInfoScreen';

enableScreens();

const Stack = createNativeStackNavigator();

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const theme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    primary: '#7C3AED',
    secondary: '#3B82F6',
    tertiary: '#9CA3AF',
    background: '#111827',
    surface: '#1F2937',
    error: '#B00020',
    text: '#F9FAFB',
    border: '#374151',
    onSurface: '#F9FAFB',
    onSurfaceVariant: '#9CA3AF',
    outline: '#374151',
    outlineVariant: '#374151',
    surfaceVariant: '#1F2937',
    surfaceDisabled: '#374151',
    onSurfaceDisabled: '#9CA3AF',
    backdrop: 'rgba(17, 24, 39, 0.5)',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <UserProvider>
    <NavigationContainer theme={LightTheme}>
          <Stack.Navigator
            initialRouteName="Registration"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#E6FCFF' },
              animation: 'slide_from_right',
              presentation: 'card',
              gestureEnabled: true,
              animationTypeForReplace: 'push',
            }}
          >
            <Stack.Screen 
              name="Registration" 
              component={RegistrationScreen}
              options={{
                animation: 'slide_from_right',
                gestureEnabled: true,
              }}
            />
            <Stack.Screen 
              name="AdditionalInfo" 
              component={AdditionalInfoScreen}
              options={{
                animation: 'slide_from_right',
                gestureEnabled: true,
              }}
            />
            <Stack.Screen 
              name="AdminDashboard" 
              component={AdminDashboard}
              options={{
                animation: 'slide_from_right',
                gestureEnabled: true,
              }}
            />
            <Stack.Screen 
              name="UserDashboard" 
              component={UserDashboard}
              options={{
                animation: 'slide_from_right',
                gestureEnabled: true,
              }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </UserProvider>
      </PaperProvider>
  );
}
