import { Controller, ControllerType } from '../_types';

const getController = async function (
    controllerType: ControllerType
): Promise<Controller> {
    let rtn: Controller;
    switch (controllerType) {
        case 'controller_custom': {
            rtn = (await import('./custom')).default;
            break;
        }
        default: {
            rtn = (await import('./normal')).default;
            break;
        }
    }
    return rtn;
};

export default getController;
