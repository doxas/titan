
import { CONSTANT } from '../Core/Constant';

export class Logger {
  static log(...out: any) {
    console.log(
      '%c titan %c',
      `background-color: ${CONSTANT.TITAN_THEME_COLOR}; color: white;`,
      'background-color: inherit; color: inherit;',
      ...out,
    );
  }
}
