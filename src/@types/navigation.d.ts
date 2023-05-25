/* eslint-disable @typescript-eslint/no-empty-interface */
import { ScreensStack } from '@routes/stack.routes';
export declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreensStack {}
  }
}
