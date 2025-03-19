import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiUpload, FiCheck } from 'react-icons/fi';

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
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

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Check file size (max 2MB)
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
    
    // Basic validation
    if (!formData.name || !formData.role || !formData.content || !avatarPreview) {
      setError('All fields are required');
      return;
    }

    try {
      setSubmitting(true);
      
      // In a real implementation, this would send the data to your server
      // Here we're simulating a server request
      const testimonialData = {
        ...formData,
        id: Date.now(), // Temporary ID
        image: avatarPreview,
        approved: false, // Default to unapproved
        submittedAt: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Testimonial submitted:', testimonialData);
      // In a real implementation, you would send this data to your backend
      // which would save it to a JSON file
      
      setSubmitted(true);
      // Reset form after submission
      setTimeout(() => {
        setFormData({ name: '', role: '', content: '', rating: 5 });
        setAvatarPreview(null);
        setSubmitted(false);
      }, 3000);
      
    } catch (err) {
      setError('Failed to submit testimonial. Please try again later.');
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="submit-testimonial" className="py-16 bg-black relative">
      <div className="absolute inset-0 bg-blue-500/5 background-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-purple-500/10 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Share Your Experience
          </h2>
          <p className="text-xl text-blue-300/80 mt-4">
            Your feedback is valuable to me
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
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
                          <span className="text-xs text-blue-400/80">Upload Avatar</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-blue-300 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-blue-300 mb-2">Role / Company</label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                      placeholder="Your position & company"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-blue-300 mb-2">Your Testimonial</label>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      rows="4"
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
                      placeholder="Share your experience working with me"
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
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 px-4 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden"
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
          
          <div className="text-center mt-6 text-blue-400/70 text-sm">
            All submissions will be reviewed before being published.
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialForm;