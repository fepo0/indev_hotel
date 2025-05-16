import { AuthResponse, RegisterCredentials } from '../types';

// Временные моковые данные для демонстрации
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'Admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'User123',
    role: 'user' as const,
    firstName: 'Иван',
    lastName: 'Иванов',
    middleName: 'Иванович',
    phone: '+375 (29) 123-45-67',
  },
];

class AuthService {
  async login(credentials: RegisterCredentials): Promise<AuthResponse> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(u => u.email === credentials.email);
    
    if (!user || user.password !== credentials.password) {
      throw new Error('Неверный email или пароль');
    }

    // В реальном приложении здесь будет JWT токен
    const token = 'mock-jwt-token';

    // Возвращаем данные пользователя без пароля
    const { password, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token,
    };
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (MOCK_USERS.some(u => u.email === credentials.email)) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const newUser = {
      id: String(MOCK_USERS.length + 1),
      email: credentials.email,
      password: credentials.password,
      role: 'user' as const,
    };

    MOCK_USERS.push(newUser);

    // В реальном приложении здесь будет JWT токен
    const token = 'mock-jwt-token';

    // Возвращаем данные пользователя без пароля
    const { password, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async logout(): Promise<void> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    // В реальном приложении здесь будет очистка токена
  }
}

export const authService = new AuthService(); 