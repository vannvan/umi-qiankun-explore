/*
 * @Description:
 * @Date: 2021-08-06 12:00:47
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-11 14:19:03
 * --------
 * Copyright (c) github.com/vannvan
 */
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
