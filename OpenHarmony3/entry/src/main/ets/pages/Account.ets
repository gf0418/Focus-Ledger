import prompt from '@ohos.prompt';

@Component
export default struct Account {
  @State money: string = ''

  build() {
    Column({ space: 20 }) {
      Text('记账')
        .fontSize(22)

      TextInput({ placeholder: '输入金额' })
        .onChange(v => {
          this.money = v
        })

      Button('保存')
        .onClick(() => {
          prompt.showToast({ message: '保存成功' })
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
