declare module '*.scss' {
  const style: { [className: string]: string };
  export default style;
}

// declare module "aplayer"{
//     const APlayer:any;
//     export default APlayer;
// }

declare module 'marked-katex-extension' {
  import func from 'marked-katex-extension';
  export default func;
}

declare module 'jinrishici' {
  export function load(onSuccess: (result: any) => void, onError?: (error: any) => void): void;
}
