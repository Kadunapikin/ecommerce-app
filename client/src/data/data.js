import headphone1 from '../assets/headphone1.jpg';
import headphone2 from '../assets/headphone2.jpg'
import headphone3 from '../assets/headphone3.jpg'
import headphone4 from '../assets/headphone4.jpg'

import { v4 as uuidv4 } from 'uuid';

export const products = [
    {
        name: 'headphones 1',
        price: 30,
        id: uuidv4(),
        quantity: 1,
        img: headphone1
    },
    {
        name: 'headphones 2',
        price: 50,
        id: uuidv4(),
        quantity: 1,
        img: headphone2
    },
    {
        name: 'headphones 3',
        price: 120,
        id: uuidv4(),
        quantity: 1,
        img: headphone3
    },
    {
        name: 'headphones 4',
        price: 324,
        id: uuidv4(),
        quantity: 1,
        img: headphone4
    },
];
