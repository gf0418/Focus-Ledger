@Component
export default struct Pomodoro {
  @State time: number = 25 * 60
  @State running: boolean = false
  timer: number = -1

  start() {
    if (this.running) {
      return
    }
    this.running = true
    this.timer = setInterval(() => {
      if (this.time > 0) {
        this.time--
      } else {
        clearInterval(this.timer)
        this.running = false
      }
    }, 1000)
  }

  format(t: number): string {
    let m = Math.floor(t / 60)
    let s = t % 60
    return `${m}:${s < 10 ? '0' + s : s}`
  }

  build() {
    Column({ space: 20 }) {
      Text('番茄钟')
        .fontSize(22)

      Text(this.format(this.time))
        .fontSize(36)

      Button('开始')
        .onClick(() => this.start())
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
