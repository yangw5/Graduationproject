//深拷贝
function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

export default cloneState;