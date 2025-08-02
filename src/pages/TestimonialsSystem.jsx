import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiUpload, FiCheck } from 'react-icons/fi';

// Sample testimonials data
const initialTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechCorp",
    image: "/images/sarah.jpg",
    content: "Working with Hamza was an exceptional experience. His attention to detail and innovative solutions transformed our project.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    role: "CTO at TechCorp",
    image: "/images/john.jpg",
    content: "Hamza's expertise in UI/UX design was invaluable. His ability to understand our vision and bring it to life was impressive.",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="bg-gradient-to-b from-white/5 to-transparent backdrop-blur-lg rounded-2xl p-8 border border-white/10 h-full"
  >
    <div className="flex flex-col items-center text-center gap-6">
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img 
            src={testimonial.image || "/images/placeholder.jpg"} 
            alt={testimonial.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-sm group-hover:blur-md transition-all duration-300" />
        <motion.div 
          className="absolute -inset-2 rounded-full border-2 border-blue-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <FiStar
                size={20}
                className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
              />
            </motion.div>
          ))}
        </div>

        <blockquote>
          <p className="text-gray-300 text-lg leading-relaxed italic">"{testimonial.content}"</p>
        </blockquote>

        <div>
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {testimonial.name}
          </h3>
          <p className="text-blue-400/80">{testimonial.role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const TestimonialForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '', // Added email field
      role: '',
      content: '',
      rating: 5,
    });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleRatingChange = (newRating) => {
      setFormData(prev => ({ ...prev, rating: newRating }));
    };
  
    const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
  
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
      }
  
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      if (!formData.name || !formData.email || !formData.role || !formData.content) {
        setError('Name, email, role, and testimonial content are required');
        return;
      }
  
      try {
        setSubmitting(true);
  
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email); // Added email
        formDataToSend.append('role', formData.role);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('rating', formData.rating);
        if (fileInputRef.current.files[0]) {
          formDataToSend.append('image', fileInputRef.current.files[0]);
        }
  
        const response = await fetch('http://localhost/portfolio_api/save_testimonial.php', {
          method: 'POST',
          body: formDataToSend,
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit testimonial');
        }
  
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message);
        }
  
        // Show success message
        setSubmitted(true);
        setTimeout(() => {
          onSubmit(result.testimonial);
          onClose();
          setFormData({ name: '', email: '', role: '', content: '', rating: 5 });
          setAvatarPreview(null);
          setSubmitted(false);
        }, 3000); // Wait 3 seconds before closing
      } catch (err) {
        setError(err.message || 'Failed to submit testimonial. Please try again later.');
        console.error('Submission error:', err);
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-white/5 to-transparent backdrop-blur-lg rounded-2xl p-8 border border-white/10"
      >
        {submitted ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center text-center py-10"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <FiCheck className="text-green-400" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Thank You!</h3>
            <p className="text-blue-300/80">Your testimonial has been submitted and will be reviewed shortly.</p>
          </motion.div>
        ) : (
        <>
          <div className="mb-8">
            <div 
              onClick={() => fileInputRef.current.click()}
              className="w-32 h-32 mx-auto relative group cursor-pointer"
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-sm group-hover:blur-md transition-all duration-300" />
              <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-800 border-2 border-blue-400/30 flex items-center justify-center group-hover:border-blue-400/60 transition-all duration-300">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <FiUpload size={24} className="text-blue-400/80 mb-2" />
                    <span className="text-xs text-blue-400/80">Upload Avatar (Optional)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-blue-300 mb-2">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-blue-300 mb-2">Email *</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                placeholder="Your email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-blue-300 mb-2">Role / Company *</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                placeholder="Your position & company"
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-blue-300 mb-2">Your feedback *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="4"
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                placeholder="Share your experience working with me"
                required
              />
            </div>
            
            <div>
              <label className="block text-blue-300 mb-2">Rating</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none"
                  >
                    <FiStar
                      size={24}
                      className={star <= formData.rating 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-600 hover:text-gray-400"}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {error && (
              <div className="text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 px-4 rounded-lg text-white font-medium hover:cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Testimonial"
              )}
            </motion.button>
          </div>
        </>
      )}
    </motion.form>
  );
};

const TestimonialsSystem = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrevious = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => 
      (prev + 1) % testimonials.length
    );
  };

  const handleAddTestimonial = (newTestimonial) => {
    setTestimonials(prev => [...prev, newTestimonial]);
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <section id='testimonials' className="min-h-screen relative py-20">
      {/* <div className="absolute inset-0 background-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/50" /> */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            What People Are Saying
          </h2>
          <p className="text-blue-300/80 max-w-2xl mx-auto">
            Hear from clients and colleagues who have worked with me. Your feedback helps me grow and improve!
          </p>
        </div>

        {/* Testimonials Carousel or Form */}
        <div className="relative max-w-4xl mx-auto mb-16">
          {showForm ? (
            <TestimonialForm onSubmit={handleAddTestimonial} onClose={() => setShowForm(false)} />
          ) : (
            <>
              <AnimatePresence mode='wait'>
                {testimonials.length > 0 && (
                  <motion.div
                    key={testimonials[currentIndex].id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <TestimonialCard testimonial={testimonials[currentIndex]} />
                  </motion.div>
                )}
              </AnimatePresence>

              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute top-1/2 -left-16 transform -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <FiChevronLeft className="text-white" size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute top-1/2 -right-16 transform -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <FiChevronRight className="text-white" size={24} />
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Add Testimonial Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleForm}
            className="bg-gradient-to-r from-blue-500 to-purple-500 py-3 px-6 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
          >
            {showForm ? "Close Form" : "Add Your Testimonial"}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSystem;