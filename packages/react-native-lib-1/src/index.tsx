import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-lib-1' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Lib1 = NativeModules.Lib1  ? NativeModules.Lib1  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  console.log("Result from Lib1: ", Lib1.multiply(a, b));
  return Lib1.multiply(a, b);
}
