<template>
    <div class="x-input">
        <el-input
            v-model="model"
            :disabled="props.disable"
        ></el-input>
    </div>
</template>

<script setup>
import { ElInput } from "element-plus";
import { defineModel, defineProps } from "vue";

const model = defineModel();
const props = defineProps(['disable', 'default']);

model.value = props.default;
</script>

<style lang="scss" scoped>
.x-input {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    :deep(.el-input) {
        .el-input__wrapper {
            padding: unset;
        }

        .el-input__inner {
            padding: 0.2vw;
            line-height: 1;
        }
    }
}
</style>
