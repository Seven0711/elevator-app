import { DirectionType } from '@/types'
export namespace Elevator {
  export interface LiftType {
    direction: DirectionType // 方向
    account: number // 人数
    floor: number // 楼层
    termini?: number // 终点楼层
  }
}
