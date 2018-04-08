const transformObject = choice => {
  let obj = {}
  let aKeys = Object.keys(choice)
  for (let i = 0; i < aKeys.length; i++) {
    obj.option = aKeys[i]
    obj.content = choice[aKeys[i]]
  }
  return obj
}

export {
  transformObject
}
