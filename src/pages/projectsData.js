export const projects = [
  {
    id: "social-media-app",
    title: "Social Media App",
    shortDescription: "A social media platform built with Cassandra, featuring posts, messages, likes, and hashtags.",
    concept: {
      overview: "A modern social media platform designed to handle large-scale data with high availability and fault tolerance.",
      problem: "Traditional SQL databases struggle with the scale and performance requirements of social media applications.",
      solution: "Leveraging Cassandra's distributed architecture to handle massive amounts of social data efficiently.",
      keyFeatures: [
        "Real-time post updates and notifications",
        "Distributed message system",
        "Scalable hashtag indexing",
        "Fault-tolerant data storage",
      ]
    },
    technical: {
      architecture: "Microservices architecture with event-driven components",
    },
    images: {
      main: "/projects/reseau_home.png",
      screenshots: [
        {
          url: "/projects/reseau_add_post.png",
          caption: "Add post interface"
        },
        {
          url: "/projects/reseau_edite_profile_info.png",
          caption: "Edit profile info page"
        },
        {
          url: "/projects/reseau_home.png",
          caption: "Home page"
        },
        {
          url: "/projects/reseau_login.png",
          caption: "Login screen"
        },
        {
          url: "/projects/reseau_my_profile.png",
          caption: "User profile overview"
        },
        {
          url: "/projects/reseau_sign_up.png",
          caption: "Sign-up page"
        },
        {
          url: "/projects/reseau_user_conversation.png",
          caption: "User conversation view"
        },
        {
          url: "/projects/reseau_user_freinds.png",
          caption: "Friends list"
        },
        {
          url: "/projects/reseau_user_messages.png",
          caption: "User messages interface"
        },
        {
          url: "/projects/reseau_user_profile.png",
          caption: "User profile page"
        }
      ],
      architecture: "/social-media/architecture-diagram.svg"
    },
    technologies: [
      {
        name: "React",
        version: "18.2.0",
        usage: "Frontend framework for building the user interface"
      },
      {
        name: "Node.js",
        version: "20.14.0",
        usage: "Backend server runtime"
      },
      {
        name: "Cassandra",
        version: "4.1.8",
        usage: "Distributed database for storing social data"
      },
      {
        name: "TailwindCSS",
        version: "3.4.17",
        usage: "Utility-first CSS framework for styling"
      }
    ],
    performance: {
      metrics: [
        "99.9% uptime",
        "Average response time < 100ms",
      ],
      optimizations: [
        "Database query optimization",
        "Lazy loading of images",
        "Code splitting"
      ]
    },
    links: {
      demo: "https://social.example.com",
      github: "https://github.com/example/social-media-app",
      docs: "https://docs.social.example.com"
    }
  },
  {
    id: "trip-booking-system",
    title: "Charming Tours 2 Morocco",
    shortDescription: "A tour booking platform where users can browse and reserve trips, with an admin dashboard for managing reservations.",
    concept: {
      overview: "A comprehensive travel booking platform that connects travelers with unique experiences.",
      problem: "Traditional travel booking systems lack personalization and real-time availability updates.",
      solution: "Building a modern platform with real-time inventory management and personalized recommendations.",
      keyFeatures: [
        "Real-time availability checking",
        "Personalized trip recommendations",
        "Administrative dashboard",
        "Dynamic pricing engine",
        "Review and rating system"
      ]
    },
    technical: {
      architecture: "Monolithic Laravel application with React frontend",
    },
    images: {
      main: "./projects/ct2m2.png",
      screenshots: [
        {
          url: "./projects/ct2m2.png",
          caption: "Trip search interface"
        },
        {
          url: "./projects/ct2m1.png",
          caption: "interface"
        },
        {
          url: "./projects/ct2m3.jpeg",
          caption: "Booking process"
        },
        {
          url: "./projects/ct2m4.jpeg",
          caption: "Admin dashboard"
        },
        {
          url: "./projects/ct2m5.png",
          caption: "Booking analytics"
        },
        {
          url: "./projects/ct2m6.png",
          caption: "Booking analytics"
        },
        {
          url: "./projects/ct2m7.png",
          caption: "Booking analytics"
        }
      ],
      architecture: "./logo.svg"
    },
    technologies: [
      {
        name: "Laravel",
        version: "11.9",
        usage: "Backend framework"
      },
      {
        name: "React",
        version: "18.2.0",
        usage: "Frontend framework"
      },
      {
        name: "MySQL",
        version: "8.0",
        usage: "Database"
      },
      {
        name: "TailwindCSS",
        version: "3.4.17",
        usage: "Styling"
      }
    ],
    performance: {
      metrics: [
        "99.5% uptime",
        "Average response time < 400ms"
      ],
      optimizations: [
        "Database query optimization",
        "Image CDN",
        "Lazy loading",
        "Rate limiting"
      ]
    },
    links: {
      demo: "https://charmingtours2morocco.com",
      github: "https://github.com/example/trip-booking-system",
      docs: "https://docs.trips.example.com"
    }
  },
  {
    "id": "bitcoin-price-prediction",
    "title": "Bitcoin Price Prediction Model",
    "shortDescription": "A deep learning model for predicting Bitcoin price fluctuations using historical financial data.",
    "concept": {
      "overview": "An advanced machine learning system for Bitcoin market analysis and prediction.",
      "problem": "Traditional analysis tools for Bitcoin lack the ability to process complex market patterns effectively.",
      "solution": "Implementing deep learning models to analyze multiple data sources and predict Bitcoin price movements.",
      "keyFeatures": [
        "Real-time market data processing",
        "Bitcoin price fluctuation analysis",
        "Technical indicator integration"
      ]
    },
    "technical": {
      "architecture": "Microservices architecture with ML pipeline",
    },
    "images": {
      "main": "./projects/deep_learning_home.png",
      "screenshots": [
        {
          "url": "./projects/deep_learning_model_info.png",
          "caption": "Deep learning model information"
        },
        {
          "url": "./projects/deep_learning_prediction.png",
          "caption": "Predictions using the deep learning model"
        },
        {
          "url": "./projects/deep_learning_test_predict.png",
          "caption": "Test data prediction results"
        },
        {
          "url": "./projects/deep_learning_training_predict.png",
          "caption": "Training phase prediction results"
        },
        {
          "url": "./projects/deep_learning_training_resulte_loss_training.png",
          "caption": "Training loss chart during deep learning process"
        }
      ],
      "architecture": "/projects/architecture-diagram.svg"
    },
    "technologies": [
      {
        "name": "Python",
        "version": "3.11",
        "usage": "Core programming language"
      },
      {
        "name": "TensorFlow",
        "version": "2.18.0",
        "usage": "Deep learning framework"
      },
      {
        "name": "Pandas",
        "version": "2.2.3",
        "usage": "Data manipulation"
      },
      {
        "name": "Scikit-learn",
        "version": "1.6.1",
        "usage": "Machine learning utilities"
      }
    ],
    "performance": {
      "metrics": [
        "85% prediction accuracy",
        "Sub-second prediction time",
        "Processing 1M data points"
      ],
      "optimizations": [
        "GPU acceleration",
        "Distributed training",
        "Batch prediction support"
      ]
    },
    "links": {
      "demo": "https://bitcoin.example.com",
      "github": "https://github.com/example/bitcoin-price-prediction",
      "docs": "https://docs.bitcoin.example.com"
    }
  }

];

export default projects;