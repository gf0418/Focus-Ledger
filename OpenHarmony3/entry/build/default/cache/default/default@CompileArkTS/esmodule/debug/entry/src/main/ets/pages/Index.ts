if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    mode?: number;
    time?: number;
    timer?: number;
    inputMoney?: string;
    selectedType?: string;
    records?: RecordItem[];
}
interface RecordItem {
    money: string;
    type: string;
}
export default class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mode = new ObservedPropertySimplePU(0, this, "mode");
        this.__time = new ObservedPropertySimplePU(25 * 60, this, "time");
        this.timer = -1;
        this.__inputMoney = new ObservedPropertySimplePU('', this, "inputMoney");
        this.__selectedType = new ObservedPropertySimplePU('饮食', this, "selectedType");
        this.__records = new ObservedPropertyObjectPU([], this, "records");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
        if (params.time !== undefined) {
            this.time = params.time;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.inputMoney !== undefined) {
            this.inputMoney = params.inputMoney;
        }
        if (params.selectedType !== undefined) {
            this.selectedType = params.selectedType;
        }
        if (params.records !== undefined) {
            this.records = params.records;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mode.purgeDependencyOnElmtId(rmElmtId);
        this.__time.purgeDependencyOnElmtId(rmElmtId);
        this.__inputMoney.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedType.purgeDependencyOnElmtId(rmElmtId);
        this.__records.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mode.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        this.__inputMoney.aboutToBeDeleted();
        this.__selectedType.aboutToBeDeleted();
        this.__records.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mode: ObservedPropertySimplePU<number>;
    get mode() {
        return this.__mode.get();
    }
    set mode(newValue: number) {
        this.__mode.set(newValue);
    }
    private __time: ObservedPropertySimplePU<number>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: number) {
        this.__time.set(newValue);
    }
    private timer: number;
    private __inputMoney: ObservedPropertySimplePU<string>;
    get inputMoney() {
        return this.__inputMoney.get();
    }
    set inputMoney(newValue: string) {
        this.__inputMoney.set(newValue);
    }
    private __selectedType: ObservedPropertySimplePU<string>;
    get selectedType() {
        return this.__selectedType.get();
    }
    set selectedType(newValue: string) {
        this.__selectedType.set(newValue);
    }
    private __records: ObservedPropertyObjectPU<RecordItem[]>;
    get records() {
        return this.__records.get();
    }
    set records(newValue: RecordItem[]) {
        this.__records.set(newValue);
    }
    aboutToAppear() {
        this.records = AppStorage.get<RecordItem[]>('records') ?? [];
    }
    saveRecord() {
        if (this.inputMoney === '') {
            return;
        }
        this.records.push({
            money: this.inputMoney,
            type: this.selectedType
        });
        AppStorage.set('records', this.records);
        this.inputMoney = '';
        this.selectedType = '饮食';
        this.mode = 0;
    }
    startPomodoro() {
        this.timer = setInterval(() => {
            if (this.time > 0) {
                this.time--;
            }
            else {
                clearInterval(this.timer);
                this.time = 25 * 60;
                this.mode = 0;
            }
        }, 1000);
    }
    format(t: number): string {
        let m = Math.floor(t / 60);
        let s = t % 60;
        return `${m}:${s < 10 ? '0' + s : s}`;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 20 });
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.mode === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('专注账本');
                        Text.fontSize(26);
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`已记账 ${this.records.length} 笔`);
                        Text.fontSize(16);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.records.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(`最近：¥${this.records[this.records.length - 1].money}（` +
                                        `${this.records[this.records.length - 1].type}）`);
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('开始番茄钟');
                        Button.onClick(() => {
                            this.mode = 1;
                            this.startPomodoro();
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('记一笔账');
                        Button.onClick(() => {
                            this.mode = 2;
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.mode === 1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('番茄钟');
                        Text.fontSize(22);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.format(this.time));
                        Text.fontSize(36);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('返回首页');
                        Button.onClick(() => {
                            clearInterval(this.timer);
                            this.time = 25 * 60;
                            this.mode = 0;
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.mode === 2) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('记账');
                        Text.fontSize(22);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({
                            placeholder: '请输入金额',
                            text: this.inputMoney
                        });
                        TextInput.onChange((value: string) => {
                            this.inputMoney = value;
                        });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`当前类型：${this.selectedType}`);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('饮食');
                        Button.onClick(() => {
                            this.selectedType = '饮食';
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('交通');
                        Button.onClick(() => {
                            this.selectedType = '交通';
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('学习');
                        Button.onClick(() => {
                            this.selectedType = '学习';
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('其他');
                        Button.onClick(() => {
                            this.selectedType = '其他';
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('保存');
                        Button.onClick(() => {
                            this.saveRecord();
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('取消');
                        Button.onClick(() => {
                            this.mode = 0;
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false" });
