<template>
	<div>
		<p>自定义节点：</p>
		<div id="g6_self1"></div>
		<p>自定义边：</p>
		<div id="g6_self2"></div>
		<p>自定义边动画：</p>
		<div id="g6_self3"></div>
		<p>自定义交互：</p>
		<div id="g6_self4"></div>
	</div>
</template>

<script>
import G6 from '@antv/g6'
export default {
	name: 'SelfComp',
	data() {
	  return {
      obj1: {
        nodes: [
          {
            id: 'node1',
            x: 50,
						y: 100,
						type: 'diamond',
						color: 'red'
					},
          {
            id: 'node2',
            x: 200,
            y: 100,
            type: 'diamond',
            color: 'red'
          }
        ],
				edges: [
					{
					  source: 'node1',
						target: 'node2'
					}
				]
      },
			obj2: {
        nodes: [
					{
					  id: 'node2',
						x: 100,
						y: 100,
						type: 'rect'
					},
          {
            id: 'node3',
            x: 150,
            y: 200,
            type: 'rect'
          }
				],
				edges: [
					{
					  source: 'node2',
						target: 'node3',
						type: 'hvh'
					}
				]
			},
			obj3: {
        nodes: [
					{
					  id: 'circle1',
						x: 100,
						y: 50,
						type: 'circle',
						size: 100
					},
          {
            id: 'circle2',
            x: 250,
            y: 300,
            type: 'circle',
						size: 100
          }
				],
        edges: [
					{
					  source: 'circle1',
					  target: 'circle2',
						type: 'line-growth',
						style: {
					    lineWidth: 3,
							stroke: '#00f'
						}
					}
				]
			},
			obj4: {
        nodes: [
					{
					  id: 'behavior',
						x: 100,
						y: 100,
						type: 'circle',
						size: 50
					}
				],
			}
		}
	},
	mounted() {
	  this.init1();
	  this.init2();
	  this.init3();
	  this.init4();
	},
	methods: {
	  init1() {
	    // 自定义
			G6.registerNode('diamond', {
			  draw(cfg, group) {
			    const keyShape = group.addShape('path', {
			      attrs: {
			        path: this.getPath(cfg),
							stroke: cfg.color
						},
						name: 'path-shape',
						draggable: true
					});
			    if (cfg.label) {
			      const label = group.addShape('text', {
			        attrs: {
			          x: 0,
								y: 0,
								textAlign: 'center',
								textBaseline: 'middle',
								text: cfg.label,
								fill: '#666'
							},
							name: 'text-shape',
							draggable: true
						});
					}
					return keyShape;
				},
				getPath(cfg) {
			    const size = cfg.size || [40,40];
					const width = size[0];
					const height = size[1];
					const path = [
					  ['M', 0, 0-height / 2],
						['L', width / 2, 0],
						['L', 0, height / 2],
						['L', -width / 2, 0],
						['Z']
					]
					return path
				}
			});
			
			const graph = new G6.Graph({
				container: 'g6_self1',
				modes: {
          default: [
            "drag-canvas",
            /*"zoom-canvas",
            "hover-node",
            "select-node",
            "hover-edge",
            "keyboard",
            "customer-events",
            "add-menu"*/
					],
				},
				width: 1000,
				height: 600,
			});
      graph.data(this.obj1);
      graph.render()
		},
		init2() {
	    G6.registerEdge('hvh', {
	      draw(cfg, group) {
	        const startPoint = cfg.startPoint;
	        const endPoint = cfg.endPoint;
	        const shape = group.addShape('path', {
	          attrs: {
	            stroke: '#333',
							path: [
							  ['M', startPoint.x, startPoint.y],
								['L', endPoint.x / 3 + (2/3)*startPoint.x, startPoint.y],
								['L', endPoint.x / 3 + (2 / 3)*startPoint.x, endPoint.y],
								['L', endPoint.x, endPoint.y]
							],
						},
						name: 'path-shape'
					});
	        return shape;
				}
			})
			const graph = new G6.Graph({
				container: 'g6_self2',
				width: 1000,
				height: 600,
			})
      graph.data(this.obj2);
	    graph.render()
		},
		init3() {
	    G6.registerEdge('line-growth', {
	      afterDraw(cfg, group) {
	        const shape = group.get('children')[0]
					const length = shape.getTotalLength();
	        shape.animate( ratio => {
	            const startLen = ratio * length;
	            const cfg = {
	              lineDash: [startLen, length - startLen]
							};
	            return cfg
						},
						{
						  //repeat: true,
							duration: 2000
						}
					);
				},
			}, 'cubic');
	    const grahp = new G6.Graph({
				container: 'g6_self3',
				width: 1000,
				height: 400
			})
      grahp.data(this.obj3);
      grahp.render()
		},
		init4() {
	    G6.registerBehavior('activate-node', {
	      getDefaultCfg() {
	        return {
	          multiple: true
					}
				},
				getEvents() {
	        return {
	          'node:click': 'onNodeClick',
						'canvas:click': 'onCanvasClick'
					}
				},
        onNodeClick(e) {
	        const graph = this.graph;
	        const item = e.item
					if (item.hasState('active')) {
	          graph.setItemState(item, 'active', false)
						return;
					}
					if (!this.multiple) {
	          this.removeNodesState();
					}
					graph.setItemState(item, 'active', true);
				},
				onCanvasClick(e) {
	        if (this.shouldUpdate(e)){
	          this.removeNodesState();
					}
				},
        removeNodesState() {
	        graph.findAllByState('node', 'active').forEach(node => {
	          graph.setItemState(node, 'active', false);
					})
				}
			});
			const graph = new G6.Graph({
				container: 'g6_self4',
				modes: {
				  default: ['activate-node', 'drag-node']
				},
				width: 1000,
				height: 300,
        nodeStateStyles: {
          active: {
            fill: '#d3adf7'
          }
        },
			})
			graph.data(this.obj4);
			graph.render()
		}
	}
}
</script>

<style scoped>

</style>