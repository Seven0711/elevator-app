import { Elevator } from '@/interface/elevator'
import { DirectionType, DoorStatusType, LiftStatusType } from '@/types';
export default class ElevatorClass implements Elevator.LiftType {
  floor: number = 1
  maxNum: number = 4
  account: number = 0
  direction: DirectionType = 'UP'
  doorStatus: DoorStatusType = 'CLOSE'
  termini?: number | undefined = 0
  timer: number | undefined = undefined
  liftStatus: LiftStatusType = 'STOP';
  constructor(liftConfig: Elevator.LiftType) {
    this.floor = liftConfig.floor
    this.maxNum = liftConfig.maxNum
    this.account = liftConfig.account
    this.direction = liftConfig.direction
    this.termini = liftConfig.termini
    this.timer = liftConfig.timer

  }
};
