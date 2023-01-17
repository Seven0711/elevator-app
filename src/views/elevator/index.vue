<template>
  <div class="elevator-page">
    <div class="lift-pane">
      <div class="lift-shaft">
        <div v-for="(item, index) in waitingAreaList" :key="index" class="lift-shadow">
          <template v-for="liftItem in liftList" :key="liftItem.floor">
            <div v-if="item.floor === liftItem.floor" class="lift-item">
              <span class="lift-direction">{{ EnumDirection[liftItem.direction] }}</span>
              <span>{{ item.floor }}-{{ liftItem.floor }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="waiting-pane">
      <div v-for="(item, index) in waitingAreaList" :key="index" class="waiting-item">
        <div class="direction-text">
          <span>上</span>
          <span>下</span>
        </div>
        <span>{{ item.floor + '楼' }}</span>
      </div>
    </div>
    <button @click="handleStop">STOP</button>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { DirectionType } from '@/types'
import { Elevator } from '@/interface/elevator'
import { EnumDirection } from '@/enum'
export default {
  name: 'Elevator'
}
</script>
<script lang="ts" setup>
let liftDirection: DirectionType = 'UP'
const liftList = ref<Elevator.LiftType[]>([])
const waitingAreaList = ref<Elevator.LiftType[]>([])
const floorCount = 8 // 总层数
const liftCount = 2 // 电梯数量
let runner = 0
const liftRunner = (floor: number, direction: DirectionType) => {
  liftList.value.forEach((item) => {
    item.floor = floor
    item.direction = direction
  })
}
const looper = () => {
  let floorNum = 1
  runner = setInterval(() => {
    if (liftDirection === 'UP') {
      floorNum += 1
    }
    if (liftDirection === 'DOWN') {
      floorNum = floorNum - 1
    }
    if (floorNum >= floorCount) {
      liftDirection = 'DOWN'
    }
    if (floorNum === 1) {
      floorNum = 1
      liftDirection = 'UP'
    }
    liftRunner(floorNum, liftDirection)
  }, 1000)
}
const handleStop = () => {
  clearInterval(runner)
}
onMounted(() => {
  Array.from({ length: liftCount }, () => {
    liftList.value.push({ direction: 'UP', account: 0, floor: 1 })
  })
  Array.from({ length: floorCount }, (_, index) => {
    waitingAreaList.value.push({ direction: 'UP', account: 0, floor: floorCount - index })
  })
  looper()
})
</script>

<style lang="scss" scoped>
.elevator-page {
  display: flex;
  background: #666666;
  padding: 20px;
  .common-size {
    width: 200px;
    height: 60px;
  }
  .lift-pane {
    display: flex;
    .lift-shaft {
      display: flex;
      flex-direction: column;
      background: #666666;
    }
    .lift-shadow {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      @extend .common-size;
      width: 280px;
    }
    .lift-item {
      display: flex;
      background: #999999;
      margin-right: 20px;
      @extend .common-size;
      width: 140px;
    }
    .lift-direction {
      font-size: 40px;
      color: #000000;
    }
  }
  .waiting-pane {
    display: flex;
    flex-direction: column;
    .waiting-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      background: #999999;
      @extend .common-size;
    }
    .direction-text {
      display: flex;
      flex-direction: column;
      font-size: 12px;
    }
  }
}
</style>
