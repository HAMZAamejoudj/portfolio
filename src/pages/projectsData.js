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
        database: {
          type: "Cassandra",
          schema: "Optimized for social graph queries",
          dataModeling: "Denormalized data structure for efficient reads"
        },
        apis: [
          "RESTful API for client communication",
          "WebSocket for real-time updates",
          "GraphQL for complex data queries"
        ],
        deployment: "Kubernetes cluster with auto-scaling"
      },
      documentation: {
        setup: "Detailed steps for local development environment setup",
        api: "Complete API documentation with examples",
        deployment: "Production deployment guide",
        testing: "Testing strategies and procedures"
      },
      images: {
        main: "/social-media/main.jpg",
        screenshots: [
          {
            url: "/social-media/dashboard.jpg",
            caption: "Main dashboard showing user feed"
          },
          {
            url: "/social-media/profile.jpg",
            caption: "User profile page"
          },
          {
            url: "/social-media/messages.jpg",
            caption: "Messaging interface"
          },
          {
            url: "/social-media/analytics.jpg",
            caption: "Analytics dashboard"
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
          version: "18.x",
          usage: "Backend server runtime"
        },
        {
          name: "Cassandra",
          version: "4.x",
          usage: "Distributed database for storing social data"
        },
        {
          name: "TailwindCSS",
          version: "3.x",
          usage: "Utility-first CSS framework for styling"
        }
      ],
      performance: {
        metrics: [
          "99.9% uptime",
          "Average response time < 100ms",
          "Supports 100k concurrent users",
          "5M daily active users"
        ],
        optimizations: [
          "Redis caching layer",
          "CDN for static assets",
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
      title: "Trip Booking System",
      shortDescription: "A tour booking platform where users can browse and reserve trips, with an admin dashboard for managing reservations.",
      concept: {
        overview: "A comprehensive travel booking platform that connects travelers with unique experiences.",
        problem: "Traditional travel booking systems lack personalization and real-time availability updates.",
        solution: "Building a modern platform with real-time inventory management and personalized recommendations.",
        keyFeatures: [
          "Real-time availability checking",
          "Personalized trip recommendations",
          "Integrated payment processing",
          "Administrative dashboard",
          "Dynamic pricing engine",
          "Review and rating system"
        ]
      },
      technical: {
        architecture: "Monolithic Laravel application with React frontend",
        database: {
          type: "MySQL",
          schema: "Normalized relational database",
          dataModeling: "Optimized for booking transactions"
        },
        apis: [
          "RESTful API for frontend communication",
          "Payment gateway integration",
          "Email notification system",
          "Third-party booking APIs"
        ],
        deployment: "AWS EC2 with auto-scaling"
      },
      documentation: {
        setup: "Local development environment setup guide",
        api: "API documentation with Swagger",
        deployment: "AWS deployment guide",
        testing: "E2E and unit testing procedures"
      },
      images: {
        main: "/trips/main.jpg",
        screenshots: [
          {
            url: "/trips/search.jpg",
            caption: "Trip search interface"
          },
          {
            url: "/trips/booking.jpg",
            caption: "Booking process"
          },
          {
            url: "/trips/admin.jpg",
            caption: "Admin dashboard"
          },
          {
            url: "/trips/analytics.jpg",
            caption: "Booking analytics"
          }
        ],
        architecture: "/trips/architecture-diagram.svg"
      },
      technologies: [
        {
          name: "Laravel",
          version: "10.x",
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
          version: "3.x",
          usage: "Styling"
        }
      ],
      performance: {
        metrics: [
          "99.5% uptime",
          "Average response time < 200ms",
          "Handles 10k bookings/day",
          "50k monthly active users"
        ],
        optimizations: [
          "Database query optimization",
          "Image CDN",
          "Server-side caching",
          "Lazy loading",
          "Rate limiting"
        ]
      },
      links: {
        demo: "https://trips.example.com",
        github: "https://github.com/example/trip-booking-system",
        docs: "https://docs.trips.example.com"
      }
    },
    {
      id: "forex-prediction",
      title: "Forex Prediction Model",
      shortDescription: "A deep learning model for predicting Forex exchange rate fluctuations using historical financial data.",
      concept: {
        overview: "An advanced machine learning system for forex market analysis and prediction.",
        problem: "Traditional forex analysis tools lack the ability to process complex market patterns effectively.",
        solution: "Implementing deep learning models to analyze multiple data sources and predict market movements.",
        keyFeatures: [
          "Real-time market data processing",
          "Multi-currency pair analysis",
          "Technical indicator integration",
          "Sentiment analysis of news",
          "Automated trading signals",
          "Risk assessment metrics"
        ]
      },
      technical: {
        architecture: "Microservices architecture with ML pipeline",
        database: {
          type: "TimescaleDB",
          schema: "Time-series optimized schema",
          dataModeling: "Efficient storage of temporal data"
        },
        apis: [
          "REST API for predictions",
          "WebSocket for real-time updates",
          "Data ingestion pipeline",
          "Model serving API"
        ],
        deployment: "GPU-enabled cloud infrastructure"
      },
      documentation: {
        setup: "Model training environment setup",
        api: "Prediction API documentation",
        deployment: "Model deployment guide",
        testing: "Model validation procedures"
      },
      images: {
        main: "/forex/main.jpg",
        screenshots: [
          {
            url: "/forex/dashboard.jpg",
            caption: "Prediction dashboard"
          },
          {
            url: "/forex/analysis.jpg",
            caption: "Technical analysis view"
          },
          {
            url: "/forex/backtest.jpg",
            caption: "Backtesting results"
          },
          {
            url: "/forex/metrics.jpg",
            caption: "Performance metrics"
          }
        ],
        architecture: "/forex/architecture-diagram.svg"
      },
      technologies: [
        {
          name: "Python",
          version: "3.9",
          usage: "Core programming language"
        },
        {
          name: "TensorFlow",
          version: "2.x",
          usage: "Deep learning framework"
        },
        {
          name: "Pandas",
          version: "1.5.x",
          usage: "Data manipulation"
        },
        {
          name: "Scikit-learn",
          version: "1.0",
          usage: "Machine learning utilities"
        }
      ],
      performance: {
        metrics: [
          "85% prediction accuracy",
          "Sub-second prediction time",
          "Processing 1M data points/day",
          "Real-time analysis of 50 currency pairs"
        ],
        optimizations: [
          "GPU acceleration",
          "Distributed training",
          "Feature engineering pipeline",
          "Model quantization",
          "Batch prediction support"
        ]
      },
      links: {
        demo: "https://forex.example.com",
        github: "https://github.com/example/forex-prediction",
        docs: "https://docs.forex.example.com"
      }
    },
    {
      id: "big-data-analysis",
      title: "Big Data Analysis Platform",
      shortDescription: "A system analyzing socio-economic data to evaluate the impact of public policies, using Hive and machine learning techniques.",
      concept: {
        overview: "A comprehensive platform for analyzing large-scale socio-economic data and policy impacts.",
        problem: "Difficulty in processing and analyzing massive amounts of societal data for policy evaluation.",
        solution: "Building a scalable big data platform with advanced analytics capabilities.",
        keyFeatures: [
          "Distributed data processing",
          "Interactive data visualization",
          "Machine learning models",
          "Policy impact scoring",
          "Demographic analysis",
          "Trend prediction"
        ]
      },
      technical: {
        architecture: "Distributed computing architecture with Hadoop ecosystem",
        database: {
          type: "Hive/HBase",
          schema: "Optimized for analytical queries",
          dataModeling: "Star schema for analytics"
        },
        apis: [
          "REST API for data access",
          "Batch processing API",
          "Analytics API",
          "Visualization API"
        ],
        deployment: "On-premise Hadoop cluster"
      },
      documentation: {
        setup: "Cluster setup guide",
        api: "API documentation",
        deployment: "Deployment procedures",
        testing: "Testing methodology"
      },
      images: {
        main: "/bigdata/main.jpg",
        screenshots: [
          {
            url: "/bigdata/dashboard.jpg",
            caption: "Analytics dashboard"
          },
          {
            url: "/bigdata/visualization.jpg",
            caption: "Data visualization"
          },
          {
            url: "/bigdata/reports.jpg",
            caption: "Automated reports"
          },
          {
            url: "/bigdata/predictions.jpg",
            caption: "Predictive analytics"
          }
        ],
        architecture: "/bigdata/architecture-diagram.svg"
      },
      technologies: [
        {
          name: "Hive",
          version: "3.x",
          usage: "Data warehousing"
        },
        {
          name: "HBase",
          version: "2.x",
          usage: "NoSQL database"
        }
      ],
      performance: {
        metrics: [
          "Processes 5TB data daily",
          "Sub-minute query response",
          "99.9% system availability",
          "Supports 100+ concurrent users"
        ],
        optimizations: [
          "Query optimization",
          "Data partitioning",
          "Caching layer",
          "Parallel processing",
          "Resource management"
        ]
      },
      links: {
        demo: "https://bigdata.example.com",
        github: "https://github.com/example/big-data-analysis",
        docs: "https://docs.bigdata.example.com"
      }
    },
    {
        id: "qcm-exam-prep",
        title: "QCM Exam Preparation App",
        shortDescription: "An interactive QCM (Multiple Choice Question) app to help students prepare for exams with a variety of subjects and difficulty levels.",
        concept: {
          overview: "A comprehensive exam preparation platform with adaptive learning capabilities.",
          problem: "Students struggle with effective exam preparation and progress tracking.",
          solution: "Creating an intelligent platform that adapts to student learning patterns and provides personalized study paths.",
          keyFeatures: [
            "Adaptive question difficulty",
            "Progress tracking",
            "Performance analytics",
            "Personalized study plans",
            "Subject-specific focus areas",
            "Mock exam simulations"
          ]
        },
        technical: {
          architecture: "MERN stack with microservices",
          database: {
            type: "MongoDB",
            schema: "Document-based schema for flexibility",
            dataModeling: "Optimized for question retrieval and analytics"
          },
          apis: [
            "RESTful API for core functionality",
            "Content management API"
          ],
          deployment: "Containerized deployment on cloud platform"
        },
        documentation: {
          setup: "Development environment setup guide",
          api: "API documentation and integration guide",
          deployment: "Deployment and scaling guide",
          testing: "Testing procedures and coverage"
        },
        images: {
          main: "/qcm/main.jpg",
          screenshots: [
            {
              url: "/qcm/dashboard.jpg",
              caption: "Student dashboard"
            },
            {
              url: "/qcm/quiz.jpg",
              caption: "Quiz interface"
            },
            {
              url: "/qcm/analytics.jpg",
              caption: "Performance analytics"
            },
            {
              url: "/qcm/study-plan.jpg",
              caption: "Personalized study plan"
            }
          ],
          architecture: "/qcm/architecture-diagram.svg"
        },
        technologies: [
          {
            name: "React",
            version: "18.2.0",
            usage: "Frontend framework"
          },
          {
            name: "Node.js",
            version: "18.x",
            usage: "Backend runtime"
          },
          {
            name: "MongoDB",
            version: "6.0",
            usage: "Database"
          },
          {
            name: "TailwindCSS",
            version: "3.x",
            usage: "UI styling"
          }
        ],
        performance: {
          metrics: [
            "99.9% uptime",
            "< 500ms response time",
            "100+ daily active users",
          ],
          optimizations: [
            "Question caching",
            "Progressive web app",
            "Lazy loading"
          ]
        },
        links: {
          demo: "https://qcm.example.com",
          github: "https://github.com/example/qcm-exam-prep",
          docs: "https://docs.qcm.example.com"
        }
      }
    ];
    
export default projects;