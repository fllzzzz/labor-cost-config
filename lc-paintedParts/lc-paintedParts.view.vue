<style lang="scss" scoped></style>
<template>
    <div class="lc-paintedParts">
        <div class="lc-paintedParts__header"></div>
        <div class="lc-paintedParts__content">
            <x-dialog v-model="open">
                <template #content>
                    <MulitiConfigure></MulitiConfigure>
                </template>
            </x-dialog>
        </div>
    </div>
</template>

<script setup lang="jsx">
import { defineComponent, ref } from "vue";
import { ElTag } from "element-plus";
import MulitiConfigure from "./muliti-configure.vue";
import XDialog from "./x-dialog.vue";

const open = ref(true);

const Tags = defineComponent({
    props: ["list"],
    setup: props => {
        return () => (
            <div
                style={{
                    display: "flex",
                    flexFlow: "row wrap",
                }}
            >
                {props.list.map(item => (
                    <ElTag
                        closable
                        type="info"
                        style={{
                            marginRight: "0.3vw",
                        }}
                    >
                        {item}
                    </ElTag>
                ))}
            </div>
        );
    },
});
</script>

<style lang="scss" scope></style>
