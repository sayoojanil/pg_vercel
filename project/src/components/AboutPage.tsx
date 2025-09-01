import React from "react";
import { 
  Mail, 
  User, 
  Shield, 
  Home, 
  Star,
  Target,
  Users,
  Award,
  CheckCircle
} from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About ShyamaPrabha Women's PG
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Dedicated to providing secure, comfortable, and affordable accommodations for women, 
          with verified properties and comprehensive safety measures.
        </p>
      </div>

      {/* Mission and Values */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-3 text-blue-600" />
            Our Mission & Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To revolutionize women's accommodation by creating a trusted platform that 
                connects women with verified, safe, and comfortable paying guest facilities 
                while maintaining transparency and affordability.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg text-gray-800 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To become the most trusted platform for women's accommodations, setting 
                industry standards for safety, comfort, and community building across the country.
              </p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-8 border-t border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800">Safety First</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Every decision prioritizes the safety and security of our residents.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800">Transparency</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Clear communication and honest dealings with all stakeholders.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800">Empowerment</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Enabling women to live independently with confidence and dignity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Information */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <Home className="h-6 w-6 mr-3 text-blue-600" />
            Platform Overview
          </h2>
          <p className="text-gray-600">
            Comprehensive details about our services and technical infrastructure.
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-700">Platform Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 font-medium">
              SafeStay Women's PG
            </dd>
          </div>

          <div className="px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 bg-blue-50">
            <dt className="text-sm font-medium text-gray-700">Our Solution</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              We address the critical need for safe, verified accommodations for women by 
              thoroughly vetting all properties, ensuring security compliance, maintaining 
              quality standards, and providing a seamless booking experience with 24/7 support.
            </dd>
          </div>

          <div className="px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-700">Key Features</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
              <ul className="list-disc pl-5 space-y-2">
                <li>Rigorous property verification and security audits</li>
                <li>Women-only properties with controlled access systems</li>
                <li>All-inclusive pricing with no hidden charges</li>
                <li>Advanced search with location and amenities filtering</li>
                <li>Round-the-clock resident support system</li>
                <li>Regular quality inspections and feedback mechanism</li>
              </ul>
            </dd>
          </div>

        </div>
      </div>

      {/* Safety Commitment */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 bg-gradient-to-r from-green-50 to-teal-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-3 text-green-600" />
            Safety & Security Framework
          </h2>
          <p className="text-gray-600 mb-6">
            Our comprehensive safety protocol ensures peace of mind for residents and their families.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-start mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Property Verification</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Multi-stage verification process including background checks, security audits, 
                    documentation verification, and physical inspections.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-start mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Emergency Support System</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    24/7 helpline, emergency response team, and neighborhood support network 
                    for immediate assistance in any situation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-start mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Community Standards</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Clearly defined code of conduct for all residents and property managers 
                    to maintain a respectful and harmonious living environment.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-start mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Quality Assurance</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Scheduled and surprise inspections to ensure consistent maintenance of 
                    quality standards, amenities, and safety protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Team */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
            <Users className="h-6 w-6 mr-3 text-purple-600" />
            Development Team
          </h2>
          <p className="text-gray-600">
            Expertise and passion driving our platform's innovation and reliability.
          </p>
        </div>
        
        <div className="px-6 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
              <User className="h-16 w-16 text-purple-500" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">Sayooj Anil V.P.</h3>
              <p className="text-blue-600 font-medium mb-4">Full Stack Developer</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                 
                
               
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Contact</h4>
                <a
                  href="mailto:sayoojanil977@gmail.com"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  sayoojanil977@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-lg overflow-hidden text-white">
        <div className="px-6 py-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Experience the peace of mind that comes with safe, verified accommodations designed exclusively for women.
          </p>
          <button className="bg-white text-blue-700 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Explore Properties
          </button>
        </div>
      </div> */}

      {/* Footer */}
      {/* <div className="text-center py-8">
        <p className="text-gray-600 text-sm flex items-center justify-center">
          Built with <Heart className="h-4 w-4 mx-1 text-pink-500" /> for women's safety and empowerment
        </p>
        <p className="text-gray-500 text-xs mt-2">
          © {new Date().getFullYear()} SafeStay Women's PG. All rights reserved.
        </p> */}
      {/* </div> */}
    </div>
  );
};

export default AboutPage;