# MusicMaker.js

[![npm version](https://img.shields.io/badge/npm-3.0.0-brightgreen)](https://www.npmjs.com/package/musicmaker)
[![license](https://img.shields.io/badge/LICENSE-Apache--2.0-brightgreen)](https://github.com/sien75/musicmaker/blob/master/LICENSE)

`MusicMaker.js`, 也可以称为`MusicMaker-Core`或者`MusicMaker`, 是一个可以用来制作可交互Midi音频Web应用的JavaScript音频库. 目前, 它的实现方式为对`Tonejs/Tone.js`和`Tonejs/Midi`这两个库的少数功能的函数式包装.

直观点说, 这个库可以做:
* 响应键盘事件的网页版钢琴
* 虚拟乐队
* 编曲器
* 等等...

它的基本功能有:
* 触发指定乐器的音调
* 规划并播放音调序列
* 制作MidiJSON(midi文件的JSON格式)

## 相关库

### 感谢

* [Tonejs/Tone.js](https://github.com/Tonejs/Tone.js)
* [Tonejs/Midi](https://github.com/Tonejs/Midi)

## 安装

### 安装方式

> 通过yarn和npm安装, 并通过Webpack这类工具构建时, 请参照下面的[安装注意事项](#安装注意事项), 把`MusicMaker.js`作为外部资源引入.

yarn

```shell
yarn add musicmaker
```

npm

```shell
npm i musicmaker
```

script标签, 全局变量名称为`MusicMaker`

```html
<script src="https://unpkg.com/musicmaker@3"></script>
```

### 安装注意事项

第一个需要注意的是, 当您通过yarn或者npm安装`MusicMaker.js`, 并通过Webpack这类工具构建时, **构建时间可能会比较长**.

这种情况下, 建议同时通过script方式将其作为外部资源引入. 由于依赖的`Tonejs/Tone.js`构建结果很大, 这种方式就可以避免`Tonejs/Tone.js`被反复构建, 导致构建时间过长.

比如说, 如果您使用Webpack构建, 可以将`MusicMaker.js`作为`externals`:

```js
module.exports = {
    mode: ...,
    entry: ...,
    externals: {
        musicmaker: 'MusicMaker',
    },
}
```

同时在html模板文件内通过script标签引入:

```html
<script src="https://unpkg.com/musicmaker@3"></script>
```

第二个需要注意的是, 当您通过script标签引入时, 由于`MusicMaker.js`依赖到了`Ramda`, 如果您也同时在使用`Ramda`, 可以使用`musicmaker.lite.js`, 这个构建结果剔除了`Ramda`, 需要自己引入:

```html
<script src="https://unpkg.com/ramda@0.28.0/dist/ramda.min.js"></script>
<script src="https://unpkg.com/musicmaker@3/lib/umd/musicmaker.lite.js"></script>
```

剔除了所有依赖的构建结果为`musicmaker.pure.js`, 使用时需要手动引入所有依赖:
```html
<script src="https://unpkg.com/ramda@0.28.0/dist/ramda.min.js"></script>
<script src="https://unpkg.com/tone@14.7.77/build/Tone.js"></script>
<script src="https://unpkg.com/@tonejs/midi@2.0.28/build/Midi.js"></script>
<script src="https://unpkg.com/musicmaker@3/lib/umd/musicmaker.pure.js"></script>
```

## 使用方法

### 恢复上下文

在用户事件发生之前, 浏览器不会播放音频. 所以, 在实际播放音频之前, 您需要首先恢复上下文, 在用户事件(通常为点击事件)上调用恢复上下文的方法.

```ts
import { resume } from 'musicmaker';

button.onclick = async () => {
    await resume();
    console.log('context resumed');
}
```

> 浏览器的相关策略, 可以参考<https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide>.

详细的可以参考[API](#API)中的Resume部分.

### 功能1: 触发指定乐器的音调

这个功能适用于即时演奏(如网页版钢琴)场景.

```ts
import { createTriggerSampler, TriggerSampler } from 'musicmaker';

let triggerSampler: TriggerSampler;

button1.onclick = async () => {
    triggerSampler = await createTriggerSampler({
        baseUrl: 'https://xxx/',
        urls: {
            C4: 'C4.mp3',
            D4: 'D4.mp3',
            E4: 'E4.mp3',
        },
    });
    console.log('trigger sampler created!');
};

button2.onclick = () => {
    if (!triggerSampler) return;
    triggerSampler.triggerAttackRelease('C5', 1);
};
```

`createTriggerSampler`可以创建适用于"触发指定乐器的音调"的采样器. 假设在`https://xxx/C4.mp3`, `https://xxx/D4.mp3`和`https://xxx/E4.mp3`上存在3个某乐器音源文件, 那么button1的点击事件就创建了一个该乐器的采样器.

button2的点击事件意为: 立刻触发该乐器的'C5'音调, 持续时间为1秒钟.

> `Sampler`, 即`采样器`, 在创建时传入一些音调的乐器的mp3地址, 它就可以模拟这个出这个乐器的其他音调(C1~B7). 传入少量的音调, 可以节省加载时间; 而传入更多的音调, 采样器发出的声音当然更准确.

详细的可以参考[API](#API)中的Trigger部分.

### 功能2: 规划并播放音调序列

这个功能适用于音频展示(如虚拟乐队)的场景.

```ts
import { createScheduleSampler, ScheduleSampler, start, stop } from 'musicmaker';

let scheduleSampler: ScheduleSampler;
button1.onclick = async () => {
    scheduleSampler = await createScheduleSampler({
        baseUrl: 'https://xxx/',
        urls: {
            C4: 'C4.mp3',
            D4: 'D4.mp3',
            E4: 'E4.mp3',
        },
    });
    console.log('schedule sampler created!');
};

button2.onclick = () => {
    if (!scheduleSampler) return;
    scheduleSampler.scheduleNote([
        { name: 'C4', time: 0, duration: 1, velocity: 1 },
        { name: 'E4', time: 1, duration: 1, velocity: 1 },
        { name: 'G4', time: 2, duration: 1, velocity: 1 },
    ]);
    console.log('scheduled notes');
};

button3.onclick = () => {
    start();
}

button4.onclick = () => {
    stop();
}
```

`createScheduleSampler`可以创建适用于"规划并播放音调序列"的采样器.

采样器创建完毕后, 就可以调用其下的`scheduleNote`方法. 该方法接受`NoteCreaterJSON[]`格式的参数(具体可参考[API](#API)中的Types部分). 上方的音调序列意为:
* 在时间0时播放C4音调, 持续1秒, 音量为1
* 在时间1时播放E4音调, 持续1秒, 音量为1
* 在时间2时播放G4音调, 持续1秒, 音量为1

其中时间从调用start方法开始, 在调用stop方法时结束, 音量取值为0~1.

音调序列规划好之后, 点击button3就可以播放这段音调序列了.

详细的可以参考[API](#API)中的Schedule部分.

### 功能3: 制作MidiJSON

这个功能适用于编曲(如编曲器)的场景.

```ts
import { createMidiJSON, TrackCreaterJSON } from 'musicmaker';

const trackCreaterJSONs: TrackCreaterJSON[] = [
    {
        channel: 0,
        instrumentNumber: 0,
        notes: [
            { name: 'C5', time: 0, duration: 1, velocity: 1 },
            { name: 'A4', time: 2, duration: 1, velocity: 1 },
        ],
    },
    {
        channel: 1,
        instrumentNumber: 0,
        notes: [
            { name: 'B4', time: 1, duration: 1, velocity: 1 },
            { name: 'G4', time: 3, duration: 2, velocity: 1 },
        ],
    },
];
const newMidiJSON = createMidiJSON(trackCreaterJSONs);
console.log(newMidiJSON);
console.log('new MidiJSON created');
```

`MidiJSON`是midi文件的JSON格式, 可以通过转换函数转换midi文件而来.

`TrackCreaterJSON`是创建`MidiJSON`时的描述一个track内容的格式.

制作MidiJSON可以使用`createMidiJSON`方法, 它接收`TrackCreaterJSON[]`格式的参数, 返回`MidiJSON`格式的变量.

关于这些方法和类型的详细描述, 可以参考[API](#API).

## API

### Types

#### Timbre

```
type :: { urls: Urls; baseUrl?: string }
```

指明乐器音源文件地址. 举例:

```ts
{
    urls: {
        C4: 'C4.mp3',
        C5: 'C5.mp3',
    },
    baseUrl: 'https://xxx.com/',
}
```

如果音源文件在同源服务器的`/mp3_sources`文件夹下面:

```ts
{
    urls: {
        C4: '/mp3_sources/C4.mp3',
        C5: '/mp3_sources/C5.mp3',
    }
}
```

#### Urls

```
type :: { [note: string]: string }
```

用于和[Timbre](#timbre)类型配合, 指明乐器音源文件地址.

#### TriggerSampler

```
type :: {
    triggerAttack: function;
    triggerRelease: function;
    triggerAttackRelease: function;
}
```

triggerAttack
```
function :: (name: string, time?: number, velocity?: number) => void
```

triggerRelease
```
function :: (name: string, time?: number) => void
```

triggerAttackRelease
```
function :: (name: string, duration: number, time?: number, velocity?: number) => void
```

适用于"触发指定乐器的音调"的采样器, 采样器下有3个函数:
* `triggerAttack`, 调用函数时该音调会开始播放
* `triggerRelease`, 调用函数时该音调会停止播放
* `triggerAttackRelease`, 调用函数时该音调会开始和停止播放

其中, 各props的含义可以见[NoteCreaterJSON](#notecreaterjson)同名属性.

#### ScheduleSampler

```
type :: { scheduleNote }
```

scheduleNote
```
function :: (notes: NoteCreaterJSON[]) => void 
```

适用于"规划并播放音调序列"的采样器. 采样器下有1个函数:
* `scheduleNote`, 规划指定的音调, 在[start](#start)函数调用时就会开始播放这些音调

#### NoteCreaterJSON

```
type :: {
    name: string;
    time: number;
    duration: number;
    velocity: number;
}
```

创建[MidiJSON](#midijson)时的音调格式, 具体字段的含义如下:
* `name`, 音调的名字, 如`C4`
* `time`, 开始播放的时间
* `duration`, 播放持续的时间
* `velocity`, 音量, 取值为0~1

#### TrackCreaterJSON

```
type :: {
    channel: number;
    instrumentNumber: number;
    notes: NoteCreaterJSON[];
}
```

创建[MidiJSON](#midijson)时的轨道格式, 一个音频轨道包含多个音调, 而一个midi曲目中可以包含多个音频轨道.

各字段含义:
* `channel`, 音频频道, 音频轨道的标识符
* `instrumentNumber`, 该音频轨道的乐器midi号
* `notes`, 该音频轨道包含的音调

#### NoteJSON

```
type :: {
    time: number;
    midi: number;
    name: string;
    velocity: number;
    duration: number;
    ticks: number;
    durationTicks: number;
}
```

Tonejs/Midi中[MidiJSON](#midijson)的音调格式, 比[NoteCreaterJSON](#notecreaterjson)多出几个字段.

在本库的使用场景中, 无需了解其具体字段内容, 仅需知道NoteJSON是NoteCreaterJSON的扩展版, 在使用NoteCreaterJSON的地方都可以使用NoteJSON.

#### TrackJSON

```
type :: {
    name: string;
    notes: NoteJSON[];
    channel: number;
    instrument: InstrumentJSON;
    // *omit*
}
```

InstrumentJSON
```
{
    family: string;
    number: number;
    name: string;
}
```

Tonejs/Midi中[MidiJSON](#midijson)的音频轨道格式, 其中`instrument.number`即为该音频轨道的乐器midi号.

#### MidiJSON

```
type MidiJSON {
    tracks: TrackJSON[];
    // *omit*
}
```

"大名鼎鼎"的MidiJSON, 即midi文件的JSON格式, 由Tonejs/Midi提供.

在MidiJSON中, 包含了一个一个的音频轨道, 而每个音频轨道又包含了乐器信息和音调信息.

### Resume

#### resume

```
function :: () => Promise<void>
```

恢复当前的上下文, 即将当前上下文的状态由`suspended`转换为`running`. 只有上下文状态为`running`时才能播放音频.

#### getContextState

```
function :: () => AudioContextState
```

获取当前的上下文的状态, 可能的值有`running`, `suspended`和`closed`.

### Trigger

#### createTriggerSampler

```
function :: (timbre: Timbre) => Promise<TriggerSampler>
```

创建适用于"触发指定乐器的音调"的采样器. 采样器下各函数的功能, 具体含义见[TriggerSampler](#triggersampler)部分.

### Schedule

#### createScheduleSampler

```
function :: (timbre: Timbre) => Promise<ScheduleSampler>
```

创建适用于"规划并播放音调序列"的采样器. 采样器下各函数的功能, 具体含义见[ScheduleSampler](#schedulesampler)部分.

#### scheduleDrawOfNote

```
curried function :: (NoteCreaterJSON -> any) -> NoteCreaterJSON[] -> void
```

按照给定的音调内容规划绘制事件.

如果需要实现一个可以自动播放曲目的网页版钢琴, 那么需要规划两件事:
* 规划音频播放, 通过[createScheduleSampler](#createschedulesampler)实现
* 规划绘制事件, 即钢琴某个音符播放时相应键位置灰, 显示"按下"的效果

函数接受的第一个参数即为处理绘制的函数:

```ts
const logNoteWhenPlaying = scheduleDrawOfNote(console.log);
logNoteWhenPlaying(noteCreaterJSONs);
start();
```

#### scheduleDrawAtTime

```
curried function :: (number -> any) -> number -> void
```

按照时间规划绘制事件.

如果需要在某段音乐开始播放的时候, 使网页背景色变为深色, 以提高沉浸感, 那么就需要这个函数了:

```ts
const changeBackgroungAtTime = scheduleDrawAtTime(changeBackground);
changeBackgroungAtTime(0);
start();
```

#### cancelScheduled

```
function :: () => void
```

取消所有的规划事件, 包括音频事件和绘制事件.

#### start

```
function :: () => void
```

开始播放规划的音频事件, 同步开始渲染规划的绘制事件.

#### pause

```
function :: () => void
```

暂停播放规划的音频事件, 同步暂停渲染规划的绘制事件.

#### stop

```
function :: () => void
```

结束播放规划的音频事件, 同步结束渲染规划的绘制事件.

### MakeMidiJSON

#### createMidiJSON

```
curried function :: TrackCreaterJSON[] -> MidiJSON
```

从头制作一个新的[MidiJSON](#midijson).

#### appendNotesToMidiJSON

```
curried function :: MidiJSON -> TrackCreaterJSON -> MidiJSON
```

向一个现存的[MidiJSON](#midijson)内添加新的轨道, 返回新的MidiJSON.

### Convert

#### convertToMidiJSONFromArrayBuffer

```
function :: (arrayBuffer: ArrayBuffer) => MidiJSON
```

把从文件中读到的ArrayBuffer转换成[MidiJSON](#midijson).

#### convertToUint8ArrayFromMidiJSON

```
function :: (midiJSON: MidiJSON) => Uint8Array
```

把[MidiJSON](#midijson)转换成Uint8Array, 以便于存储成为文件.

#### convertToMidiJSONFromUrl

```
function :: (url: string) => Promise<MidiJSON>
```

把url指代的midi文件转换成[MidiJSON](#midijson).
