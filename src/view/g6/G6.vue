<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="Common" name="first">
				<Common></Common>
			</el-tab-pane>
			<el-tab-pane label="Behavior" name="second">
				<Behavior></Behavior>
			</el-tab-pane>
			<el-tab-pane label="GroupComp" name="third">
				<GroupComp></GroupComp>
			</el-tab-pane>
			<el-tab-pane label="SelfComp" name="fourth">
				<SelfComp></SelfComp>
			</el-tab-pane>
			<el-tab-pane label="SelfComp" name="fifth">
				<SelfComp></SelfComp>
			</el-tab-pane>
			<el-tab-pane label="ModeComp" name="sixth">
				<ModeComp></ModeComp>
			</el-tab-pane>
			<el-tab-pane label="AnimationComp" name="seventh">
				<AnimationComp></AnimationComp>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import Common from './components/Common'
import Behavior from './components/Behavior'
import GroupComp from './components/GroupComp'
import SelfComp from './components/SelfComp'
import ModeComp from './components/ModeComp'
import AnimationComp from './components/AnimationComp'

export default {
	name: 'G6',
	components: {
    Common,
    Behavior,
    SelfComp,
    GroupComp,
    ModeComp,
    AnimationComp
	},
	data() {
	  return {
      activeName: 'seventh',
      obj: {
        nodes: [
          {
            id: 'node1',
            label: 'Circle1',
            x: 150,
            y: 150,
            anchorPoints: [
              [0.5, 1],
              [0.5, 0],
            ],
          },
          {
            id: 'node2',
            label: 'Circle2',
            x: 150,
            y: 400,
            anchorPoints: [
              [0.5, 1],
              [0.5, 0],
            ],
          }
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            type: 'cubic',
          }
        ],
      }
		}
	},
	mounted() {
	},
	methods: {
    handleClick() {},
    init1() {
      const graph = new G6.Graph({
        container: 'g6_container',
        modes: {
          default: ['drag-node'],
          edit: ['click-select'],
        },
        width: 500,
        height: 500,
        defaultNode: {
          type: 'modelRect',
          size: [100, 50],
          color: '#5b8ff9',
          style: {
            //fill: '#9ec9ff'
          },
          labelCfg: {
            position: 'bottom',
            offset: 100,
            style: {
              fill: '#333',
              fontSize: 20,
            }
          },
          linkPoints: {
            top: true,
            bottom: true,
            fill: '#fff',
            size: 5,
          },
          defaultEdge: {
            shape: 'cubic-vertical'
          }
        },
        defaultEdge: {
          style: {
            stroke: '#e2e2e2'
          }
        }
      })
      graph.data(this.obj);
      graph.render();
    },
	}
}
</script>

<style scoped>

</style>