interface RecordItem {
  money: string
  type: string
}

@Entry
@Component
export default struct Index {

  @State mode: number = 0
  @State time: number = 25 * 60
  timer: number = -1

  @State inputMoney: string = ''
  @State selectedType: string = '饮食'
  @State records: RecordItem[] = []

  aboutToAppear() {
    this.records = AppStorage.get<RecordItem[]>('records') ?? []
  }

  saveRecord() {
    if (this.inputMoney === '') {
      return
    }
    this.records.push({
      money: this.inputMoney,
      type: this.selectedType
    })
    AppStorage.set('records', this.records)
    this.inputMoney = ''
    this.selectedType = '饮食'
    this.mode = 0
  }

  startPomodoro() {
    this.timer = setInterval(() => {
      if (this.time > 0) {
        this.time--
      } else {
        clearInterval(this.timer)
        this.time = 25 * 60
        this.mode = 0
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

      if (this.mode === 0) {
        Text('专注账本')
          .fontSize(26)
          .fontWeight(FontWeight.Bold)

        Text(`已记账 ${this.records.length} 笔`)
          .fontSize(16)

        if (this.records.length > 0) {
          Text(
            `最近：¥${this.records[this.records.length - 1].money}（` +
              `${this.records[this.records.length - 1].type}）`
          )
        }

        Button('开始番茄钟')
          .onClick(() => {
            this.mode = 1
            this.startPomodoro()
          })

        Button('记一笔账')
          .onClick(() => {
            this.mode = 2
          })
      }

      if (this.mode === 1) {
        Text('番茄钟')
          .fontSize(22)

        Text(this.format(this.time))
          .fontSize(36)

        Button('返回首页')
          .onClick(() => {
            clearInterval(this.timer)
            this.time = 25 * 60
            this.mode = 0
          })
      }

      if (this.mode === 2) {
        Text('记账')
          .fontSize(22)

        TextInput({
          placeholder: '请输入金额',
          text: this.inputMoney
        })
          .onChange((value: string) => {
            this.inputMoney = value
          })

        Text(`当前类型：${this.selectedType}`)

        Button('饮食')
          .onClick(() => {
            this.selectedType = '饮食'
          })

        Button('交通')
          .onClick(() => {
            this.selectedType = '交通'
          })

        Button('学习')
          .onClick(() => {
            this.selectedType = '学习'
          })

        Button('其他')
          .onClick(() => {
            this.selectedType = '其他'
          })

        Button('保存')
          .onClick(() => {
            this.saveRecord()
          })

        Button('取消')
          .onClick(() => {
            this.mode = 0
          })
      }
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
