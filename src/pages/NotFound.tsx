import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { motion } from 'framer-motion';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-6">
      <SEO 
        title="Page Not Found"
        description="The page you are looking for does not exist or has been moved."
      />
      
      <motion.div 
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-peach block mb-3">
          404 ERROR
        </span>
        <h1 className="font-heading font-extrabold text-5xl md:text-6xl text-brand-text mb-6">
          Page Not Found
        </h1>
        <p className="text-brand-muted leading-relaxed mb-8">
          The page you are looking for does not exist, was removed, or had its name changed. Let's get you back to the home page or showcase my work.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-text hover:bg-brand-peach text-white font-heading font-semibold rounded-brand-sm transition-all duration-200"
          >
            <Home className="w-4 h-4 mr-2" />
            <span>Go Back Home</span>
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center px-6 py-3 border border-brand-border hover:border-brand-peach bg-transparent text-brand-text font-heading font-semibold rounded-brand-sm transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>View My Work</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
