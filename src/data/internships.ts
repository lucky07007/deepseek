// src/data/internships.ts
export interface Internship {
  id: string
  title: string
  company: string
  logo: string
  location: string
  type: 'Remote' | 'On-site' | 'Hybrid'
  category: string
  stipend: string
  duration: string
  deadline: string
  description: string
  requirements: string[]
  skills: string[]
  postedDate: string
  applicants: number
  featured: boolean
  trusted: boolean
}

export const internships: Internship[] = [
  {
    id: '1',
    title: 'Data Science Intern',
    company: 'Google',
    logo: '/companies/google.svg',
    location: 'Bangalore, India',
    type: 'Hybrid',
    category: 'Data Science',
    stipend: '₹50,000/month',
    duration: '6 months',
    deadline: '2024-03-15',
    description: 'Join Google's Data Science team to work on cutting-edge ML models and analytics projects.',
    requirements: [
      'Pursuing BS/MS in Computer Science or related field',
      'Strong Python programming skills',
      'Knowledge of ML frameworks (TensorFlow/PyTorch)',
      'Understanding of statistical analysis',
    ],
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    postedDate: '2024-02-01',
    applicants: 1250,
    featured: true,
    trusted: true,
  },
  {
    id: '2',
    title: 'Full Stack Developer Intern',
    company: 'Microsoft',
    logo: '/companies/microsoft.svg',
    location: 'Remote',
    type: 'Remote',
    category: 'Software Development',
    stipend: '₹45,000/month',
    duration: '3 months',
    deadline: '2024-03-20',
    description: 'Build and maintain web applications using modern technologies at Microsoft.',
    requirements: [
      'Experience with React/Next.js',
      'Knowledge of Node.js and databases',
      'Understanding of REST APIs',
      'Good problem-solving skills',
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    postedDate: '2024-02-05',
    applicants: 890,
    featured: false,
    trusted: true,
  },
  // Add more internships here...
]

export const categories = [
  'All',
  'Software Development',
  'Data Science',
  'Machine Learning',
  'Product Management',
  'UI/UX Design',
  'Marketing',
  'Finance',
  'Human Resources',
  'Content Writing',
]

export const locations = [
  'All',
  'Remote',
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Pune',
  'Chennai',
]
