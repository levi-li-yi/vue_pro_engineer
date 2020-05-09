<template>
	<div>
		<div id="g6_container3"></div>
	</div>
</template>

<script>
import G6 from '@antv/g6'
export default {
	name: 'Behavior',
	data() {
	  return {
	    obj1: {
	      nodes: [
					{
					  id: 'node1',
						x: 100,
						y: 100,
						type: 'rect',
						size: [100, 100]
					},
          {
            id: 'node2',
            x: 250,
            y: 300,
            type: 'rect',
            size: [100, 100]
          },
				],
				edges: [
					{
					  source: 'node1',
						target: 'node2',
						type: 'cubic',
						style: {
              stroke: '#0ff',
							lineWidth: 5,
							cursor: 'pointer'
						}
					}
				]
			}
		}
	},
	mounted() {
	  this.init1()
	},
	methods: {
	  init1() {
	    const graph = new G6.Graph({
				container: 'g6_container3',
				modes: {
				  default: [
            {
              type: 'drag-node',
              enableDelegate: true
            },
						{
						  type: 'brush-select'
						}
					]
				},
				width: 1000,
				height: 500,
				defaultEdge: {
				  style: {
				    stoke: '#0ff'
					}
				},
				/*状态样式*/
        nodeStateStyles: {
				  hover: {
				    fill: '#d3adf7'
					}
				},
        edgeStateStyles: {
          running: {
				    stroke: 'steelblue'
					}
				},
      });
      graph.data(this.obj1);
			graph.render()
      graph.on('click', e => {
        const shape = e.target
				const item = e.item
				if (item) {
          console.log(item.getType());
        }
        console.log(shape);
      })
			/*在事件中切换状态*/
			graph.on('node:mouseenter', evt => {
			  const { item } = evt;
			  graph.setItemState(item, 'hover', true)
			})
      graph.on('node:mouseleave', evt => {
        const { item } = evt;
        graph.setItemState(item, 'hover', false)
      })
      graph.on('edge:mouseenter', evt => {
        const { item } = evt;
        graph.setItemState(item, 'running', true)
      })
      graph.on('edge:mouseleave', evt => {
        const { item } = evt;
        graph.setItemState(item, 'running', false)
      })
		}
	}
}
</script>

<style scoped>

</style>