<style lang="scss" scoped></style>

<template>
    <div class="lc-project">
        <div class="lc-project__header">
            <div class="lc-project__header__options">
                <ElTabs v-model="currentMode">
                    <ElTabPane
                        v-for="(mode, i) in aggre.repo
                            .context.modeList"
                        :key="i"
                        :label="mode"
                        :name="mode"
                    >
                    </ElTabPane>
                </ElTabs>
            </div>
            <div class="lc-project__header__setting"></div>
        </div>
        <div class="lc-project__content">
            <ElTable
                :data="aggre.repo.entityList.value"
                border
            >
                <ElTableColumn
                    label="序号"
                    type="index"
                    min-width="6%"
                ></ElTableColumn>
                <ElTableColumn
                    label="项目名称"
                    prop="name"
                    min-width="15%"
                ></ElTableColumn>
                <ElTableColumn
                    label="项目模式"
                    prop="mode"
                    min-width="10%"
                ></ElTableColumn>
                <ElTableColumn
                    label="统计截止日期"
                    min-width="10%"
                >
                    <template #default="{ $index }">
                        <xDatePicker :index="$index"></xDatePicker>
                    </template>
                </ElTableColumn>
                <ElTableColumn
                    v-for="(screen, i) in aggre.repo.context
                        .modifyScreenList"
                    :key="i"
                    :label="screen"
                    min-width="25%"
                >
                    <template #default="{ $index }">
                        <ModifyScreen
                            :index="$index"
                            :mode="screen"
                        ></ModifyScreen>
                    </template>
                </ElTableColumn>
                <ElTableColumn label="操作" min-width="8%">
                    <template #default="{ $index }">
                        <div
                            :style="{
                                display: 'grid',
                                gridTemplateColumns:
                                    '1fr 1fr 1fr',
                                columnGap: '2fr',
                            }"
                        >
                            <i
                                ><Check
                                    @click="
                                        aggre.save($index)
                                    "
                                ></Check
                            ></i>
                            <i><Edit></Edit></i>
                            <i><User></User></i>
                        </div>
                    </template>
                </ElTableColumn>
            </ElTable>
        </div>
    </div>
</template>

<script setup lang="jsx">
import {
    ElTabs,
    ElTabPane,
    ElTable,
    ElTableColumn,
    ElSelect,
    ElOption,
    ElDatePicker,
} from "element-plus";
import { Edit, User, Check } from "@element-plus/icons-vue";
import { Aggregate } from "./lc-project.aggregate";
import { defineComponent, ref } from "vue";

const aggre = new Aggregate();
const currentMode = ref("实时计算模式");

aggre.load(currentMode);


const xDatePicker = defineComponent({
    props: ['index'],
    setup: props => {
        const dateRef = aggre.watchDate(props.index);
        return () => (
            <ElDatePicker
                type="date"
                v-model={dateRef.value}
            ></ElDatePicker>
        );
    }
});

const ModifyScreen = defineComponent({
    props: ["index", "mode"],
    setup: props => {
        const target = aggre.getEntityByScreenMode(
            props.index,
            props.mode
        );

        const [currentDate, currentScope] = [
            ref(target.date),
            ref(target.scope),
        ];

        aggre.changeModifyScreenDate(
            props.index,
            props.mode,
            currentDate
        );
        aggre.changeModifyScreenScope(
            props.index,
            props.mode,
            currentScope
        );

        return () => (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "48% 48%",
                    justifyContent: "space-between",
                }}
            >
                <ElSelect v-model={currentScope.value}>
                    {aggre.repo.context.scopeList.map(
                        scope => (
                            <ElOption
                                label={scope}
                                value={scope}
                            ></ElOption>
                        )
                    )}
                </ElSelect>
                <ElDatePicker
                    type="daterange"
                    v-model={currentDate.value}
                ></ElDatePicker>
            </div>
        );
    },
});
</script>
