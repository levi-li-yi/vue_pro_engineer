<template>
	<div>
		<el-select
				clearable
				filterable
				style="width:100%"
				placeholder="请选择Mode"
				@change="modeChange"
				v-model="modeId">
			<el-option
					:key="item.value"
					:label="item.label"
					:value="item.value"
					v-for="item in optionsList">
			</el-option>
		</el-select>
		<div id="g6_container_1"></div>
	</div>
</template>

<script>
import G6 from '@antv/g6'

let graph = null;

export default {
	name: 'ModeComp',
	data() {
	  return {
      optionsList: [
				{label: 'default', value: 'default'},
				{label: 'addNode', value: 'addNode'},
				{label: 'addEdge', value: 'addEdge'},
			],
      modeId: 'default',
			obj1: {
        nodes: [
					{
					  id: 'node1',
						x: 100,
						y: 200,
					},
          {
            id: 'node2',
            x: 300,
            y: 200,
          },
          {
            id: 'node3',
            x: 300,
            y: 300,
          },
				],
				edges: [
					{
					  id: 'edge1',
						source: 'node1',
						target: 'node2'
					}
				]
			}
		}
	},
	mounted() {
	  this.init();
	},
	methods: {
	  init() {
	    // 添加节点
			let addedNodeCount = 0;
			G6.registerBehavior('click-add-node', {
			  getEvents() {
			    return {
			      'canvas:click': 'onClick',
					}
				},
				onClick(ev) {
			    const graph = this.graph;
			    //新增节点
					const node = this.graph.addItem('node', {
					  x: ev.canvasX,
						y: ev.canvasY,
						id: `node-${addedNodeCount}`,
					});
					addedNodeCount++;
				}
			});
			// 添加边
			G6.registerBehavior('click-add-edge', {
			  getEvents() {
			    return {
			      'node:click': 'onClick', // 监听事件 node:click，响应函数是 onClick
						mousemove: 'onMousemove',
						'edge:click': 'onEdgeClick'
					}
				},
				onClick(ev) {
			    const node = ev.item;
			    const graph = this.graph;
			    const point = { x: ev.x, y: ev.y };
			    const model = node.getModel();
			    if (this.addingEdge && this.edge) {
			      graph.updateItem(this.edge, {
			        target: model.id
						});
			      this.edge = null;
			      this.addingEdge = false;
					} else {
			      this.edge = graph.addItem('edge', {
			        source: model.id,
							target: point
						});
			      this.addingEdge = true;
					}
				},
				onMousemove(ev) {
			    const point = { x: ev.x, y: ev.y };
			    if (this.addingEdge && this.edge) {
			      this.graph.updateItem(this.edge, {
			        target: point
						})
					}
				},
				onEdgeClick(ev) {
			    const currentEdge = ev.item;
			    if(this.addingEdge && this.edge === currentEdge) {
			      graph.removeItem(this.edge);
			      this.edge = null;
			      this.addingEdge = false;
					}
				}
			});
	    // 实例化
				graph = new G6.Graph({
				container: 'g6_container_1',
				width: 1000,
				height: 500,
				modes: {
				  default: ['drag-node', 'click-select'],
					addNode: ['click-add-node', 'click-select'],
					addEdge: ['click-add-edge', 'click-select', 'drag-node']
				},
				nodeStateStyles: {
				  selected: {
				    stroke: '#666',
						lineWidth: 2,
						fill: 'steelblue'
					}
				}
			});
      graph.data(this.obj1);
      graph.render()
		},
    modeChange(value) {
      if (value && graph) graph.setMode(value);
    }
	}
}
</script>

<style scoped>

</style>