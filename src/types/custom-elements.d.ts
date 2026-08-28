import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'meting-js': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        auto?: string;
        fixed?: boolean;
        theme?: string;
        volume?: number;
        IrcType?: boolean | number;
      };
    }
  }
}
