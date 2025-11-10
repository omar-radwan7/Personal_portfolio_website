
import React from 'react';
import GlassSurface from './GlassSurface';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 title-gradient">Let's work together</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={16}
            displace={10}
            distortionScale={-155}
            redOffset={4}
            greenOffset={12}
            blueOffset={20}
            className="p-6 card-hover"
          >
            <div className="flex flex-col items-start w-full">
              <div className="w-14 h-14 bg-purple/20 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-phone text-purple-light text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Phone</h3>
              <p className="text-muted-foreground">+49 177 7588642</p>
            </div>
          </GlassSurface>
          
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={16}
            displace={10}
            distortionScale={-155}
            redOffset={4}
            greenOffset={12}
            blueOffset={20}
            className="p-6 card-hover"
          >
            <div className="flex flex-col items-start w-full">
              <div className="w-14 h-14 bg-purple/20 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-envelope text-purple-light text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <a href="mailto:omarobrashy2004@gmail.com" className="text-muted-foreground hover:text-purple-light transition-colors">
                omarobrashy2004@gmail.com
              </a>
            </div>
          </GlassSurface>
        </div>
      </div>
    </section>
  );
};

export default Contact;
