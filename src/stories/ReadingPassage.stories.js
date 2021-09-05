import { VueElement } from 'vue';
import ReadingPassage from '../ReadingPassage.vue';

export default {
    title: 'Test Taker/Reading Passage',
    component: ReadingPassage,
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    //     size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    //     onClick: {},
    // },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { ReadingPassage },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `
<ReadingPassage v-bind="args">
<p>Line 1: good</p>
<p>Line 2: abso-<br>lutely</p>
<p>Line 3: free</p>
<p>Line 4: snore</p>
<p>Line 5: alive</p>
<p>Line 6: drips</p>
</ReadingPassage>
`,
});

export const EveryLine = Template.bind({
    slots: { default: 'test'}
});

export const EveryFiveLines = Template.bind({});
EveryFiveLines.args = {
    every: 5,

};

export const EveryParagraph = Template.bind({});
EveryParagraph.args = {
    every: 'p',
};