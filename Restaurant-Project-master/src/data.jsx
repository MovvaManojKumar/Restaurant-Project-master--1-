import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaDiscord,
} from 'react-icons/fa';
// import images
import AboutImg from '../src/assets/img/about/plate.png';
import ModelWhiteImg from '../src/assets/img/model-white.png';
import ModelBlackImg from '../src/assets/img/model-black.png';
import MenuImg1 from '../src/assets/img/menu/ammamma.png';
import MenuImg2 from '../src/assets/img/menu/anitha.png';
import MenuImg3 from '../src/assets/img/menu/prathyush.png';
import MenuImg4 from '../src/assets/img/menu/deekshandshan.png';
import SignatureImg from '../src/assets/img/team/signature.png';
import ChefImg from '../src/assets/img/team/chef.png';
import Avatar2 from '../src/assets/img/testimonial/avatar2.png';
import Avatar3 from '../src/assets/img/testimonial/avatar3.png';

  export const navData = [
    { href: '/', name: 'Home' },
    { href: '/chefs', name: 'Find Chefs' },
    {href:'/login',name:'Login'},
    // Add other navigation items as needed
  ];
export const heroData = {
  pretitle: 'Nothing brings together like',
  title:` Chef's Palace`,
  subtitle:
    'Ghar ka khaana aapke table par!!!',
  btnText: 'Find out more',
};

export const socialData = [
  { href: '/', icon: <FaYoutube /> },
  { href: '/', icon: <FaFacebookF /> },
  { href: '/', icon: <FaInstagram /> },
  { href: '/', icon: <FaPinterestP /> },
  { href: '/', icon: <FaDiscord /> },
];

export const aboutData = {
  pretitle: 'Our Story',
  title: 'Who we are',
  subtitle:
    `Are you craving the taste of homemade meals but don't have the time or expertise to whip them up yourself? Look no further than Chef's Palace, the premier platform connecting talented homemakers with eager food enthusiasts and restaurant professionals like yourself!

    At Chef's Palace, we understand the value of home cooking and the untapped culinary talent residing within countless homemakers. Our mission is simple yet powerful: to empower skilled home cooks by providing them with meaningful employment opportunities while satisfying the cravings of those seeking delicious, homemade meals.
    
    Here's how it works: our platform showcases a diverse array of skilled cooks, each with their own unique signature dishes and culinary styles. Whether you're a bachelor craving a taste of home or a restaurant owner looking to add a personal touch to your menu, Chef's Palace makes it easy to discover and connect with the perfect chef for your needs.
    
    Our intuitive search and rating system allows you to browse through chefs based on their specialties, ratings, and proximity to your location. From traditional comfort foods to exotic cuisines, you'll find a wide range of culinary delights just waiting to be savored.` ,
  btnText: 'find out more',
  image: AboutImg,
};

export const menuData = {
  title: `Chef's signature dishes`,
  subtitle: `view some of our new chef's added today`,
  modelImg: ModelWhiteImg,
  btnText: 'view complete menu',
  menuItems: [
    {
      image: MenuImg2,
      name: 'Anitha - Btech Graduate',
      price: `Biriyani's`,
      description: 'Hyderabadi',
    },
    {
      image: MenuImg1,
      name: 'Vijayalakshmi Amma',
      price: 'Pachadi Ruchulu',
      description: 'Viyawada',
    },
    {
      image: MenuImg3,
      name: 'Prathyush',
      price: 'Chinese cuisine',
      description: 'Kolkata',
    },
    {
      image: MenuImg4,
      name: 'Deekshith and Shahn',
      price: 'Dessert specials',
      description: 'Gujarath',
    },
  ],
};

export const teamData = {
  pretitle: 'our team',
  title: 'meet our chef',
  sub1: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis adipisci repudiandae enim ratione corrupti voluptatum suscipit distinctio dolor.',
  sub2: 'Sequi exercitationem quae deserunt reiciendis nesciunt perferendis atque quisquam, odit facere! Minima esse reiciendis, magnam fugiat totam maxime consequatur perspiciatis voluptas consequuntur.',
  name: 'sara peter',
  occupation: 'executive chef',
  signatureImg: SignatureImg,
  chefImg: ChefImg,
};

export const testimonialData = {
  title: "what client's say ",
  subtitle: '1500+ statisfied clients',
  modelImg: ModelWhiteImg,
  slider: [
    {
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quas ipsum eius voluptatibus. Quod ipsum ullam id facere a beatae incidunt eaque, veritatis architecto cum perferendis debitis tempora.',
      image: Avatar2,
      name: 'John Doe',
      occupation: 'CEO of Delightful',
    },
    {
      message:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quas ipsum eius voluptatibus. Quod ipsum ullam id facere a beatae incidunt eaque, veritatis architecto cum perferendis debitis tempora.',
      image: Avatar3,
      name: 'Henry A.',
      occupation: 'CEO of Delightful',
    },
  ],
};

export const reservationData = {
  title: 'booking form',
  subtitle:
    'Call (800) 123-4567 from 5AM - 11PM daily, or book online with OpenTable.Reservations required for parties of 6 or more.',
  modelImg: ModelBlackImg,
  btnText: 'make a reservation',
};

export const newsletterData = {
  title: 'join our newsletter',
  subtitle: 'Get latest news & updates in your inbox.',
  placeholder: 'Subscribe our delicious dishes',
  btnText: 'subscribe now',
};

export const footerData = {
  contact: {
    title: 'contact location',
    address: '3784 patterson road, #8 new york, CA 69000',
    phone: '8943246783',
  },
  hours: {
    title: 'Chef availability hours',
    program: [
      {
        days: 'monday - friday',
        hours: '09:00 AM - 8:00 PM',
      },
      {
        days: 'saturday - sunday',
        hours: '09:00 AM - 12:00 PM',
      },
    ],
  },
  social: {
    title: 'social network',
    icons: [
      { href: '/', icon: <FaYoutube /> },
      { href: '/', icon: <FaFacebookF /> },
      { href: '/', icon: <FaInstagram /> },
      { href: '/', icon: <FaPinterestP /> },
      { href: '/', icon: <FaDiscord /> },
    ],
  },
};