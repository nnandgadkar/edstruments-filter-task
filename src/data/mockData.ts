import type { Employee } from '../types/filtertypes';

export const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Product', 'Design'];
export const roles = ['Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director'];
export const skillsList = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Python', 'Java', 'Go', 'SQL', 'AWS', 'Docker'];
export const cities = ['San Francisco', 'New York', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Austin', 'Seattle'];

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

const generateEmployees = (count: number): Employee[] => {
  const employees: Employee[] = [];
  for (let i = 1; i <= count; i++) {
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const numSkills = Math.floor(Math.random() * 5) + 1;
    const empSkills = Array.from({ length: numSkills }, () => skillsList[Math.floor(Math.random() * skillsList.length)]).filter((v, i, a) => a.indexOf(v) === i);
    
    employees.push({
      id: i,
      name: `Employee ${i}`,
      email: `employee${i}@company.com`,
      department: dept,
      role: `${role} ${dept.includes('Engineering') ? 'Developer' : 'Specialist'}`,
      salary: 50000 + Math.floor(Math.random() * 150000),
      joinDate: generateRandomDate(new Date(2015, 0, 1), new Date()),
      isActive: Math.random() > 0.1,
      skills: empSkills,
      address: {
        city: cities[Math.floor(Math.random() * cities.length)],
        state: 'State',
        country: 'Country'
      },
      projects: Math.floor(Math.random() * 10),
      lastReview: generateRandomDate(new Date(2023, 0, 1), new Date()),
      performanceRating: Number((Math.random() * 5).toFixed(1))
    });
  }
  return employees;
};

export const mockData: Employee[] = generateEmployees(60);
