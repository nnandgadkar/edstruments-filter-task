
import { mockData } from './data/mockData';
import type { Employee } from './types/filtertypes';

export const fetchEmployees = async (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500); 
  });
};