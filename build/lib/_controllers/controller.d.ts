import { Controller, ControllerTypes } from '../_types';
declare const getController: (controllerType: ControllerTypes) => Promise<Controller>;
export default getController;
