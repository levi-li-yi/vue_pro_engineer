<template>
	<div>123
		<div id="g6_container"></div>
	</div>
</template>

<script>
import G6 from '@antv/g6'
export default {
	name: 'G6',
	data() {
	  return {
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
	  this.initG6()
	},
	methods: {
	  initG6() {
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
		}
	}
}
</script>

<style scoped>

</style>