import { App } from "vue";
import version from "./version";

type ComponentType = any;

export interface NUiInstance {
  version: string
  componentPrefix: string
  install: (app: App) => void
}

interface NUiCreateOptions {
  components?: ComponentType[]
  componentPrefix?: string
}

function create({
  componentPrefix = "N", //组件的前缀
  components = [],
}: NUiCreateOptions = {}): NUiInstance {
  const installTargets: App[] = [];
  function registerComponent(
    app: App,
    name: string,
    component: ComponentType
  ): void {
    const registered = app.component(componentPrefix + name);
    // 如果还没注册
    if (!registered) {
      app.component(componentPrefix + name, component);
    }
  }
  function install(app: App): void {
    // 如果已经安装
    if (installTargets.includes(app)) return;
    installTargets.push(app);
    components.forEach((component) => {
      const { name, alias } = component;
      registerComponent(app, name, component);
      // 如果有别名的话
      if (alias) {
        alias.forEach((aliasName: string) => {
          registerComponent(app, aliasName, component)
        });
      }
    });
  }
  return {
    version,
    componentPrefix,
    install,
  };
}

export default create;
