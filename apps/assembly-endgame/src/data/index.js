import { customNanoId } from '@revisit-react/config';

export const statusConfig = {
  won: {
    heading: 'You won!',
    message: 'Well done! 🎉'
  },
  lost: {
    heading: 'Game Over!',
    message: 'You lose! Better start learning Assembly 😭'
  },
  loseLanguage: {
    heading: 'Farewell',
    message: ''
  }
};

export const languages = [
  {
    id: customNanoId(),
    name: 'HTML',
    backgroundColor: '#E2680F',
    color: '#F9F4DA'
  },
  {
    id: customNanoId(),
    name: 'CSS',
    backgroundColor: '#328AF1',
    color: '#F9F4DA'
  },
  {
    id: customNanoId(),
    name: 'JavaScript',
    backgroundColor: '#F4EB13',
    color: '#1E1E1E'
  },
  {
    id: customNanoId(),
    name: 'React',
    backgroundColor: '#2ED3E9',
    color: '#1E1E1E'
  },
  {
    id: customNanoId(),
    name: 'TypeScript',
    backgroundColor: '#298EC6',
    color: '#F9F4DA'
  },
  {
    id: customNanoId(),
    name: 'Node.js',
    backgroundColor: '#599137',
    color: '#F9F4DA'
  },
  {
    id: customNanoId(),
    name: 'Python',
    backgroundColor: '#FFD742',
    color: '#1E1E1E'
  },
  {
    id: customNanoId(),
    name: 'Ruby',
    backgroundColor: '#D02B2B',
    color: '#F9F4DA'
  },
  {
    id: customNanoId(),
    name: 'Assembly',
    backgroundColor: '#2D519F',
    color: '#F9F4DA'
  }
];
