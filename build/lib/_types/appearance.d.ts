import { MmNames, ControllerTypes } from '.';
export interface Position {
    left: string;
    top: string;
    width: string;
    height: string;
}
export interface MmAppearance {
    channel: number;
    position: Position;
    name: MmNames;
}
export interface ControllerAppearance {
    type: ControllerTypes;
    position: Position;
}
