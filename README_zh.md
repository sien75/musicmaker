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

> 浏览器的相关策略, 可以参考<https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide>

详细的可以参考[API](#API)中的resume部分.

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

详细的可以参考[API](#API)中的trigger部分.

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

采样器创建完毕后, 就可以调用其下的`scheduleNote`方法. 该方法接受`NoteCreaterJSON[]`格式的参数(具体可参考[API](#API)中的type部分). 上方的音调序列意为:
* 在时间0时播放C4音调, 持续1秒, 音量为1
* 在时间1时播放E4音调, 持续1秒, 音量为1
* 在时间2时播放G4音调, 持续1秒, 音量为1

其中时间从调用start方法开始, 在调用stop方法时结束, 音量取值为0~1.

音调序列规划好之后, 点击button3就可以播放这段音调序列了.

详细的可以参考[API](#API)中的schedule部分.

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

准备中...
