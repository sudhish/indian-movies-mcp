#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import express from 'express';
import cors from 'cors';

// Your movie database (same as before)
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
  // ... add all your other movies
];

console.log('Starting MCP HTTP Server...');

const server = new Server(
  {
    name: 'indian-movies-mcp-http',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Set up the same request handlers as before
server.setRequestHandler(ListToolsRequestSchema, async () => {
  console.log('HTTP: Received tools list request');
  return {
    tools: [
      {
        name: 'get_movie_recommendations',
        description: 'Get Indian movie recommendations based on genre, language, or rating preferences',
        inputSchema: {
          type: 'object',
          properties: {
            genre: { type: 'string', description: 'Preferred genre' },
            language: { type: 'string', description: 'Preferred language' },
            min_rating: { type: 'number', description: 'Minimum rating (0-10)', minimum: 0, maximum: 10 },
            year_after: { type: 'number', description: 'Movies released after this year' },
          },
        },
      },
      {
        name: 'search_movie',
        description: 'Search for a specific Indian movie by title',
        inputSchema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Movie title to search for' },
          },
          required: ['title'],
        },
      },
      {
        name: 'get_random_movie',
        description: 'Get a random Indian movie recommendation',
        inputSchema: { type: 'object', properties: {} },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  console.log('HTTP: Received tool call:', request.params.name);
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'get_movie_recommendations': {
      let filteredMovies = [...indianMovies];

      if (args.genre) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.genre.some(g => g.toLowerCase().includes(args.genre.toLowerCase()))
        );
      }

      if (args.language) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.language.toLowerCase() === args.language.toLowerCase()
        );
      }

      if (args.min_rating) {
        filteredMovies = filteredMovies.filter(movie => movie.rating >= args.min_rating);
      }

      if (args.year_after) {
        filteredMovies = filteredMovies.filter(movie => movie.year > args.year_after);
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(filteredMovies, null, 2) }],
      };
    }

    case 'search_movie': {
      const movie = indianMovies.find(m =>
        m.title.toLowerCase().includes(args.title.toLowerCase())
      );

      return {
        content: [
          {
            type: 'text',
            text: movie ? JSON.stringify(movie, null, 2) : `No movie found with title containing "${args.title}"`,
          },
        ],
      };
    }

    case 'get_random_movie': {
      const randomMovie = indianMovies[Math.floor(Math.random() * indianMovies.length)];
      return {
        content: [{ type: 'text', text: JSON.stringify(randomMovie, null, 2) }],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Create Express app for HTTP transport
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Create SSE transport for MCP over HTTP
const transport = new SSEServerTransport('/message', app);

async function runHttpServer() {
  await server.connect(transport);
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'healthy', server: 'indian-movies-mcp' });
  });
  
  // Start the HTTP server
  app.listen(PORT, () => {
    console.log(`MCP HTTP Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`MCP endpoint: http://localhost:${PORT}/message`);
  });
}

runHttpServer().catch(console.error);
