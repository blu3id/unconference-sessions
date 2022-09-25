import './assets/main.scss';
import App from './App.svelte';

type UnconferenceConfigBranding = {
  logo: string;
  subheading: boolean;
  center: boolean;
};

type UnconferenceConfig = {
  name: string;
  branding: UnconferenceConfigBranding;
  sessionData: string;
  refreshTime: number;
};

declare global {
  interface Document {
    App: UnconferenceConfig;
  }
}

const app = new App({
  target: document.getElementById('app'),
  props: {
    name: document.App.name,
    branding: document.App.branding,
    sessionData: document.App.sessionData,
    refreshTime: document.App.refreshTime,
  },
});

export default app;
export type { UnconferenceConfig, UnconferenceConfigBranding };
