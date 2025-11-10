import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';
import BouncingQ from '@/components/BouncingQ';
import PingPongGame from '@/components/PingPongGame';
import ThunderCloud from '@/components/ThunderCloud';
import CloudStorageAnimation from '@/components/CloudStorageAnimation';
import GlassSurface from '@/components/GlassSurface';

// Project data structure
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: React.ReactNode;
  technologies: string[];
  githubLink?: string;
  status: 'complete' | 'coming-soon';
}

// Project data
const projectsData: Project[] = [
  {
    id: 'localcloud',
    title: 'LocalCloud',
    subtitle: 'Local Cloud Storage Emulator',
    description: 'A fullstack application that works like Dropbox but runs entirely on your local machine. Upload files, manage versions, use a recycle bin, and organize everything with a clean web interface.\n\nProject Idea:\nThis is a complete cloud storage system that you can run locally without any external services. It includes user authentication, file uploads with drag-and-drop, automatic versioning when you update files, a recycle bin for deleted items, and a modern React interface. All your files are persisted directly in the local SQLite database (no loose files on disk) so the project stays self-contained and portable.\n\nFeatures:\n• User authentication with secure password hashing\n• Upload and download files with progress tracking\n• Drag-and-drop file uploads\n• Create nested folders to organise files\n• Automatic file versioning when you replace files\n• Recycle bin with restore and permanent delete options\n• Search through your files\n• Storage usage visualization with configurable quotas\n• View and download previous versions of any file\n• User profile management\n• Duplicate file detection with content hashing\n• Optional Python microservice for advanced file analysis\n\nTech Stack:\n• Backend: Node.js, Express, TypeScript, Prisma ORM, SQLite, JWT, bcrypt\n• Frontend: Next.js 16, React, TypeScript, TailwindCSS, Axios\n• Optional Python Service: FastAPI, Pillow, PyPDF2, python-docx (for advanced file processing)',
    technologies: ['Node.js', 'Express', 'Next.js', 'React', 'TypeScript', 'Prisma', 'SQLite', 'TailwindCSS', 'Python'],
    githubLink: 'https://github.com/omar-radwan7/LocalCloud?tab=readme-ov-file#localcloud',
    status: 'complete'
  },
  {
    id: 'portfolio-builder',
    title: 'Portfolio Builder',
    subtitle: 'No-code React portfolio builder with drag-and-drop',
    description: 'Portfolio Builder is a dynamic, frontend-only React + Tailwind experience for crafting and exporting bespoke portfolio layouts without AI or a backend. This innovative tool empowers users to create professional portfolios through an intuitive visual interface.\n\nKey Features:\n• Dual Mode System: Switch between Blocks mode (drag components) and Page mode (manage multiple pages)\n• Drag & Drop Interface: Easily add and arrange components including Text, Image, Project Cards, Skills sections, and Contact forms\n• Smart Auto-Style: One-click randomized layouts with beautiful color palettes, typography presets, spacing variations, and smooth animations\n• Live Preview & Editing: Real-time preview with inline content and style editors for each section\n• Multi-Page Management: Create and organize multiple pages for comprehensive portfolios\n• Theme Presets: Choose from curated design themes or customize your own\n• Per-Section Layout Controls: Fine-tune individual section layouts and styling\n• Customizable Components: Personalize hero sections, highlight features, and more\n• One-Click Export: Generate a complete, runnable React project as a downloadable ZIP file\n• No Backend Required: Everything runs entirely in the browser using Context API and useReducer for state management\n\nTechnical Implementation:\n• Built with React 18+ and Vite for optimal development experience\n• Styled with Tailwind CSS for rapid, responsive design\n• Uses JSZip and FileSaver.js for seamless project export\n• State management via Context API with useReducer pattern\n• Clean, modular architecture ensuring maintainability and scalability\n\nThe exported project includes:\n• Complete package.json with all necessary dependencies\n• Configured tailwind.config.js and postcss.config.js\n• Ready-to-run index.html, src/App.jsx, src/main.jsx, and src/tailwind.css\n• Simply extract, run npm install, and launch with npm run dev\n\nPerfect for developers, designers, and professionals who want to quickly create stunning portfolio websites without writing code from scratch.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Context API', 'JSZip', 'JavaScript'],
    githubLink: 'https://github.com/omar-radwan7/Portfolio-Builder',
    status: 'complete'
  },
  {
    id: 'tradewise',
    title: 'TradeWise',
    subtitle: 'Flutter Stock Market App with Real-time Data - Demo Version',
    description: 'TradeWise is a comprehensive stock market application built with Flutter that provides real-time financial data and market insights. This demo version showcases live stock data integration from Financial Model Prep API.\n\nKey Features:\n• Dark mode support for comfortable viewing\n• Real-time stock price data and market information\n• Interactive charts and financial visualizations\n• Clean, modern user interface\n• Responsive design for all devices\n• Live market data integration\n• Stock search and portfolio tracking\n• Cross-platform compatibility (iOS/Android)\n\nBuilt with Flutter/Dart and utilizing various technologies including HTML, JavaScript, C++, CSS, and CMake for optimal performance. The application demonstrates proficiency in mobile app development, API integration, and creating intuitive financial interfaces. TradeWise offers users a professional-grade experience for tracking market trends and making informed investment decisions.',
    technologies: ['Flutter', 'Dart', 'HTML', 'JavaScript', 'C++', 'CSS', 'CMake'],
    githubLink: 'https://github.com/omar-radwan7/Stock_Market_App',
    status: 'complete'
  },
  {
    id: 'aimodel',
    title: 'Qorix AI Assistant',
    subtitle: 'Interactive AI Assistant with React',
    description: 'Qorix AI Assistant is a modern, browser-based AI chat application built with TypeScript, React, and Tailwind CSS. It offers users an intuitive interface to interact with an AI assistant powered by the OpenRouter API, using the Deepseek model for intelligent conversations. Designed for privacy and simplicity, Qorix runs entirely client-side — with no backend or database — storing chat history, API keys, and settings securely in the browser\'s localStorage.\n\nUsers can ask questions, upload files for analysis, and manage their own API key directly in-app. Features include message history, file upload, rate limit indicators, dark/light mode support, and full mobile responsiveness. Qorix is ideal for developers and curious users who want a lightweight, flexible AI chat experience without relying on cloud-based user accounts or external storage.\n\nTo get started, users just need to sign up at OpenRouter.ai, create an API key, and paste it into the app settings. Simple, private, and fully in your control.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenRouter API'],
    githubLink: 'https://github.com/omar-radwan7/QorixAI_Lnaguage_Model',
    status: 'complete'
  },
  {
    id: 'weather',
    title: 'Weather App',
    subtitle: 'Flutter & OpenWeatherMap API',
    description: 'A responsive weather application that provides real-time weather information using the OpenWeatherMap API. Users can search for locations and view current weather conditions, forecasts, and meteorological data presented in an intuitive and visually appealing interface.',
    technologies: ['Flutter', 'API'],
    status: 'coming-soon'
  },
  {
    id: 'pingpong',
    title: 'PingPong Game',
    subtitle: 'PingPong game With HTML, CSS & JavaScript',
    description: 'An interactive and fun ping pong game built using vanilla JavaScript. The game features computer-controlled paddles, score tracking, and progressive difficulty as the ball speeds up with each hit. The clean UI and smooth animations make for an engaging gaming experience.',
    technologies: ['HTML', 'CSS', 'JS'],
    githubLink: 'https://github.com/omar-radwan7/PingPongGame',
    status: 'complete'
  }
];

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-navyDark flex flex-col items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-6">The project you are looking for doesn't exist or has been removed.</p>
          <Link to="/" className="inline-flex items-center text-purple-light hover:text-purple">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navyDark flex flex-col">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <Link 
            to="/#projects" 
            className="inline-flex items-center text-primary/80 hover:text-primary mb-6"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/#projects";
            }}
          >
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Projects
          </Link>
          
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={16}
            displace={12}
            distortionScale={-150}
            redOffset={5}
            greenOffset={15}
            blueOffset={25}
            brightness={60}
            opacity={0.8}
            className="overflow-hidden"
            style={{ minHeight: 'auto' }}
          >
            <div className="w-full flex flex-col">
              <div className="w-full aspect-video flex items-center justify-center bg-card/10 rounded-t-2xl overflow-hidden">
                {project.image || (
                  <div className="text-center w-full h-full flex items-center justify-center">
                    {project.id === 'pingpong' ? (
                      <div className="w-full h-full">
                        <PingPongGame />
                      </div>
                    ) : project.id === 'aimodel' ? (
                      <div className="w-full h-full flex items-center justify-center overflow-hidden">
                        <BouncingQ />
                      </div>
                    ) : project.id === 'tradewise' ? (
                      <div className="flex justify-center items-center text-foreground/90">
                        <i className="fas fa-chart-line text-5xl text-green-400 animate-pulse"></i>
                        <i className="fas fa-dollar-sign text-3xl ml-2 text-yellow-400 animate-bounce"></i>
                      </div>
                    ) : project.id === 'portfolio-builder' ? (
                      <div className="flex justify-center items-center text-foreground/90 relative">
                        <i className="fas fa-layer-group text-5xl text-purple-light animate-pulse"></i>
                        <i className="fas fa-magic text-3xl ml-2 text-yellow-400 animate-bounce"></i>
                        <div className="absolute -top-4 -right-4">
                          <i className="fas fa-pencil-ruler text-2xl text-cyan-400 animate-pulse" style={{ animationDelay: '0.3s' }}></i>
                        </div>
                      </div>
                    ) : project.id === 'weather' ? (
                      <div className="w-full h-full relative">
                        <ThunderCloud />
                      </div>
                    ) : project.id === 'localcloud' ? (
                      <div className="w-full h-full">
                        <CloudStorageAnimation />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center text-foreground/90">
                        <i className="fas fa-cloud text-5xl"></i>
                        <i className="fas fa-thermometer-half text-3xl ml-2"></i>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-card/10 rounded-b-2xl">
                <p className="text-sm text-muted-foreground mb-2">{project.subtitle}</p>
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">{project.title}</h1>
                
                <div className="flex gap-2 flex-wrap mb-6">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-purple/20 text-purple-light rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="prose prose-invert max-w-none mb-8 whitespace-pre-line">
                  <p>{project.description}</p>
                </div>
                
                {project.status === 'complete' ? (
                  <Button 
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                    onClick={() => window.open(project.githubLink, '_blank')}
                  >
                    Try It <ExternalLink className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed"
                    disabled
                  >
                    Coming Soon <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </GlassSurface>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
