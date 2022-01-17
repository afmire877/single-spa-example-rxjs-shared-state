import config from "../../../mock/widget-config.json"


export const openMenu = () => {
  document.dispatchEvent(new CustomEvent('openMenu'));
}

export const onReceiveChangeWidgetPage = (url) => {
  document.dispatchEvent(new CustomEvent('changeWidgetPage', { detail: url }));
}