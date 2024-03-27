<template>
    <div class="muliti-configure">
        <ElTable :border="true" :data="[entity]">
            <ElTableColumn
                label="序号"
                type="index"
                min-width="6%"
            ></ElTableColumn>
            <ElTableColumn
                label="构件类型"
                prop="type"
                min-width="10%"
            ></ElTableColumn>
            <ElTableColumn
                label="构件名称"
                prop="name"
                min-width="10%"
            ></ElTableColumn>
            <ElTableColumn
                label="规格"
                prop="specification"
                min-width="10%"
            ></ElTableColumn>
            <ElTableColumn
                v-for="(p, i) in paramets"
                :key="i"
                min-width="25%"
            >
                <template #header>
                    <ElRadio
                        :label="p[0]"
                        :value="p[0]"
                    ></ElRadio>
                </template>
                <template #default>
                    <div class="x-table-cell">
                        <div class="item">
                            <limit-select
                                v-for="_i in limitSelectCount(
                                    p[0]
                                ).value"
                            ></limit-select>
                        </div>
                        <div class="add" @click="() => handleAddLimitSelect(p[0])">dasd</div>
                    </div>
                </template>
            </ElTableColumn>
            <ElTableColumn
                label="工序"
                min-width="10%"
            ></ElTableColumn>
            <ElTableColumn
                label="计量方式"
                min-width="10%"
            ></ElTableColumn>
            <ElTableColumn
                label="操作"
                min-width="10%"
            ></ElTableColumn>
        </ElTable>
    </div>
</template>

<script setup>
import {
    ElTable,
    ElTableColumn,
    ElRadio,
} from "element-plus";
import LimitSelect from "./limit-select.vue";
import { computed, ref } from "vue";
import { Entity } from "./lc-paintedParts.entity";

const entity = new Entity();
entity.init();

const paramets = Array.from(entity.parameter.entries());

const limitSelectCountMap = new Map(
    paramets.map(p => [p[0], ref(1)])
);

const limitSelectCount = computed(
    () => name => limitSelectCountMap.get(name)
);

const handleAddLimitSelect = name => {
   const target = limitSelectCountMap.get(name);

   target && target.value++;
};
</script>

<style lang="scss" scoped>
:deep(.x-table-cell) {
    position: relative;
    .item {
        margin-right: 10%;
    }
    .add {
        position: absolute;
        top: 0;
        right: 0;
    }
}
</style>
