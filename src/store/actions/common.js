import {LOADING_END, LOADING_START} from "./actionTypes";

export function loadingStart() {
  console.log('loading');
  return {
    type: LOADING_START
  }
}

export function loadingEnd() {
  console.log('loading end');
  return {
    type: LOADING_END
  }
}

//TODO понять как лучше работать с loading