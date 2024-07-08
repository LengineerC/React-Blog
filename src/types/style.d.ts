declare module "*.scss"{
    const style:{[className: string]: string};
    export default style;
}

// declare module "aplayer"{
//     const APlayer:any;
//     export default APlayer;
// }

declare namespace JSX{
    interface IntrinsicElements{
        'meting-js':any,
    }
}
