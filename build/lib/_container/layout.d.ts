/// <reference types="react" />
import { Position } from '../_types';
interface Props {
    position: Position;
    children: JSX.Element | JSX.Element[];
}
declare const Layout: ({ position, children }: Props) => JSX.Element;
export default Layout;
