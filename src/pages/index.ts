import type { ComponentType } from 'react';
import type { PageId } from '../site';
import Home from './Home';
import License from './License';
import NotFound from './NotFound';
import Plugins from './Plugins';
import Privacy from './Privacy';

export const pageComponents: Record<PageId, ComponentType> = {
  home: Home,
  plugins: Plugins,
  privacy: Privacy,
  license: License,
  notFound: NotFound,
};
