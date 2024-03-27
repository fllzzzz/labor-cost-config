<template>
    <div class="limit-select">
        <x-input v-model="startValue"></x-input>
        <x-select
            v-model="startSymbol"
            :options="optionList"
        ></x-select>
        <x-input
            :disable="true"
            default="X"
        ></x-input>
        <x-select
            v-model="endSymbol"
            :options="optionList"
            :default-index="2"
        ></x-select>
        <x-input v-model="endValue"></x-input>
    </div>
</template>

<script setup>
import XInput from "./x-input.vue";
import XSelect from "./x-select.vue";
import { ref, watch, defineEmits } from "vue";

const emit = defineEmits(["update"]);

const optionList = ["<", "≤", ">", "≥"];
const [startValue, startSymbol, endValue, endSymbol] = [
    ref(),
    ref(),
    ref(),
    ref(),
];

watch(
    [startValue, startSymbol, endValue, endSymbol],
    ctx => {
        const value = `${ctx[0] ?? 0} ${ctx[1]} X ${
            ctx[3]
        } ${ctx[2] ?? 0}`;

        emit("update", value);
    }
);
</script>

<style lang="scss" scoped>
.limit-select {
    width: 13vw;
    display: grid;
    grid-auto-flow: column;
    column-gap: 0.2vw;
}
</style>
