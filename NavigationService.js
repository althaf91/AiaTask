// NavigationService.js

import {StackActions, CommonActions} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(CommonActions.navigate(routeName, params));
}

function push(routeName, params) {
  _navigator.dispatch(StackActions.push(routeName, params));
}

function pop(index = 1) {
  _navigator.dispatch(StackActions.pop(index));
}

function popToTop() {
  _navigator.dispatch(StackActions.popToTop());
}

function goBack() {
  _navigator.dispatch(CommonActions.goBack);
}

function replace(routeName, params) {
  _navigator.dispatch(StackActions.replace(routeName, params));
}

function replaceWithKey(routeName, params, key) {
  params.key = key;
  _navigator.dispatch(StackActions.replace(routeName, params));
}

function reset(index, routeName, toRouteName, params) {
  _navigator.dispatch(
    CommonActions.reset({
      index: index,
      routes: [
        {name: routeName},
        {
          name: toRouteName,
          params: params,
        },
      ],
    }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  push,
  pop,
  popToTop,
  goBack,
  replace,
  replaceWithKey,
  reset,
  setTopLevelNavigator,
};
