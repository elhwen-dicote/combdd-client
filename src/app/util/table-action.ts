export class TableAction<T> {
    constructor(
        public name: string,
        public header: string,
        public icon: string,
        public isEnabled?: boolean | ((c: T) => boolean),
      ) { }
      isDisabled(item: T): boolean {
        let enabled = true;
        if (this.isEnabled) {
          if (typeof this.isEnabled === 'boolean') {
            enabled = this.isEnabled;
          } else {
            enabled = this.isEnabled(item);
          }
        }
        return !enabled;
      }
    }
