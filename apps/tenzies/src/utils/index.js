import { customNanoId } from '@revisit-react/config';

export const generateDie = () => ({
  id: customNanoId(),
  value: Math.ceil(Math.random() * 6),
  isHeld: false
});

export const generateAllNewDice = count =>
  Array.from({ length: count }, generateDie);
