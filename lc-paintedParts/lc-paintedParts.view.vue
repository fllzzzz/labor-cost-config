<style lang="scss" scoped></style>
<template>
    <div class="lc-paintedParts">
        <div class="lc-paintedParts__header"></div>
        <div class="lc-paintedParts__content">
			<MultiConfigure></MultiConfigure>
        </div>
    </div>
</template>

<script setup lang="jsx">
import { Entity } from "./lc-paintedParts.entity";
import { defineComponent } from "vue";
import {
    ElDialog,
    ElTable,
    ElTableColumn,
} from "element-plus";

const entity = new Entity();

const Dialog = defineComponent({
    props: ["shouldOpen"],
    slots: ["content"],
    setup: (props, { slots }) => {
        return () => (
            <ElDialog
                v-model={props.shouldOpen}
                title={""}
                append-to-body={true}
                width="fit-content"
                top="20vh"
            >
                {slots.content?.()}
            </ElDialog>
        );
    },
});

const MultiConfigure = defineComponent({
    setup: props => {
        return () => (
            <ElTable data={[{}]}>
                <ElTableColumn
                    label="序号"
                    type="index"
                ></ElTableColumn>
                <ElTableColumn
                    label="构件类型"
                >{{
					header: () => 2132
				}}</ElTableColumn>
                <ElTableColumn
                    label="构件名称"
                    prop="name"
                ></ElTableColumn>
                <ElTableColumn
                    label="规格"
                    prop="specification"
                ></ElTableColumn>
                {}
                <ElTableColumn label="工序"></ElTableColumn>
                <ElTableColumn label="计量方式"></ElTableColumn>
                {}
            </ElTable>
        );
    },
});
</script>
