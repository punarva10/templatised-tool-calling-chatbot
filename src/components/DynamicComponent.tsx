/* eslint-disable @typescript-eslint/no-explicit-any */
import { uiRegistry } from '../lib/uiRegistry'

export default function DynamicComponent({ name, props }: { name: string; props: any }) {
  const Component = uiRegistry.getComponent(name)
  return Component ? <Component {...props} /> : null
}