declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}
declare module '*.module.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module '*.less' {
  const content: {[className: string]: string};
  export = content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_KEY_INFURA: string,
    REACT_APP_API_URL_FANTOM: string,
    REACT_APP_EXAMPLE_ADDRESS: string,
  }
}