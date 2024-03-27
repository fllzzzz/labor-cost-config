<template>
    <div class="x-select">
        <el-select
            v-model="model"
            :popper-class="popperClassList"
        >
            <el-option
                v-for="(opt, i) in props.options"
                :key="i"
                :label="opt"
                :value="opt"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script setup>
import { ElSelect, ElOption } from "element-plus";
import { defineModel, defineProps, computed } from "vue";

const model = defineModel();
const props = defineProps(["options", 'defaultIndex', "popper-class-list"]);
const popperClassList = computed(() => {
    return (props["popper-class-list"] ?? []).concat(
        "x-select-popper"
    );
});

model.value = props.options[props.defaultIndex ?? 0];
</script>

<style lang="scss" scoped>
.x-select {
    height: 100%;
    position: relative;
    &:deep(.el-select) {
        .el-select__wrapper {
            padding: unset;
            width: fit-content;
        }

        .el-select__selection {
            flex: unset;
        }

        .el-select__selection {
            padding: 0 0.8vw 0 0.4vw;
        }

        .el-select__suffix {
            padding: 0 0.4vw 0 0.8vw;
        }
    }
}
</style>

<style>
.x-select-popper {
	min-width: unset !important;
}
</style>
