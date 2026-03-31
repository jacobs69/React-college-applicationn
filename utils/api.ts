import AsyncStorage from '@react-native-async-storage/async-storage';

// API URL - Use machine IP for Expo
const API_URL = 'http://10.205.207.184:5001/api';

interface ApiResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: any;
  data?: any;
}

const apiCall = async (
  endpoint: string,
  method: string = 'GET',
  data: any = null,
  token: string | null = null
): Promise<ApiResponse> => {
  const headers: any = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options: any = {
    method,
    headers,
    timeout: 10000, // 10 second timeout
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const url = `${API_URL}${endpoint}`;
    console.log(`[API] ${method} ${url}`);
    console.log(`[API] Using endpoint: ${API_URL}`);
    
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      console.error(`[API Error] ${response.status}: ${result.message}`);
      throw new Error(result.message || 'API Error');
    }

    console.log(`[API Success] ${method} ${endpoint}`);
    return result;
  } catch (error: any) {
    console.error(`[API Exception] ${error.message}`);
    console.error(`[API] Failed URL: ${API_URL}${endpoint}`);
    console.error(`[API] Error details:`, error);
    throw error;
  }
};

export const authAPI = {
  register: async (userData: any) => {
    return apiCall('/auth/register', 'POST', userData);
  },

  login: async (identifier: string, password: string) => {
    return apiCall('/auth/login', 'POST', { identifier, password });
  },

  getMe: async (token: string) => {
    return apiCall('/auth/me', 'GET', null, token);
  },

  verifyToken: async (token: string) => {
    return apiCall('/auth/verify', 'POST', {}, token);
  },
};

export const assignmentAPI = {
  create: async (data: any, token: string) => {
    return apiCall('/assignments', 'POST', data, token);
  },

  getAll: async (query?: any, token?: string) => {
    const queryStr = query ? `?${new URLSearchParams(query).toString()}` : '';
    return apiCall(`/assignments${queryStr}`, 'GET', null, token);
  },

  getById: async (id: string, token: string) => {
    return apiCall(`/assignments/${id}`, 'GET', null, token);
  },

  update: async (id: string, data: any, token: string) => {
    return apiCall(`/assignments/${id}`, 'PUT', data, token);
  },

  delete: async (id: string, token: string) => {
    return apiCall(`/assignments/${id}`, 'DELETE', null, token);
  },
};

export const resultAPI = {
  create: async (data: any, token: string) => {
    return apiCall('/results', 'POST', data, token);
  },

  getAll: async (query?: any, token?: string) => {
    const queryStr = query ? `?${new URLSearchParams(query).toString()}` : '';
    return apiCall(`/results${queryStr}`, 'GET', null, token);
  },

  getById: async (id: string, token: string) => {
    return apiCall(`/results/${id}`, 'GET', null, token);
  },

  update: async (id: string, data: any, token: string) => {
    return apiCall(`/results/${id}`, 'PUT', data, token);
  },

  delete: async (id: string, token: string) => {
    return apiCall(`/results/${id}`, 'DELETE', null, token);
  },
};

export const attendanceAPI = {
  mark: async (data: any, token: string) => {
    return apiCall('/attendance', 'POST', data, token);
  },

  getAll: async (query?: any, token?: string) => {
    const queryStr = query ? `?${new URLSearchParams(query).toString()}` : '';
    return apiCall(`/attendance${queryStr}`, 'GET', null, token);
  },

  getById: async (id: string, token: string) => {
    return apiCall(`/attendance/${id}`, 'GET', null, token);
  },

  update: async (id: string, data: any, token: string) => {
    return apiCall(`/attendance/${id}`, 'PUT', data, token);
  },

  delete: async (id: string, token: string) => {
    return apiCall(`/attendance/${id}`, 'DELETE', null, token);
  },
};

export const eventAPI = {
  create: async (data: any, token: string) => {
    return apiCall('/events', 'POST', data, token);
  },

  getAll: async (query?: any, token?: string) => {
    const queryStr = query ? `?${new URLSearchParams(query).toString()}` : '';
    return apiCall(`/events${queryStr}`, 'GET', null, token);
  },

  getById: async (id: string, token: string) => {
    return apiCall(`/events/${id}`, 'GET', null, token);
  },

  update: async (id: string, data: any, token: string) => {
    return apiCall(`/events/${id}`, 'PUT', data, token);
  },

  delete: async (id: string, token: string) => {
    return apiCall(`/events/${id}`, 'DELETE', null, token);
  },
};

export const noticeAPI = {
  create: async (data: any, token: string) => {
    return apiCall('/notices', 'POST', data, token);
  },

  getAll: async (query?: any, token?: string) => {
    const queryStr = query ? `?${new URLSearchParams(query).toString()}` : '';
    return apiCall(`/notices${queryStr}`, 'GET', null, token);
  },

  getById: async (id: string, token: string) => {
    return apiCall(`/notices/${id}`, 'GET', null, token);
  },

  update: async (id: string, data: any, token: string) => {
    return apiCall(`/notices/${id}`, 'PUT', data, token);
  },

  delete: async (id: string, token: string) => {
    return apiCall(`/notices/${id}`, 'DELETE', null, token);
  },
};

export const feeAPI = {
  create: async (data: any, token: string) => {
    return apiCall('/fees', 'POST', data, token);
  },

  getAll: async (query?: any, token?: string) => {
    const queryStr = query ? `?${new URLSearchParams(query).toString()}` : '';
    return apiCall(`/fees${queryStr}`, 'GET', null, token);
  },

  getById: async (id: string, token: string) => {
    return apiCall(`/fees/${id}`, 'GET', null, token);
  },

  update: async (id: string, data: any, token: string) => {
    return apiCall(`/fees/${id}`, 'PUT', data, token);
  },

  delete: async (id: string, token: string) => {
    return apiCall(`/fees/${id}`, 'DELETE', null, token);
  },
};

export const tokenAPI = {
  saveToken: async (token: string) => {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.warn('Failed to save token to AsyncStorage:', error);
    }
  },

  getToken: async () => {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.warn('Failed to get token from AsyncStorage:', error);
      return null;
    }
  },

  removeToken: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.warn('Failed to remove token from AsyncStorage:', error);
    }
  },
};
