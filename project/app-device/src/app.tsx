export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('子应用[app-device] bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('子应用[app-device] mount', props);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('子应用[app-device] unmount', props);
  },
};
