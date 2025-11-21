import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';
import SatelliteCollision from '@/components/SatelliteCollision';

const SatelliteCollisionDetail: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-navyDark pt-20">
        <div className="section-container py-10 md:py-16">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center text-purple-light hover:text-purple mb-8 transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Projects
          </Link>

          {/* Hero Section with Animation */}
          <div className="glass-panel p-8 mb-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold mb-3 title-gradient">3D Satellite Collision Detection System</h1>
              <p className="text-xl text-gray-300">Real-time Orbital Mechanics & Risk Assessment Simulator</p>
            </div>

            {/* Live Demo */}
            <div className="w-full h-[500px] rounded-lg overflow-hidden border-2 border-purple/30 shadow-2xl mb-6">
              <SatelliteCollision />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-purple/20 text-purple-light rounded-md font-semibold">C++</span>
              <span className="px-4 py-2 bg-purple/20 text-purple-light rounded-md font-semibold">OpenGL 4.1</span>
              <span className="px-4 py-2 bg-purple/20 text-purple-light rounded-md font-semibold">GLSL</span>
              <span className="px-4 py-2 bg-purple/20 text-purple-light rounded-md font-semibold">Three.js</span>
              <span className="px-4 py-2 bg-purple/20 text-purple-light rounded-md font-semibold">React</span>
            </div>
          </div>

          {/* Overview */}
          <div className="glass-panel p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-light">Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A real-time 3D visualization tool for satellite orbital mechanics and collision risk assessment. This space traffic control simulator models how satellites orbit Earth, predicts potential near-miss events hours in advance, and visualizes what happens when satellites collide.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The system uses real orbital mechanics to track satellites and analyze their future positions, identifying when and where they might get dangerously close. The visualization shows Earth from space with satellite orbits as colored lines, and highlights danger zones with visual markers when collision risks are detected.
            </p>
          </div>

          {/* Key Features */}
          <div className="glass-panel p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-light">Key Features</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple to-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-satellite text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Orbital Risk Prediction Engine</h3>
                  <p className="text-gray-300">
                    The orbital risk prediction engine looks ahead up to one hour, analyzing every satellite pair to find conjunction events. It calculates risk scores based on proximity, relative velocity, and altitude, providing early warning of dangerous situations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple to-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-exclamation-triangle text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Visual Warning System</h3>
                  <p className="text-gray-300">
                    When a near-miss is predicted, pulsing geometric markers appear at the closest approach point and tubular danger corridors show the risk zone. Everything is color-coded from green for safe distances to red for critical threats.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple to-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-explosion text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Debris Field Visualization</h3>
                  <p className="text-gray-300">
                    If satellites actually collide, the system generates realistic debris field visualizations showing how collision fragments disperse in space. The debris spreads outward in two distinct clouds, one for each satellite, demonstrating how collision fragments would disperse in space.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple to-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-globe text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Earth Model</h3>
                  <p className="text-gray-300">
                    The Earth model is fully interactive - you can rotate it by holding Shift and dragging, and it auto-rotates to show time passing. Uses texture mapping with albedo and normal maps for realistic surface detail.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple to-blue rounded-lg flex items-center justify-center">
                  <i className="fas fa-tachometer-alt text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mission Control Interface</h3>
                  <p className="text-gray-300">
                    The mission control interface provides playback controls, speed adjustment up to 500x normal speed, and multiple information panels showing satellite status, active collisions, and detailed conjunction analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Implementation */}
          <div className="glass-panel p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-light">Technical Implementation</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <i className="fas fa-code text-purple-light"></i>
                  Orbital Mechanics
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Satellites use standard Keplerian orbital elements: semi-major axis, eccentricity, inclination, right ascension of ascending node, argument of periapsis, and mean anomaly. Movement calculations solve the two-body problem using Kepler's equation to determine position at any time.
                </p>
                <p className="text-gray-300 leading-relaxed mt-2">
                  The orbital propagation engine calculates both position and velocity vectors by converting from orbital plane coordinates to Earth-Centered Inertial coordinates using rotation matrices. Velocity uses the vis-viva equation based on distance from Earth's center and semi-major axis.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <i className="fas fa-cube text-purple-light"></i>
                  3D Rendering
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  The main view is rendered using OpenGL 4.1 with GLFW for windowing. Earth uses texture mapping with albedo and normal maps for realistic surface detail. Satellite orbits are drawn as colored line segments using OpenGL line primitives. The scene uses GLM for coordinate transformations and perspective projection.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <i className="fas fa-palette text-purple-light"></i>
                  Satellite Models
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Satellites are modeled as 3D objects with central body modules, solar panel arrays, antenna dishes, and flashing beacon lights. The geometry is defined procedurally using OpenGL vertex buffers and rendered with instanced drawing for efficiency. GLM handles all vector and matrix operations for positioning and transformations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <i className="fas fa-layer-group text-purple-light"></i>
                  Debris Simulation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Debris visualization uses OpenGL line rendering with custom shaders. Each debris particle is drawn as a vector line segment representing velocity direction. The two-color system uses vertex color attributes to distinguish debris from each satellite. Particle positions are calculated using orbital mechanics and rendered with instanced drawing for performance.
                </p>
              </div>
            </div>
          </div>

          {/* Color Coding System */}
          <div className="glass-panel p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-light">Satellite Classification</h2>
            <p className="text-gray-300 mb-4">Satellites are color-coded by altitude for easy identification:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-cyan-400">Low Earth Orbit</h3>
                </div>
                <p className="text-gray-300 text-sm">LEO satellites at 160-2,000 km altitude</p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-green-400">Medium Earth Orbit</h3>
                </div>
                <p className="text-gray-300 text-sm">MEO satellites at 2,000-35,786 km altitude</p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-red-400">Geostationary Orbit</h3>
                </div>
                <p className="text-gray-300 text-sm">GEO satellites at ~35,786 km altitude</p>
              </div>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="glass-panel p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-light">Technologies & Languages</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Original C++ Implementation</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-green-400"></i>
                    C++20 (92.1%)
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-green-400"></i>
                    OpenGL 4.1
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-green-400"></i>
                    GLSL Shaders (5.3%)
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-green-400"></i>
                    GLFW & GLEW
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-green-400"></i>
                    GLM (OpenGL Mathematics)
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-green-400"></i>
                    CMake (1.4%)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Web Implementation</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-blue-400"></i>
                    React Three Fiber
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-blue-400"></i>
                    Three.js
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-blue-400"></i>
                    TypeScript
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-blue-400"></i>
                    WebGL
                  </li>
                  <li className="flex items-center gap-2 text-gray-300">
                    <i className="fas fa-check text-blue-400"></i>
                    React Hooks
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Installation & Running */}
          <div className="glass-panel p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-light">Installation & Running</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <i className="fab fa-linux text-blue-400"></i>
                  Linux (Docker - Recommended)
                </h3>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                  <p className="text-gray-300 mb-2"># Build the container</p>
                  <p className="text-green-400 mb-4">docker build -t sat-sim .</p>
                  
                  <p className="text-gray-300 mb-2"># Allow X11 connections and run</p>
                  <p className="text-green-400 mb-2">xhost +local:docker</p>
                  <p className="text-green-400 mb-4">docker run -it --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix --device /dev/dri sat-sim</p>
                  
                  <p className="text-gray-300 mb-2"># Inside container, compile and run</p>
                  <p className="text-green-400 mb-2">cd /app/build</p>
                  <p className="text-green-400 mb-2">cmake ..</p>
                  <p className="text-green-400 mb-2">make -j4</p>
                  <p className="text-green-400">./SatelliteSim</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <i className="fab fa-apple text-gray-400"></i>
                  macOS
                </h3>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                  <p className="text-gray-300 mb-2"># Install dependencies with Homebrew</p>
                  <p className="text-green-400 mb-4">brew install cmake glfw glew glm</p>
                  
                  <p className="text-gray-300 mb-2"># Build and run</p>
                  <p className="text-green-400 mb-2">mkdir build && cd build</p>
                  <p className="text-green-400 mb-2">cmake ..</p>
                  <p className="text-green-400 mb-2">make -j4</p>
                  <p className="text-green-400">./SatelliteSim</p>
                </div>
                <p className="text-gray-400 text-sm mt-2">Requires OpenGL 4.1 support (available on most Macs from 2012 onwards)</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <i className="fab fa-windows text-blue-500"></i>
                  Windows
                </h3>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                  <p className="text-gray-300 mb-2"># Install dependencies using vcpkg</p>
                  <p className="text-green-400 mb-2">git clone https://github.com/Microsoft/vcpkg.git</p>
                  <p className="text-green-400 mb-2">cd vcpkg</p>
                  <p className="text-green-400 mb-2">.\bootstrap-vcpkg.bat</p>
                  <p className="text-green-400 mb-4">.\vcpkg install glfw3 glew glm</p>
                  
                  <p className="text-gray-300 mb-2"># Configure and build with CMake</p>
                  <p className="text-green-400 mb-2">mkdir build && cd build</p>
                  <p className="text-green-400 mb-2">cmake .. -DCMAKE_TOOLCHAIN_FILE=[path to vcpkg]/scripts/buildsystems/vcpkg.cmake</p>
                  <p className="text-green-400">cmake --build . --config Release</p>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Link */}
          <div className="glass-panel p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-purple-light">View Source Code</h2>
            <p className="text-gray-300 mb-6">Explore the complete C++ implementation with detailed documentation</p>
            <a
              href="https://github.com/omar-radwan7/3D-Satellite-Collision-Detection-System"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple to-blue hover:from-purple-light hover:to-blue-light rounded-lg text-white font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <i className="fab fa-github text-xl"></i>
              View on GitHub
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default SatelliteCollisionDetail;
