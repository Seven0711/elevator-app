enum ElevatorStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  STOP = 'STOP',
}
// 电梯请求接口
interface IElevatorRequest {
  floor: number;
  direction: ElevatorStatus;
}
// 电梯接口
interface IElevator {
  id: number;
  currentFloor: number;
  status: ElevatorStatus;
  queue: IElevatorRequest[];
  addRequest(request: IElevatorRequest): void;
  start(): void;
}
// 电梯工厂接口
interface IElevatorFactory {
  createElevator(id: number): IElevator;
}
// 电梯工厂类
class ElevatorFactory implements IElevatorFactory {
  public createElevator(id: number): IElevator {
    return new Elevator(id);
  }
}
// 电梯控制器类
class ElevatorController {
  private elevators: IElevator[];
  constructor(private elevatorFactory: IElevatorFactory, private numElevators: number) {
    this.elevators = [];
    for (let i = 0; i < numElevators; i++) {
      this.elevators.push(this.elevatorFactory.createElevator(i));
    }
  }
  public request(floor: number, direction: ElevatorStatus) {
    const elevator = this.getElevator(floor, direction);
    elevator.addRequest({ floor, direction });
    elevator.start();
  }
  private getElevator(floor: number, direction: ElevatorStatus): IElevator {
    let minDistance = Infinity;
    let selectedElevator: IElevator | null = null;
    for (const elevator of this.elevators) {
      if (elevator.status === ElevatorStatus.STOP) {
        return elevator;
      }
      if (elevator.status === direction) {
        const distance = Math.abs(elevator.currentFloor - floor);
        if (distance < minDistance) {
          minDistance = distance;
          selectedElevator = elevator;
        }
      }
    }
    if (selectedElevator) {
      return selectedElevator;
    }
    return this.elevators[0];
  }
}
// 电梯类
class Elevator implements IElevator {
  public currentFloor: number;
  public status: ElevatorStatus;
  public queue: IElevatorRequest[];
  constructor(public id: number) {
    this.currentFloor = 1;
    this.status = ElevatorStatus.STOP;
    this.queue = [];
  }
  public addRequest(request: IElevatorRequest) {
    this.queue.push(request);
    this.queue.sort((a, b) => a.floor - b.floor);
  }
  public start() {
    if (this.queue.length === 0) {
      return;
    }
    if (this.status === ElevatorStatus.STOP) {
      this.status = this.queue[0].floor > this.currentFloor ? ElevatorStatus.UP : ElevatorStatus.DOWN;
      console.log(`Elevator ${this.id} started moving ${this.status}`);
    }
    setTimeout(() => {
      if (this.status === ElevatorStatus.UP) {
        this.currentFloor++;
      } else {
        this.currentFloor--;
      }
      if (this.currentFloor === this.queue[0].floor) {
        console.log(`Elevator ${this.id} stopped at floor ${this.currentFloor}`);
        this.queue.shift();
      }
      if (this.queue.length === 0) {
        this.status = ElevatorStatus.STOP;
        console.log(`Elevator ${this.id} stopped at floor ${this.currentFloor}`);
        return;
      }
      if (this.queue[0].floor > this.currentFloor && this.status === ElevatorStatus.DOWN) {
        this.status = ElevatorStatus.UP;
        console.log(`Elevator ${this.id} started moving ${this.status}`);
      } else if (this.queue[0].floor < this.currentFloor && this.status === ElevatorStatus.UP) {
        this.status = ElevatorStatus.DOWN;
        console.log(`Elevator ${this.id} started moving ${this.status}`);
      }
      this.start();
    }, 1000);
  }
}
// 测试代码
const factory = new ElevatorFactory();
const controller = new ElevatorController(factory, 2);
controller.request(1, ElevatorStatus.UP);
controller.request(3, ElevatorStatus.UP);
controller.request(2, ElevatorStatus.UP);
controller.request(5, ElevatorStatus.DOWN);
controller.request(4, ElevatorStatus.DOWN);
