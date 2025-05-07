import { User, LoginCredentials, RegisterData } from '../types/auth';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock users database
const users = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: '123456'
  }
];

export const api = {
  login: async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
    // Simulate API call
    await delay(1000);
    
    const user = users.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Generate a fake token
    const token = `token_${Math.random().toString(36).substring(2)}`;
    
    // Return user info without password
    const { password: _, ...userWithoutPassword } = user;
    return {
      token,
      user: userWithoutPassword
    };
  },
  
  register: async (data: RegisterData): Promise<{ token: string; user: User }> => {
    // Simulate API call
    await delay(1000);
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      ...data
    };
    
    users.push(newUser);
    
    // Generate a fake token
    const token = `token_${Math.random().toString(36).substring(2)}`;
    
    // Return user info without password
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      token,
      user: userWithoutPassword
    };
  },
  
  getUserProfile: async (token: string): Promise<User> => {
    // Simulate API call
    await delay(500);
    
    // In a real app, you would validate the token
    if (!token || !token.startsWith('token_')) {
      throw new Error('Invalid token');
    }
    
    // Return a mock user (in a real app, you would decode the token or make an API call)
    return {
      id: '1',
      name: 'Test User',
      email: 'test@example.com'
    };
  }
};