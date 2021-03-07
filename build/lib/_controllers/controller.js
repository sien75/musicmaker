const getController = async function (controllerType) {
    let rtn;
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
