import React from 'react';
import { storySettings } from './storySettings';
import {
  tab,
  tabs,
  api,
  playground,
  description,
  divider,
  importExample,
  columns,
  header,
  title,
  code as baseCode,
} from 'wix-storybook-utils/Sections';

import testkit from './README.TESTKIT.md';
import ColorInput from '..';
import { placements } from '../../Popover';
import allComponents from '../../../stories/utils/allComponents';

import usage from './Usage.md';
import * as examples from './examples';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: ColorInput,
  componentPath: '../ColorInput.js',

  componentProps: setState => ({
    value: '',
    placeholder: 'Please choose a color',
    dataHook: storySettings.dataHook,
    onConfirm: value => setState({ value }),
    size: 'medium',
    error: false,
    errorMessage: '',
    popoverPlacement: 'bottom',
    popoverAppendTo: 'parent',
    disabled: false,
    onAddColor: () => {},
    addTooltipContent: 'Add Color',
  }),

  exampleProps: {
    errorMessage: '',
    size: ['small', 'medium', 'large'],
    popoverPlacement: placements,
    popoverAppendTo: [
      { label: 'window', value: window },
      { label: 'scrollParent', value: 'scrollParent' },
      { label: 'viewport', value: 'viewport' },
      { label: 'parent', value: 'parent' },
      { label: 'null', value: null },
    ],
    colorPickerChildren: [
      {
        label: 'Simple Text',
        value: 'I am Color Picker Children!',
      },

      {
        label: 'A <button>',
        value: ({ changeColor }) => (
          <button onClick={() => changeColor('blue')}>Set color to blue</button>
        ),
      },
    ],
  },

  sections: [
    header({
      component: (
        <div style={{ width: '50%' }}>
          <ColorInput value="#FF0000" popoverAppendTo="window" />
        </div>
      ),
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/ColorInput/ColorInput.js',
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            '???? ColorInput is an input which allows to write HEX color manually or pick it from color picker.',
          ),

          importExample("import ColorInput from 'wix-style-react/ColorInput';"),

          divider(),

          description({
            title: 'Usage',
            text: usage,
          }),

          title('Examples'),

          ...[
            {
              title: 'Controlled',
              text: 'The component is used in controlled mode.',
              source: examples.controlledExample,
            },

            {
              title: 'Semi-Controlled',
              text: 'The component returns only valid hex values.',
              source: examples.semiControlledExample,
            },

            {
              title: 'Size',
              text: 'ColorInput supports `small`, `medium` and `large` sizes.',
              source: examples.sizes,
            },

            {
              title: 'Error, Null and Disabled',
              text: 'ColorInput has `error`, `null` and `disabled` states.',
              source: examples.states,
            },

            {
              title: 'colorPickerChildren prop with <Swatches/>',
              text:
                '`<ColorInput/>` accepts `colorPickerChildren` prop which can be a function. It receives `changeColor` function to control `<ColorInput/>` value',
              source: examples.colorPickerChildren,
            },
          ].map(({ title, text, source }) =>
            columns([
              description({ title, text }),
              code({ compact: true, source }),
            ]),
          ),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [description(testkit)] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
