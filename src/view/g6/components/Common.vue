<template>
	<div class="common_comp">
		<div id="g6_container1"></div>
		<div id="g6_container2"></div>
	</div>
</template>

<script>
import G6 from '@antv/g6'
export default {
	name: 'Common',
	data() {
	  return {
      obj1: {
        nodes: [
					{
					  id: 'circle',
						x: 50,
						y: 100,
						size: 100,
						type: 'circle'
					},
					{
					  id: 'rect',
						x: 200,
						y: 100,
						size: [100, 100],
						type: 'rect'
					},
					{
					  id: 'ellipse',
						x: 350,
						y: 100,
						size: [100, 80],
						type: 'ellipse'
					},
					{
					  id: 'diamond',
						x: 500,
						y: 100,
						size: [100, 80],
						type: 'diamond'
					},
					{
					  id: 'triangle',
						x: 650,
						y:100,
						size: [100, 80],
						type: 'triangle'
					},
					{
					  id: 'star',
						x: 800,
						y: 100,
						size: 100,
						type: 'star'
					},
					{
					  id: 'image',
						x: 950,
						y:100,
						size: [100, 100],
						type: 'image',
						img: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg'
					},
					{
					  id: 'modelRect',
						x: 1100,
						y:100,
						size: [100, 100],
						type: 'modelRect'
					}
				]
			},
			obj2: {
        nodes: [
					{
					  id: 'node1',
						x: 200,
						y: 200,
						type: 'rect',
						size: [100, 100]
					},
          {
            id: 'node2',
            x: 500,
            y: 200,
            type: 'rect',
						size: [100, 100]
          },
          {
            id: 'node3',
            x: 250,
            y: 350,
            type: 'rect',
            size: [100, 100]
          },
          {
            id: 'node4',
            x: 550,
            y: 350,
            type: 'rect',
            size: [100, 100]
          }
				],
				edges: [
					{
					  source: 'node1',
						target: 'node4',
            shape: 'line',
						style: {
              stroke: '#ff0'
						}
					},
					{
					  source: 'node1',
						target: 'node2',
						shape: 'arc',
						style: {
					    stroke: '#f0f',
              cursor: 'pointer',
              lineWidth: 3
						}
					},
					{
					  source: 'node1',
						target: 'node3',
						shape: 'cubic-vertical',
						style: {
              strokeOpacity: 0.8,
              shadowColor: '#0f0',
							lineWidth: 3
						}
					}
				]
			},
		}
	},
  mounted() {
    this.init1()
    this.init2()
  },
	methods: {
    init1() {
      const graph = new G6.Graph({
        container: 'g6_container1',
        modes: {
          default: ['drag-node'],
          edit: ['click-select'],
        },
        width: 1200,
        height: 300,
      });
      graph.data(this.obj1);
      graph.render();
    },
		init2() {
      const graph = new G6.Graph({
				container: 'g6_container2',
				modes: {
				  default: ['drag-node']
				},
				width: 1000,
				height: 800,
				defaultEdge: {
				  style:{
				    stroke: '#000'
					}
				},
        animate: true,
			});
			graph.data(this.obj2);
      graph.render();
		}
	}
}
</script>

<style scoped lang="less">
	.common_comp{
		//display: flex;
	}
</style>