/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axiosSecure from '../Axios/AxiosSecure';



export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axiosSecure.post('/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Login successful!');
      router.push(data.role === 'admin' ? '/dashboard' : '/');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });
};


export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const formData = new FormData();
      
      // Append all simple fields
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('phone', data.phone);
      formData.append('address', data.address);
      formData.append('Image', data.Image as any);

      const response = await axiosSecure.post('/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Registration successful!');
      router.push('/log-in');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });
};


export const useRefreshToken = () => {
  return useQuery({
    queryKey: ['refresh-token'],
    queryFn: async () => {
      const response = await axiosSecure.post('/refresh');
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// 🔹 Logout Mutation
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosSecure.post('/logout');
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
      toast('Logged out successfully', { icon: '👋' });
      router.push('/login');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Logout failed');
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateData }) => {
      const response = await axiosSecure.patch(`/update/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Update failed');
    },
  });
};


export const useGetAllUsers = (search = '', page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['users', search, page, limit],
    queryFn: async () => {
      const response = await axiosSecure.get('/users', {
        params: { search, page, limit },
      });
      return response.data;
    },
  });
};


export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await axiosSecure.get('/me');
      return response.data;
    },
    retry: false,
  });
};