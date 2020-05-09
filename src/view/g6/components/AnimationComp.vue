<template>
	<div>
		<p>节点动画：</p>
		<div id="g6_container_3"></div>
		<p>边动画：</p>
		<div id="g6_container_4"></div>
	</div>
</template>

<script>
import G6 from '@antv/g6'
export default {
	name: 'AnimationComp',
	data() {
	  return {
	    obj1: {
	      nodes: [
					{
					  id: 'circle-animate',
						x: 100,
						y: 100,
						size: 100,
						type: 'circle-animate'
					},
					{
					  id: 'background-animate',
						x: 300,
						y: 100,
						size: 50,
						type: 'background-animate'
					}
				]
			},
			obj2: {
	      nodes: [
					{
					  id: 'node1',
						x: 100,
						y: 100,
						size: [50, 50],
						type: 'rect',
            anchorPoints: [
              [0.5, 1],
              [0.5, 0],
            ],
					},
          {
            id: 'node2',
            x: 100,
            y: 300,
            size: [50, 50],
            type: 'rect',
            anchorPoints: [
              [0.5, 1],
              [0.5, 0],
            ],
          },
          {
            id: 'node3',
            x: 300,
            y: 100,
            size: [50, 50],
            type: 'rect',
            anchorPoints: [
              [0.5, 1],
              [0.5, 0],
            ],
          },
          {
            id: 'node4',
            x: 300,
            y: 300,
            size: [50, 50],
            type: 'rect',
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
						type: 'circle-runing'
					},
          {
            source: 'node3',
            target: 'node4',
            type: 'line-dash'
          }
				]
			}
		}
	},
	mounted() {
	  this.init1();
	  this.init2();
	},
	methods: {
	  init1() {
	    G6.registerNode('circle-animate', {
	      afterDraw(cfg, group) {
	        // 获取第一个图形
					const shape = group.get('children')[0];
					shape.animate(ratio => {
					  // 每一帧，入参： 这一帧的比例值；返回值：这一帧需要变化的采参数集
						// 先变大，后变小
						const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
						let radius  = cfg.size;
						if (isNaN(radius)) radius  = ratio[0];
						// 返回：半径=原始半径 + diff
						return {
						  r: radius / 2 + diff
						}
					},{
					  repeat: true,
						duration: 3000,
						easing: 'easeCubic'
					})
				}
			}, 'circle'); // 继承内置节点'circle'
			G6.registerNode('background-animate', {
			  afterDraw(cfg, group) {
			    let r = cfg.size / 2;
			    if (isNaN(r)) {
			      r = cfg.size[0] / 2
					}
					// first circle
					const back1 = group.addShape('circle', {
					  zIndex: -3,
						attrs: {
					    x: 0,
							y: 0,
							r,
							fill: cfg.color,
							opacity: 0.6
						},
						name: 'circle-shape1'
					})
					// second circle
					const back2 = group.addShape('circle', {
					  zIndex: -2,
						attrs: {
					    x: 0,
							y: 0,
							r,
							fill: 'blue',
							opacity: 0.6
						},
						name: 'circle-shape2'
					})
					// third circle
					const back3 = group.addShape('circle', {
					  zIndex: -1,
						attrs: {
              x: 0,
              y: 0,
              r,
              fill: 'green',
              opacity: 0.6
						},
						name: 'circle-shape3'
					})
					// zIndex排序
					group.sort()
					// 背景圆逐渐放大->消失
					back1.animate({
						r: r + 10,
						opacity: 0.1
					}, {
					  repeat: true,
						duration: 3000,
						easing: 'easeCubic',
						delay: 0
					})
          back2.animate({
            r: r + 10,
            opacity: 0.1
          }, {
            repeat: true,
            duration: 3000,
            easing: 'easeCubic',
            delay: 1000
          })
          back3.animate({
            r: r + 10,
            opacity: 0.1
          }, {
            repeat: true,
            duration: 3000,
            easing: 'easeCubic',
            delay: 2000
          })
				}
			}, 'circle');
			const graph = new G6.Graph({
				container: 'g6_container_3',
				width: 1000,
				height: 200,
			})
      graph.data(this.obj1);
      graph.render()
		},
		init2() {
	    G6.registerEdge('circle-runing', {
	      afterDraw(cfg, group) {
	        // 当前边第一个图形
					const shape = group.get('children')[0];
					// 边path的起点位置
					const startPoint = shape.getPoint(0);
					// 添加circle图形
					const circle = group.addShape('circle', {
					  attrs: {
              x: startPoint.x,
							y: startPoint.y,
							fill: 'red',
							r: 3,
						},
						name: 'circle-shape'
					});
					// 添加动画
					circle.animate(ratio => {
            // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
            // 根据比例值，获得在边 path 上对应比例的位置。
						const tmpPoint = shape.getPoint(ratio);
						return {
						  x: tmpPoint.x,
							y: tmpPoint.y
						};
					}, {
					  repeat: true,
						duration: 3000
					}); // 一次动画时间长度
				}
			}, 'cubic');
	    const dashArray = [
	      [0,1],
				[0,2],
				[1,2],
				[0,1,1,2],
				[0,2,1,2],
				[1,2,1,2],
				[2,2,1,2],
				[3,2,1,2],
				[4,2,1,2],
			];
	    const lineDash = [4,2,1,2];
	    const interval = 9;
	    G6.registerEdge('line-dash', {
	      afterDraw(cfg, group) {
	        const shape = group.get('children')[0];
	        // 获得path总长度
					const length = shape.getTotalLength();
					let totalArray = [];
					for (let i = 0; i < length; i+=interval) {
					  totalArray = totalArray.concat(lineDash)
					}
					let index = 0;
					shape.animate(ratio => {
					  const cfg = {
					    lineDash: dashArray[index].concat(totalArray)
						};
						index = (index + 1) % interval;
						return cfg
					}, {
					  repeat: true,
						duration: 3000
					})
				}
			}, 'cubic');
	    const graph = new G6.Graph({
				container: 'g6_container_4',
				modes: {
				  default: ['drag-node']
				},
				defaultEdge: {
				  style: {
				    lineWidth: 2,
						stroke: '#0f0'
					}
				},
				width: 1000,
				height: 500,
			})
      graph.data(this.obj2);
      graph.render();
		}
	}
}
</script>

<style scoped>

</style>