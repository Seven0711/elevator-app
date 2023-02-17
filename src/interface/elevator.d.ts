import { DirectionType, DoorStatusType, LiftStatusType } from '@/types'
export namespace Elevator {
  export interface LiftType {
    direction: DirectionType // 方向
    maxNum: number // 可载最大人数
    account: number // 人数
    floor: number // 当前楼层
    doorStatus: DoorStatusType // 电梯门的状态
    liftStatus: LiftStatusType // 电梯运行状态
    termini?: number // 终点楼层
    timer: number | undefined // 定时器的id
  }
}
