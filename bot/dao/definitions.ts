// 
// UCLan Computing 2020 Discord Bot
// MIT License - Cameron Fleming 2021
//

export class Module {
  // Definition of a university course module
  code: string;
  name: string;

  constructor(code: string, name: string) {
    this.code = code;
    this.name = name;
  }
}

export class Assignment {
  // Definition of an assignment
  module: Module;
  name: string;
  startDate: Date;
  dueDate: Date;

  constructor(module: Module, name: string, startDate: Date, dueDate: Date) {
    this.module = module;
    this.name = name;
    this.startDate = startDate;
    this.dueDate = dueDate;
  }
}