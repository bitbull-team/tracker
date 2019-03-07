<template>
  <div class="timer">
    <div class="actions">
      <button
        :class="status === 'started' || status === 'paused' ? 'stop' : 'start'"
        @click="runTimer()"
      >
        {{ label }}
      </button>
      <button
        v-show="status !== 'stopped'"
        :class="status === 'paused' ? 'start' : 'pause'"
        class="pause"
        @click="pause()"
      >
        {{ $t('Pause') }}
      </button>
    </div>
    <div>
      <time>{{ h }} : {{ min }} : {{ sec }}</time>
      <span class="issue">{{ issue }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      status: 'stopped',
      hour: 0,
      minute: 0,
      second: 0,
      issue: 'prova'
    }
  },
  computed: {
    label() {
      return this.status === 'started' || this.status === 'paused'
        ? 'Stop'
        : 'Start'
    },
    h() {
      if (this.hour < 10) {
        return '0' + this.hour
      }
      return this.hour
    },
    min() {
      if (this.minute < 10) {
        return '0' + this.minute
      }
      return this.minute
    },
    sec() {
      if (this.second < 10) {
        return '0' + this.second
      }
      return this.second
    }
  },
  methods: {
    ...mapActions({
      changeSystemTrayIcon: 'systemTray/changeIcon'
    }),
    runTimer() {
      if (this.status === 'started' || this.status === 'paused') {
        this.stop()
        return false
      }

      this.start()
    },
    start() {
      this.status = 'started'
      this._tick()
      this.interval = setInterval(this._tick, 1000)
      this.changeSystemTrayIcon('timerOn')
    },
    pause() {
      if (this.status === 'paused') {
        this.start()
        return false
      }
      this.status = 'paused'
      clearInterval(this.interval)
    },
    stop() {
      this.status = 'stopped'
      clearInterval(this.interval)
      this.saveTime(this.hour, this.minute)
      this.hour = 0
      this.minute = 0
      this.second = 0
      this.changeSystemTrayIcon('timerOff')
    },
    _tick() {
      this.second++
      if (this.second === 60) {
        this.minute++
        this.second = 0
      }
      if (this.minute === 60) {
        this.hour++
        this.minute = 0
      }
    },
    saveTime(h, m) {
      let loggedTime = h + '.' + m * 1.6
      return loggedTime
      // console.log(loggedTime)
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #5dedd5;

.timer {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  align-items: center;
}
.actions {
  position: relative;
  margin-right: 1rem;
}
button {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: $color;
  color: white;
  font-size: 0;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &::before,
  &::after {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.start {
    &::after {
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 15px 0 15px 26px;
      border-color: transparent transparent transparent white;
      left: 58%;
    }
  }
  &.stop {
    &::after {
      content: '';
      width: 25px;
      height: 25px;
      border-radius: 3px;
      background-color: white;
    }
  }
  &.pause {
    position: absolute;
    width: 25px;
    height: 25px;
    background: black;
    bottom: -3px;
    right: -3px;
    &::before,
    &::after {
      content: '';
      height: 10px;
      width: 2px;
      background-color: white;
    }
    &::before {
      left: 45%;
    }
    &::after {
      left: 60%;
    }
    &.start {
      &:after {
        background: none;
        border-width: 5px 0 5px 8.7px;
      }
    }
  }
}
time,
span {
  display: block;
}
time {
  color: $color;
  font-size: 1.2em;
  line-height: 1;
}
</style>
