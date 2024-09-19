/* eslint-disable @typescript-eslint/no-explicit-any */
export type FunctionDefinition = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  logic: (args: any) => Promise<{ message: string; ui?: string; props?: any }>;
}

class FunctionRegistry {
  private static instance: FunctionRegistry;
  private functions: Map<string, FunctionDefinition> = new Map();

  private constructor() {
    this.initializeFunctions();
  }

  public static getInstance(): FunctionRegistry {
    if (!FunctionRegistry.instance) {
      FunctionRegistry.instance = new FunctionRegistry();
    }
    return FunctionRegistry.instance;
  }

  private initializeFunctions() {
    const initialFunctions: FunctionDefinition[] = [
      {
        name: 'get_weather',
        description: 'Get the weather for a specific location',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The city and state, e.g. San Francisco, CA',
            },
          },
          required: ['location'],
        },
        logic: async ({ location }) => {
          // This would typically involve calling a weather API
          const weather = Math.random() > 0.5 ? 'sunny' : 'rainy';
          return {
            message: `The weather in ${location} is ${weather}.`,
            ui: 'WeatherDisplay',
            props: { location, weather },
          };
        },
      },
      {
        name: 'get_time',
        description: 'Get the current time for a specific timezone',
        parameters: {
          type: 'object',
          properties: {
            timezone: {
              type: 'string',
              description: 'The timezone, e.g. America/New_York',
            },
          },
          required: ['timezone'],
        },
        logic: async ({ timezone }) => {
          const time = new Date().toLocaleString('en-US', { timeZone: timezone });
          return {
            message: `The current time in ${timezone} is ${time}.`,
            ui: 'TimeDisplay',
            props: { timezone, time },
          };
        },
      },
    ];

    initialFunctions.forEach(func => this.registerFunction(func));
  }

  registerFunction(func: FunctionDefinition) {
    this.functions.set(func.name, func);
  }

  getFunction(name: string): FunctionDefinition | undefined {
    return this.functions.get(name);
  }

  getAllFunctions(): FunctionDefinition[] {
    return Array.from(this.functions.values());
  }
}

export const functionRegistry = FunctionRegistry.getInstance();