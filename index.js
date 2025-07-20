#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

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

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
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
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'get_movie_recommendations': {
      let filteredMovies = [...indianMovies];

      // Filter by genre
      if (args.genre) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.genre.some(g => g.toLowerCase().includes(args.genre.toLowerCase()))
        );
      }

      // Filter by language
      if (args.language) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.language.toLowerCase() === args.language.toLowerCase()
        );
      }

      // Filter by minimum rating
      if (args.min_rating) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.rating >= args.min_rating
        );
      }

      // Filter by year
      if (args.year_after) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.year > args.year_after
        );
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(filteredMovies, null, 2),
          },
        ],
      };
    }

    case 'search_movie': {
      const movie = indianMovies.find(m =>
        m.title.toLowerCase().includes(args.title.toLowerCase())
      );

      if (movie) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(movie, null, 2),
            },
          ],
        };
      } else {
        return {
          content: [
            {
              type: 'text',
              text: `No movie found with title containing "${args.title}"`,
            },
          ],
        };
      }
    }

    case 'get_random_movie': {
      const randomMovie = indianMovies[Math.floor(Math.random() * indianMovies.length)];
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(randomMovie, null, 2),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Indian Movies MCP server running on stdio');
}

runServer().catch(console.error);
