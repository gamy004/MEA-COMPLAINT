import * as _modules from '../stores/module-types';
import * as _getters from '../stores/getter-types';
import * as _mutations from '../stores/mutation-types';
import * as _actions from "../stores/action-types";
import * as _views from "./views";

export const modules = _modules;
export const getters = _getters;
export const mutations = _mutations;
export const actions = _actions;
export const views = _views;

export default {
    modules,
    getters,
    mutations,
    actions,
    views
};
