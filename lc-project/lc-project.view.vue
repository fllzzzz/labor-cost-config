<style lang="scss" scoped>
@use "@/styles/mixin";

.lc-project {
	&,
	&__header,
	&__content {
		display: grid;
	}

	grid-template-rows: auto auto;
	row-gap: 1vw;
	margin: 1vw 0 0 1vw;

	&__header {
		grid-template-columns: 40% auto;
		justify-content: space-between;
		&__left {
			display: grid;
			grid-template-columns: 48% 48%;
			justify-content: space-between;
			align-items: center;
		}

		:deep(.el-inptu) {
			height: 60%;
			.el-input__inner {
				width: 100;
				height: 100%;
			}
		}

		:deep(.el-button) {
			background-color: yellow;
			.button-content {
				font-size: 1.2vw;
			}
		}
	}

	&__content {
		.options {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			column-gap: 1vw;
		}
	}
}
</style>

<template>
	<div class="lc-project">
		<div class="lc-project__header">
			<div class="lc-project__header__left">
				<el-tabs
					v-model="currentMode"
					@tab-click="handleTabClick"
				>
					<el-tab-pane
						v-for="(mode, i) in repo.modeList"
						:key="i"
						:label="mode"
						:name="mode"
					>
					</el-tab-pane>
				</el-tabs>
				<ElInput
					placeholder="请输入项目名称/编号"
					type="text"
					suffix-icon="el-icon-search"
				>
				</ElInput>
			</div>
			<div class="lc-project__header__right">
				<ElButton icon="el-icon-setting" round>
					<span class="button-content">工价配置</span>
				</ElButton>
			</div>
		</div>
		<div class="lc-project__content">
			<common-table :data="repo.entityList.value">
				<el-table-column label="序号" min-width="4%">
					<template #default="{ $index }">
						{{ $index + 1 }}
					</template>
				</el-table-column>
				<el-table-column
					label="项目名称"
					prop="name"
					min-width="13%"
				></el-table-column>
				<el-table-column
					label="项目模式"
					prop="mode"
					min-width="8%"
				></el-table-column>
				<el-table-column label="统计截止日期" min-width="12%">
					<template #default="{ row }">
						<el-date-picker
							v-model="row.date"
							type="date"
							placeholder="选择日期"
							@change="handleDatePickerChange"
						></el-date-picker>
					</template>
				</el-table-column>
				<el-table-column
					v-for="(screen, i) in repo.modifyScreenList"
					:key="i"
					:label="screen"
					min-width="25%"
				>
					<template #default="{ row, $index }">
						<modify-screen
							:name="screen"
							:index="$index"
						></modify-screen>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="8%">
					<template #default="{ $index }">
						<div class="options">
							<div @click="handleOption($index, 'save')">
								<Check></Check>
							</div>
							<div @click="handleOption($index, '')">
								<Edit></Edit>
							</div>
							<div @click="handleOption($index, '')">
								<User></User>
							</div>
						</div>
					</template>
				</el-table-column>
			</common-table>
		</div>
	</div>
</template>

<script setup lang="jsx">
import { defineComponent, ref, watchEffect } from "vue";
import { Repository } from "./lc-porject.repository";
import {
	ElDatePicker,
	ElTabs,
	ElTabPane,
	ElOption,
	ElSelect,
	ElInput,
	ElButton,
} from "element-plus";
import { Edit, User, Check } from "@element-plus/icons-vue";
const repo = new Repository();
const currentMode = ref("实时计算模式");

watchEffect(() =>
	repo.load(currentMode.value).then(() => {
		repo.formatDate();
	})
);

const handleOption = (index, e) => {
	e === "save" && repo.save(index);
};

const handleDatePickerChange = (date, index) => {
	repo.entityList.value[index].date = date;
};

const handleTabClick = ctx =>
	(currentMode.value = ctx.paneName);

const ModifyScreen = defineComponent({
	props: ["name", "index"],
	setup: props => {
		const currentScope = ref();
		const currentDate = ref();
		const target = repo.entityList.value[
			props.index
		].modifyScenario.find(ctx => ctx.mode === props.name);

		currentScope.value = target.scope;
		currentDate.value = target.date;

		const handleSelecterChange = scope =>
			(target.scope = scope);
		const handleDatePickerChange = date => {
			target.date = date
				? date.map(t => t.toLocaleDateString())
				: [];

			console.log(target.date,repo.entityList.value);
		};
		return () => (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gridColumnGap: "2%",
				}}
			>
				<ElSelect
					v-model={currentScope.value}
					onChange={handleSelecterChange}
				>
					{repo.scopeList.map(scope => (
						<ElOption value={scope}></ElOption>
					))}
				</ElSelect>
				<ElDatePicker
					v-model={currentDate.value}
					type="daterange"
					onChange={handleDatePickerChange}
				></ElDatePicker>
			</div>
		);
	},
});
</script>
