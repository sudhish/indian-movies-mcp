#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Import the improved logging functions
import { log, logError, logWarn } from './logging.js';

// Initialize logging
log('=== MCP Server Starting ===');
log('Node.js version:', process.version);
log('Platform:', process.platform);

// Sample Indian movie database
const indianMovies = [
  {
    title: "3 Idiots",
    year: 2009,
    genre: ["Comedy", "Drama"],
    language: "Hindi",
    rating: 8.4,
    director: "Rajkumar Hirani",
    description: "Two friends search for their long lost companion while reflecting on their college days."
  },
  {
    title: "Dangal",
    year: 2016,
    genre: ["Biography", "Drama", "Sport"],
    language: "Hindi",
    rating: 8.4,
    director: "Nitesh Tiwari",
    description: "Former wrestler Mahavir Singh trains his daughters to become world-class wrestlers."
  },
  {
    title: "Baahubali 2",
    year: 2017,
    genre: ["Action", "Drama"],
    language: "Telugu",
    rating: 8.2,
    director: "S.S. Rajamouli",
    description: "Shiva discovers his legacy and must save his love and his kingdom."
  },
  {
    title: "Taare Zameen Par",
    year: 2007,
    genre: ["Drama", "Family"],
    language: "Hindi",
    rating: 8.4,
    director: "Aamir Khan",
    description: "An eight-year-old boy is thought to be lazy but actually has dyslexia."
  },
  {
    title: "Zindagi Na Milegi Dobara",
    year: 2011,
    genre: ["Adventure", "Comedy", "Drama"],
    language: "Hindi",
    rating: 8.2,
    director: "Zoya Akhtar",
    description: "Three friends on a bachelor trip discover themselves and their friendship."
  },
  {
    title: "Lagaan",
    year: 2001,
    genre: ["Adventure", "Drama", "Musical"],
    language: "Hindi",
    rating: 8.1,
    director: "Ashutosh Gowariker",
    description: "Villagers accept a challenge from British officers to play cricket to avoid taxes."
  },
  {
    title: "Queen",
    year: 2013,
    genre: ["Comedy", "Drama"],
    language: "Hindi",
    rating: 8.2,
    director: "Vikas Bahl",
    description: "A woman goes on her honeymoon alone and discovers herself."
  },
  {
    title: "Tumhari Sulu",
    year: 2017,
    genre: ["Comedy", "Drama"],
    language: "Hindi",
    rating: 7.1,
    director: "Suresh Triveni",
    description: "A housewife becomes a radio jockey and finds her voice."
  },
  {
    title: "Andhadhun",
    year: 2018,
    genre: ["Crime", "Thriller"],
    language: "Hindi",
    rating: 8.2,
    director: "Sriram Raghavan",
    description: "A blind pianist gets embroiled in multiple murders."
  },
  {
    title: "Kumbakonam Gopals",
    year: 2015,
    genre: ["Comedy"],
    language: "Tamil",
    rating: 7.8,
    director: "PC Shekar",
    description: "A hilarious tale of a small-town family."
  }
];

log('Movie database loaded', { movieCount: indianMovies.length });

const server = new Server(
  {
    name: 'indian-movies-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

log('Server instance created with capabilities:', {
  name: 'indian-movies-mcp',
  version: '1.0.0',
  capabilities: { tools: {} }
});

// Note: Client connection detection will be visible through tool requests

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  log('=== RECEIVED LIST TOOLS REQUEST ===');
  log('🎉 CLAUDE IS ASKING FOR OUR TOOLS! 🎉');
  log('Full request object:', JSON.stringify(request, null, 2));
  log('Request method:', request.method);
  log('Request params:', request.params);
  log('Client requesting available tools...');
  
  const toolsResponse = {
    tools: [
      {
        name: 'get_movie_recommendations',
        description: 'Get Indian movie recommendations based on genre, language, or rating preferences',
        inputSchema: {
          type: 'object',
          properties: {
            genre: {
              type: 'string',
              description: 'Preferred genre (e.g., Comedy, Drama, Action, etc.)',
            },
            language: {
              type: 'string', 
              description: 'Preferred language (e.g., Hindi, Telugu, Tamil, etc.)',
            },
            min_rating: {
              type: 'number',
              description: 'Minimum rating (0-10)',
              minimum: 0,
              maximum: 10,
            },
            year_after: {
              type: 'number',
              description: 'Movies released after this year',
            },
          },
        },
      },
      {
        name: 'search_movie',
        description: 'Search for a specific Indian movie by title',
        inputSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Movie title to search for',
            },
          },
          required: ['title'],
        },
      },
      {
        name: 'get_random_movie',
        description: 'Get a random Indian movie recommendation',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
  
  log('=== SENDING LIST TOOLS RESPONSE ===');
  log('Response contains', toolsResponse.tools.length, 'tools:');
  toolsResponse.tools.forEach((tool, index) => {
    log(`Tool ${index + 1}: ${tool.name} - ${tool.description}`);
  });
  log('Full tools response:', JSON.stringify(toolsResponse, null, 2));
  
  return toolsResponse;
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  log('=== RECEIVED TOOL CALL REQUEST ===');
  log('Full request object:', JSON.stringify(request, null, 2));
  log('Request method:', request.method);
  log('Request ID:', request.id);
  
  const { name, arguments: args } = request.params;
  
  log('=== PARSING TOOL CALL ===');
  log('Tool name:', name);
  log('Tool arguments received:', JSON.stringify(args, null, 2));
  log('Arguments type:', typeof args);
  log('Arguments keys:', args ? Object.keys(args) : 'No arguments');

  try {
    switch (name) {
      case 'get_movie_recommendations': {
        log('=== EXECUTING get_movie_recommendations TOOL ===');
        log('Processing movie recommendations request with filters...');
        
        let filteredMovies = [...indianMovies];
        log('Starting with total movies:', { count: filteredMovies.length });

        // Filter by genre
        if (args.genre) {
          log('=== APPLYING GENRE FILTER ===');
          log('Requested genre:', args.genre);
          const beforeCount = filteredMovies.length;
          filteredMovies = filteredMovies.filter(movie =>
            movie.genre.some(g => g.toLowerCase().includes(args.genre.toLowerCase()))
          );
          log('Genre filter results:', { 
            before: beforeCount, 
            after: filteredMovies.length,
            filtered_out: beforeCount - filteredMovies.length
          });
          log('Remaining movies after genre filter:', filteredMovies.map(m => m.title));
        }

        // Filter by language
        if (args.language) {
          log('=== APPLYING LANGUAGE FILTER ===');
          log('Requested language:', args.language);
          const beforeCount = filteredMovies.length;
          filteredMovies = filteredMovies.filter(movie =>
            movie.language.toLowerCase() === args.language.toLowerCase()
          );
          log('Language filter results:', { 
            before: beforeCount, 
            after: filteredMovies.length,
            filtered_out: beforeCount - filteredMovies.length
          });
          log('Remaining movies after language filter:', filteredMovies.map(m => m.title));
        }

        // Filter by minimum rating
        if (args.min_rating) {
          log('=== APPLYING RATING FILTER ===');
          log('Minimum rating requested:', args.min_rating);
          const beforeCount = filteredMovies.length;
          filteredMovies = filteredMovies.filter(movie =>
            movie.rating >= args.min_rating
          );
          log('Rating filter results:', { 
            before: beforeCount, 
            after: filteredMovies.length,
            filtered_out: beforeCount - filteredMovies.length
          });
          log('Remaining movies after rating filter:', filteredMovies.map(m => `${m.title} (${m.rating})`));
        }

        // Filter by year
        if (args.year_after) {
          log('=== APPLYING YEAR FILTER ===');
          log('Movies after year:', args.year_after);
          const beforeCount = filteredMovies.length;
          filteredMovies = filteredMovies.filter(movie =>
            movie.year > args.year_after
          );
          log('Year filter results:', { 
            before: beforeCount, 
            after: filteredMovies.length,
            filtered_out: beforeCount - filteredMovies.length
          });
          log('Remaining movies after year filter:', filteredMovies.map(m => `${m.title} (${m.year})`));
        }

        log('=== FINAL FILTERING RESULTS ===');
        log('Total movies found:', filteredMovies.length);
        log('Final movie list:', filteredMovies.map(m => `${m.title} (${m.year}) - ${m.language}`));

        const response = {
          content: [
            {
              type: 'text',
              text: JSON.stringify(filteredMovies, null, 2),
            },
          ],
        };
        
        log('=== SENDING get_movie_recommendations RESPONSE ===');
        log('Response structure:', {
          content_type: 'text',
          movie_count: filteredMovies.length,
          response_size_chars: JSON.stringify(filteredMovies).length
        });
        log('Full response object:', JSON.stringify(response, null, 2));
        
        return response;
      }

      case 'search_movie': {
        log('=== EXECUTING search_movie TOOL ===');
        log('Processing movie search request...');
        log('Search term received:', args.title);
        log('Search term type:', typeof args.title);
        log('Search term length:', args.title ? args.title.length : 0);
        
        log('=== PERFORMING MOVIE SEARCH ===');
        log('Available movies to search through:', indianMovies.map(m => m.title));
        log('Converting search term to lowercase:', args.title.toLowerCase());
        
        const movie = indianMovies.find(m => {
          const titleMatch = m.title.toLowerCase().includes(args.title.toLowerCase());
          log(`Checking "${m.title}" against "${args.title}": ${titleMatch}`);
          return titleMatch;
        });

        let response;
        if (movie) {
          log('=== MOVIE FOUND ===');
          log('Found movie:', movie.title);
          log('Movie details:', JSON.stringify(movie, null, 2));
          response = {
            content: [
              {
                type: 'text',
                text: JSON.stringify(movie, null, 2),
              },
            ],
          };
        } else {
          log('=== MOVIE NOT FOUND ===');
          log('No movie found for search term:', args.title);
          log('Tried searching in:', indianMovies.length, 'movies');
          response = {
            content: [
              {
                type: 'text',
                text: `No movie found with title containing "${args.title}"`,
              },
            ],
          };
        }
        
        log('=== SENDING search_movie RESPONSE ===');
        log('Response type:', movie ? 'Movie details' : 'Not found message');
        log('Full search response:', JSON.stringify(response, null, 2));
        return response;
      }

      case 'get_random_movie': {
        log('=== EXECUTING get_random_movie TOOL ===');
        log('Processing random movie request...');
        log('Total movies available for random selection:', indianMovies.length);
        
        log('=== GENERATING RANDOM SELECTION ===');
        const randomIndex = Math.floor(Math.random() * indianMovies.length);
        log('Generated random index:', randomIndex);
        log('Index range: 0 to', indianMovies.length - 1);
        
        const randomMovie = indianMovies[randomIndex];
        log('=== RANDOM MOVIE SELECTED ===');
        log('Selected movie:', randomMovie.title);
        log('Movie index:', randomIndex);
        log('Movie details:', JSON.stringify(randomMovie, null, 2));
        
        const response = {
          content: [
            {
              type: 'text',
              text: JSON.stringify(randomMovie, null, 2),
            },
          ],
        };
        
        log('=== SENDING get_random_movie RESPONSE ===');
        log('Response contains movie:', randomMovie.title);
        log('Full random movie response:', JSON.stringify(response, null, 2));
        return response;
      }

      default:
        logError('Unknown tool requested:', name);
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    logError('Error in tool execution:', {
      tool: name,
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
});

// Note: MCP SDK doesn't expose connect/disconnect events
// Connection status is logged in the runServer function

async function runServer() {
  try {
    log('=== INITIALIZING MCP SERVER ===');
    log('Creating StdioServerTransport...');
    const transport = new StdioServerTransport();
    log('Transport created successfully');
    
    log('=== CONNECTING SERVER TO TRANSPORT ===');
    log('Attempting to connect server to stdio transport...');
    await server.connect(transport);
    log('Server connected to transport successfully');
    
    log('=== MCP SERVER CONNECTED AND READY ===');
    log('Server name: indian-movies-mcp');
    log('Server version: 1.0.0');
    log('Transport: stdio');
    log('Available tools: 3 (get_movie_recommendations, search_movie, get_random_movie)');
    log('Movie database size:', indianMovies.length, 'movies');
    
    console.error('Indian Movies MCP server running on stdio');
    console.error('Waiting for client connections...');
    
    // Keep the process alive and log periodic status
    setInterval(() => {
      log('=== SERVER HEARTBEAT ===');
      log('Server status: running');
      log('Uptime:', process.uptime(), 'seconds');
      log('Memory usage:', JSON.stringify(process.memoryUsage(), null, 2));
    }, 60000); // Every minute
    
  } catch (error) {
    log('=== FATAL ERROR DURING SERVER STARTUP ===');
    logError('FATAL ERROR starting server:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('=== SERVER SHUTTING DOWN (SIGINT) ===');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('=== SERVER SHUTTING DOWN (SIGTERM) ===');
  process.exit(0);
});

runServer().catch((error) => {
  logError('FATAL ERROR in runServer:', {
    error: error.message,
    stack: error.stack
  });
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});
