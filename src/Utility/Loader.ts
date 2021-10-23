
export class Loader {
  static async loadText(path: string, option: object): Promise<string> {
    const response = await fetch(path, option);
    const text = await response.text();
    return text;
  }
}
