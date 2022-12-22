import * as DTO from "./types";


// TODO: сделать так https://github.com/feature-sliced/examples/tree/master/todo-app/src/shared/api
export {AdminApi} from "./adminApi";
// TODO: апи перенести в отдельный файл, здесь оставить только реэкспорт
export {DTO};
export {commonEntitiesApi} from "./rtk-queries/commonEntitiesApi";
export {feedbackApi} from "./rtk-queries/feedbackApi";

import * as ApiUtil from "./util";


export {ApiUtil};

export {Api} from "./api";

