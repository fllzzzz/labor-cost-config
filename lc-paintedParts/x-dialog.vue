<template>
    <el-dialog
		v-model="model"
        :append-to-body="true"
        :class="classList"
		:style="{
			'--top': points[0],
			'--right': points[1],
			'--bottom': points[2],
            '--left': points[3]
		}"
    >{{ solts.content }}</el-dialog>
</template>

<script setup>
import { ElDialog } from "element-plus";
import { defineProps, defineModel, defineSolts, computed } from "vue";

const solts = defineSolts('content');
const model = defineModel("open");
const props = defineProps(["classList", "open", 'positions']);
const points = computed(() => props.positions ?? []);
const classList = computed(() =>
    (props.classList ?? []).concat("x-dialog")
);
</script>

<style lang="scss">
.x-dialog {
	margin: unset !important;
	top: var(--top);
	right: var(--right);
	bottom: var(--bottom);
	left: var(--left);
}
</style>
