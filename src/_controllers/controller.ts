import { Controller, ControllerType } from '../_types';

const getController = async function (
    controllerType: ControllerType
): Promise<Controller> {
    let rtn: Controller;
    switch (controllerType) {
        default: {
            rtn = (await import('./normal')).default as Controller;
            break;
        }
    }
    return rtn;
};

export default getController;
