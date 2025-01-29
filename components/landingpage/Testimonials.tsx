// import { motion } from 'framer-motion';
// import { Star } from 'lucide-react';
// import ScrollingTestimonials from '../ui/scrolling-testimonial';


// const testimonials = [
//   {
//     content: "The AI-generated UGC ads have transformed our marketing strategy. We've seen a 2x increase in conversion rates.",
//     author: "Sarah Johnson",
//     role: "Marketing Director",
//     company: "TechFlow SaaS",
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
//   },
//   {
//     content: "Incredible tool! We're saving weeks of time in content creation while maintaining authenticity.",
//     author: "Michael Chen",
//     role: "Growth Lead",
//     company: "CloudScale",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
//   },
//   {
//     content: "The quality of UGC content is amazing. Our engagement rates have never been higher.",
//     author: "Emily Rodriguez",
//     role: "Social Media Manager",
//     company: "DataPro",
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
//   }
// ];

// export function Testimonials() {
//   return (
//     <section id="testimonials" className="py-24 bg-white dark:bg-gray-900">
//       {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center"
//         >
//           <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
//             Testimonials
//           </h2>
//           <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
//             See what our customers are saying
//           </p>
//         </motion.div>

//         <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={testimonial.author}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//               className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
//             >
//               <div className="flex items-center space-x-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className="w-5 h-5 text-yellow-400 fill-current"
//                   />
//                 ))}
//               </div>
//               <p className="mt-4 text-gray-600 dark:text-gray-300">
//                 {testimonial.content}
//               </p>
//               <div className="mt-6 flex items-center">
//                 <img
//                   className="h-12 w-12 rounded-full"
//                   src={testimonial.image}
//                   alt={testimonial.author}
//                 />
//                 <div className="ml-4">
//                   <p className="text-base font-medium text-gray-900 dark:text-white">
//                     {testimonial.author}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     {testimonial.role} at {testimonial.company}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div> */}

// <ScrollingTestimonials
//   data={[
//     {
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!',
//       image: 'https://plus.unsplash.com/premium_photo-1717529137991-510ad3be15d9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       name: 'John Doe.'
//     },
//     {
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!',
//       image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       name: 'Paul A'
//     },
//     {
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!',
//       image: 'https://images.unsplash.com/photo-1560298803-1d998f6b5249?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       name: 'Jeff Roe'
//     },
//     {
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!',
//       image: 'https://images.unsplash.com/photo-1518287010730-4386819bf3e9?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       name: 'Mex Q'
//     },
//     {
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa nostrum labore dolor facilis, nesciunt facere mollitia nam aspernatur!',
//       image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       name: 'Cristina W'
//     },
//     {
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
//       image: 'https://images.unsplash.com/photo-1581092916357-5896ebc48073?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       name: 'Lanna Del Rey'
//     },
//     {
//       description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. ',
//       image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       name: 'Paul Logan'
//     }
//   ]}
//  />
//     </section>
//   );
// }


import { Testimonials } from "@/components/ui/testimonials"

const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'I\'m blown away by the versatility of the components in this library. They make UI development a breeze!',
    name: 'Alice Johnson',
    username: '@alicejohnson',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!',
    name: 'David Smith',
    username: '@davidsmith',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/kaDy9hV.jpeg',
    text: 'The components in this library are not just well-designed but also highly customizable. It\'s a developer\'s dream!',
    name: 'Emma Brown',
    username: '@emmabrown',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/cRwFxtE.png',
    text: 'I love  how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.',
    name: 'James Wilson',
    username: '@jameswilson',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/TQIqsob.png',
    text: 'Implementing this component library was a game-changer for our team. It has elevated our product\'s UI to a whole new level!',
    name: 'Sophia Lee',
    username: '@sophialee',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/3ROmJ0S.png',
    text: 'Using this library has been a game-changer for our product development.',
    name: 'Michael Davis',
    username: '@michaeldavis',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/6fKCuVC.png',
    text: 'The components are highly responsive and work seamlessly across different devices and screen sizes.',
    name: 'Emily Chen',
    username: '@emilychen',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/Jjqe7St.png',
    text: 'I love how easy it is to customize the components  to fit our brand\'s style. The design is clean and modern.',
    name: 'Robert Lee',
    username: '@robertlee',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/bG88vHI.png',
    text: 'This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.',
    name: 'Sarah Taylor',
    username: '@sarahtaylor',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/tjmS77j.png',
    text: 'I appreciate the attention to detail in the design. The components are visually appealing and professional.',
    name: 'Kevin White',
    username: '@kevinwhite',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/yTsomza.png',
    text: 'The components are highly customizable and can be easily integrated with our existing UI framework.',
    name: 'Rachel Patel',
    username: '@rachelpatel',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/pnsLqpq.png',
    text: 'I love how the components are designed to be highly responsive and work well across different screen sizes.',
    name: 'Brian Kim',
    username: '@briankim',
    social: 'https://i.imgur.com/VRtqhGC.png'
  }
];

export function TestimonialsPage() {
  return (
    <div className="container py-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-200">
      <Testimonials testimonials={testimonials} />
    </div>
  );
}