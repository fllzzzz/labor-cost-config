<template>
    <div class="lc-statistic">
        <xCard>
            <template #content>
                <div class="content">
                    <div class="x-button">
                        <ElButton>保存</ElButton>
                    </div>
                    <Mode
                        :map="modeConfigConetxt.modeMap"
                        v-model="
                            modeConfigConetxt.mode.value
                        "
                    ></Mode>
                    <Date
                        v-model="
                            modeConfigConetxt.date.value
                        "
                    ></Date>
                </div>
                <div class="footer">
                    <span
                        >提示：如需更改统计模式，必须生产线上无任何未完成的上报数据，才能修改模式。</span
                    >
                </div>
            </template>
        </xCard>
        <xCard class="x2">
            <template #content>
                <Price :list="priceConfigList"></Price>
                <div class="x-button">
                    <ElButton>保存</ElButton>
                </div>
            </template>
        </xCard>
    </div>
</template>

<script setup lang="jsx">
import {
    ElButton,
    ElCard,
    ElDatePicker,
    ElRadio,
} from "element-plus";
import { defineComponent, ref, watch } from "vue";

const modeConfigConetxt = {
    mode: ref(),
    date: ref(),
    modeMap: new Map([
        [
            "实时计算模式",
            "选择此模式，薪酬的计件的统计，则根据班组实时报工数据，由系统自动根据零构件类型结合工价，实时生成计件薪酬表",
        ],
        [
            "入库倒推模式",
            "选择此模式，薪酬的计件统计，则根据月末实际制成品入库数据结合工价生成月度计件薪酬表，该模式零件必须一口价",
        ],
    ]),
};

const priceConfigList = [
    {
        mode: "配置价格修改场景",
        scopeList: [
            "影响修改之后的价格",
            "同步修改之前的价格",
        ],
        scope: ref(""),
        date: ref([]),
    },
    {
        mode: "单个价格修改场景",
        scopeList: [
            "影响修改之后的价格",
            "同步修改之前的价格",
        ],
        scope: ref(""),
        date: ref([]),
    },
];

watch(
    [priceConfigList[0].scope, priceConfigList[0].date],
    v => console.log(v)
);

const Price = defineComponent({
    props: ["list"],
    setup: props => {
        return () =>
            props.list.map(ctx => (
                <div class="price">
                    <span
                        style={{
                            fontWeight: "bold",
                            marginRight: "1vw",
                        }}
                    >
                        {ctx.mode}
                    </span>
                    {ctx.scopeList.map(scope => (
                        <ElRadio
                            label={scope}
                            value={scope}
                            v-model={ctx.scope.value}
                        ></ElRadio>
                    ))}
                    <ElDatePicker
                        type="daterange"
                        v-model={ctx.date.value}
                    ></ElDatePicker>
                </div>
            ));
    },
});

const Date = defineComponent({
    props: ["modelValue"],
    emits: ["update:modelValue"],
    setup: (props, { emit }) => {
        const currentDate = ref(props.modelValue);
        watch(currentDate, v =>
            emit("update:modelValue", v)
        );
        return () => (
            <div class="date">
                <span>统计截止日：</span>
                <ElDatePicker
                    type="date"
                    v-model={currentDate.value}
                ></ElDatePicker>
            </div>
        );
    },
});

const Mode = defineComponent({
    props: ["map", "modelValue"],
    emits: ["update:modelValue"],
    setup: (props, { emit }) => {
        const currentMode = ref(props.modelValue);
        const entries = Array.from(props.map.entries());

        watch(currentMode, v =>
            emit("update:modelValue", v)
        );

        return () =>
            entries.map(mode => (
                <div class="mode">
                    <ElRadio
                        v-model={currentMode.value}
                        label={mode[0]}
                        value={mode[0]}
                    ></ElRadio>
                    <span>{mode[1]}</span>
                </div>
            ));
    },
});

const xCard = defineComponent({
    slots: ["content"],
    setup: (props, { slots }) => {
        return () => (
            <div
                style={{
                    width: "fit-content",
                    height: "fit-content",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    display: "relative",
                }}
            >
                <ElCard body-class="lc-statistic-card">
                    {slots.content?.()}
                </ElCard>
            </div>
        );
    },
});
</script>

<style lang="scss" scoped>
.lc-statistic {
    display: grid;
    grid-template-rows: auto auto;
    row-gap: 3vw;
    &:nth-child(1) {
        :deep(.lc-statistic-card) {
            .el-radio__label {
                font-weight: bold;
            }
            display: grid;
            grid-template-rows: auto auto;
            row-gap: 2vw;
            position: relative;
            .x-button {
                position: absolute;
                top: 1%;
                right: 1%;
                width: 5vw;
                height: 10%;
                .el-button {
                    width: 100%;
                    height: 100%;
                    background-color: skyblue;
                    span {
                        color: white;
                    }
                }
            }
            .content {
                .mode {
                    display: grid;
                    grid-template-rows: auto auto;
                    row-gap: 0.3vw;
                    margin-bottom: 3vw;
                    & > span {
                        margin-left: 1.5vw;
                    }
                }
                .data {
                    display: grid;
                    grid-template-columns: auto auto;
                    column-gap: 0.3vw;
                }
            }

            .footer {
                span {
                    color: red;
                }
            }
        }
    }
}
:deep(.x2) {
	.price {
		margin-top: 2vw;
	}
	 
	.x-button {
		height: 15% !important;
	}
}
</style>
