
import React from 'react';

type Service = {
  icon: string;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: "fa-window-maximize",
    title: "Web Development",
    description: "Design and develop responsive and interactive websites using HTML, CSS, JavaScript, and React. Focused on building clean, user-friendly interfaces and dynamic web applications."
  },
  {
    icon: "fa-mobile-screen",
    title: "Mobile App Development",
    description: "Develop cross-platform mobile apps using Flutter, creating smooth and functional apps for both Android and iOS with a focus on performance and user experience."
  },
  {
    icon: "fa-cloud",
    title: "Cloud Computing",
    description: "Get started with basic cloud services to host websites, apps, and manage online data. Learning and working with platforms like AWS and Firebase."
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 title-gradient">Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-purple/20 rounded-full flex items-center justify-center mb-6">
                <i className={`fas ${service.icon} text-purple-light text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
