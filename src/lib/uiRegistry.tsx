/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type UIComponent = React.ComponentType<any>;

class UIRegistry {
  private components: Map<string, UIComponent> = new Map();

  registerComponent(name: string, component: UIComponent) {
    this.components.set(name, component);
  }

  getComponent(name: string): UIComponent | undefined {
    return this.components.get(name);
  }
}

export const uiRegistry = new UIRegistry();

// Register components
uiRegistry.registerComponent('TextResponse', ({ text }: { text: string }) => <p>{text}</p>);

uiRegistry.registerComponent('WeatherDisplay', ({ location, weather }: { location: string; weather: string }) => (
  <div className="bg-blue-100 p-4 rounded">
    <h3 className="font-bold">Weather Report</h3>
    <p>Location: {location}</p>
    <p>Weather: {weather}</p>
  </div>
));

uiRegistry.registerComponent('TimeDisplay', ({ timezone, time }: { timezone: string; time: string }) => (
  <div className="bg-green-100 p-4 rounded">
    <h3 className="font-bold">Time Information</h3>
    <p>Timezone: {timezone}</p>
    <p>Current Time: {time}</p>
  </div>
));