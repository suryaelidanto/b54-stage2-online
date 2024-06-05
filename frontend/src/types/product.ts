// generic types
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

console.log(loggingIdentity<number>([1, 2, 3]));
