// react, 用于支持JSX语法
import React from 'react';
// react的DOM渲染
import ReactDom from 'react-dom';
// Midi类型
import { Midi } from '@tonejs/midi';
// MusicMaker库(组件)
import MusicMaker from 'musicmaker';
// Rules和Timbre类型
// 用于TypeScript, 使用JavaScript的话无需引入
import { Rules, Timbre } from 'musicmaker/_types';
// MusicMaker库的CSS文件
import 'musicmaker/index.css';

import './index.scss';

const _ = async () => {
    const midi = new Midi();
    const track = midi.addTrack();
    track
        .addNote({
            name: 'C4',
            time: 0,
            duration: 0.2,
        })
        .addNote({
            name: 'D4',
            time: 0.3,
            duration: 0.2,
        })
        .addNote({
            name: 'E4',
            time: 0.6,
            duration: 0.2,
        })
        .addNote({
            name: 'F4',
            time: 0.9,
            duration: 0.2,
        })
        .addNote({
            name: 'G4',
            time: 1.2,
            duration: 0.2,
        })
        .addNote({
            name: 'A4',
            time: 1.5,
            duration: 0.2,
        })
        .addNote({
            name: 'B4',
            time: 1.8,
            duration: 0.2,
        });

    console.log('midi score', midi.toJSON());

    const rules: Rules = {
        type: 'object',
        midi,
        mmComponentAppearances: [
            {
                channel: 0,
                name: 'show_simple',
                position: {
                    left: '0%',
                    top: '10%',
                    width: '20%',
                    height: '20%',
                },
            },
        ],
        controllerAppearance: {
            type: 'controller_normal',
            position: {
                left: '0%',
                top: '0%',
                width: '40%',
                height: '10%',
            },
        },
    };

    const timbres: Timbre[] = [
        {
            number: 0,
            baseUrl: '',
            urls: {
                C4: (await import('./piano/C4.mp3')).default,
                D4: (await import('./piano/D4.mp3')).default,
                E4: (await import('./piano/E4.mp3')).default,
                F4: (await import('./piano/F4.mp3')).default,
                G4: (await import('./piano/G4.mp3')).default,
                A4: (await import('./piano/A4.mp3')).default,
                B4: (await import('./piano/B4.mp3')).default,
            },
        },
    ];

    ReactDom.render(
        <MusicMaker rules={rules} timbres={timbres} />,
        document.getElementById('app')
    );
};

_();
