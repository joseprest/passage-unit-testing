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
<reading-passage v-bind="args">
<p>this is 1</p>
<p>this is 2</p>
<p>this is 3<br>and long</p>
<p>this is 4</p>
<p>this is 5</p>
<p>this is 6</p>
</reading-passage>
`,
});

export const EveryLine = Template.bind({});

export const EveryFiveLines = Template.bind({});
EveryFiveLines.args = {
    every: 5,
};

export const EveryParagraph = Template.bind({});
EveryParagraph.args = {
    every: 'p',
};